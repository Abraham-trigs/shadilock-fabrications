// app/api/google/route.ts
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import path from "path";

// Auth setup with service account
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(process.cwd(), "service-account.json"),
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

const FOLDER_ID = "187ZD5xwmakTCKN3uFA0yI4sfSihVpp-X";

// --- CRUD API ---
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get("fileId");

    if (fileId) {
      // Single file
      const res = await drive.files.get({
        fileId,
        fields: "id, name, mimeType, modifiedTime",
      });

      const file = res.data;
      return NextResponse.json({
        ...file,
        url: `https://drive.google.com/uc?export=view&id=${file.id}`,
      });
    } else {
      // List files in folder
      const res = await drive.files.list({
        q: `'${FOLDER_ID}' in parents and trashed=false`,
        fields: "files(id, name, mimeType, modifiedTime)",
      });

      const files = (res.data.files || []).map((file) => ({
        ...file,
        url: `https://drive.google.com/uc?export=view&id=${file.id}`,
      }));

      return NextResponse.json({ files });
    }
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, mimeType, parents } = body;

    const res = await drive.files.create({
      requestBody: {
        name,
        mimeType,
        parents: parents || [FOLDER_ID],
      },
      fields: "id, name, mimeType, modifiedTime",
    });

    const file = res.data;
    return NextResponse.json({
      ...file,
      url: `https://drive.google.com/uc?export=view&id=${file.id}`,
    });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Failed to create file" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileId, newName } = body;

    const res = await drive.files.update({
      fileId,
      requestBody: { name: newName },
      fields: "id, name, mimeType, modifiedTime",
    });

    const file = res.data;
    return NextResponse.json({
      ...file,
      url: `https://drive.google.com/uc?export=view&id=${file.id}`,
    });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "Failed to update file" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get("fileId");

    if (!fileId) {
      return NextResponse.json({ error: "Missing fileId" }, { status: 400 });
    }

    await drive.files.delete({ fileId });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
  }
}
