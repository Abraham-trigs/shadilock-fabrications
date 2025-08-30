// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Readable } from "stream";

const FOLDER_ID = "187ZD5xwmakTCKN3uFA0yI4sfSihVpp-X"; // Your shared folder ID

// Google Drive auth using your service account JSON
const auth = new google.auth.GoogleAuth({
  keyFile: "./keys/shadilock-fabrications.json", // adjust path
  scopes: ["https://www.googleapis.com/auth/drive.file"],
});

const drive = google.drive({ version: "v3", auth });

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Google Drive
    const uploadedFile = await drive.files.create({
      requestBody: {
        name: file.name,
        parents: [FOLDER_ID],
      },
      media: {
        mimeType: file.type,
        body: Readable.from(buffer),
      },
      fields: "id, name",
    });

    return NextResponse.json({ success: true, file: uploadedFile.data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
};
