import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import path from "path";

// Auth setup
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(process.cwd(), "service-account.json"),
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });
const FOLDER_ID = "187ZD5xwmakTCKN3uFA0yI4sfSihVpp-X"; // Your shared folder ID

// --- GET all files ---
export async function GET(req: NextRequest) {
  try {
    const res = await drive.files.list({
      q: `'${FOLDER_ID}' in parents and trashed=false`,
      fields: "files(id, name, mimeType, modifiedTime, thumbnailLink)",
    });

    const files = res.data.files || [];

    return NextResponse.json({
      files: files.map((file) => ({
        id: file.id!,
        name: file.name!,
        mimeType: file.mimeType,
        modifiedTime: file.modifiedTime,
        thumbnailLink: file.thumbnailLink,
        url: `https://drive.google.com/uc?export=view&id=${file.id}`,
      })),
    });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch files", details: (error as Error).message },
      { status: 500 }
    );
  }
}

// --- POST upload file ---
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const res = await drive.files.create({
      requestBody: {
        name: file.name,
        parents: [FOLDER_ID],
      },
      media: {
        mimeType: file.type || "application/octet-stream",
        body: buffer,
      },
      fields: "id, name, mimeType, modifiedTime, thumbnailLink",
    });

    // Make uploaded file public
    try {
      await drive.permissions.create({
        fileId: res.data.id!,
        requestBody: { role: "reader", type: "anyone" },
      });
    } catch {}

    return NextResponse.json({
      id: res.data.id!,
      name: res.data.name!,
      mimeType: res.data.mimeType,
      modifiedTime: res.data.modifiedTime,
      thumbnailLink: res.data.thumbnailLink,
      url: `https://drive.google.com/uc?export=view&id=${res.data.id}`,
      message: "File uploaded successfully!",
    });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Failed to upload file", details: (error as Error).message },
      { status: 500 }
    );
  }
}
