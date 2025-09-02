"use server"; // ensure this is server-side only

import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import path from "path";
import { Readable } from "stream";

// --- Google Drive Auth ---
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(process.cwd(), "service-account.json"),
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

// --- Shared folder ID ---
const FOLDER_ID = "187ZD5xwmakTCKN3uFA0yI4sfSihVpp-X";

// --- GET all files in folder with pagination ---
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "20", 10);

    // Fetch all files
    const res = await drive.files.list({
      q: `'${FOLDER_ID}' in parents and trashed=false`,
      fields: "files(id, name, mimeType, modifiedTime, thumbnailLink)",
      pageSize: 1000, // fetch max allowed from Drive
    });

    const allFiles = res.data.files || [];
    const totalFiles = allFiles.length;

    // Slice files for pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pagedFiles = allFiles.slice(startIndex, endIndex);

    const formattedFiles = pagedFiles.map((file) => ({
      id: file.id!,
      name: file.name!,
      mimeType: file.mimeType,
      modifiedTime: file.modifiedTime,
      thumbnailLink: file.thumbnailLink,
      url: `https://drive.google.com/uc?export=view&id=${file.id}`,
    }));

    return NextResponse.json({ files: formattedFiles, totalFiles });
  } catch (error) {
    console.error("GET folder error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch files",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// --- POST upload file ---
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    console.log("Uploading file:", file.name, file.type, buffer.length);

    const res = await drive.files.create({
      requestBody: { name: file.name, parents: [FOLDER_ID] },
      media: { mimeType: file.type || "application/octet-stream", body: stream },
      fields: "id, name, mimeType, modifiedTime, thumbnailLink",
    });

    const fileId = res.data.id!;
    // Make file publicly readable
    try {
      await drive.permissions.create({ fileId, requestBody: { role: "reader", type: "anyone" } });
    } catch (permError) {
      console.warn("Failed to set public permission:", permError);
    }

    return NextResponse.json({
      id: fileId,
      name: res.data.name!,
      mimeType: res.data.mimeType,
      modifiedTime: res.data.modifiedTime,
      thumbnailLink: res.data.thumbnailLink,
      url: `https://drive.google.com/uc?export=view&id=${fileId}`,
      message: "File uploaded successfully!",
    });
  } catch (error) {
    console.error("POST upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
