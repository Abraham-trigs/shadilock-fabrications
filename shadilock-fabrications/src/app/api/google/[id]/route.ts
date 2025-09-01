// app/api/google/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import path from "path";

// Auth setup
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(process.cwd(), "service-account.json"),
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

// --- GET specific file ---
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fileId = params.id;

    const res = await drive.files.get({
      fileId,
      fields: "id, name, mimeType, modifiedTime, thumbnailLink",
    });

    const file = res.data;

    return NextResponse.json({
      ...file,
      url: `https://drive.google.com/uc?export=view&id=${file.id}`,
    });
  } catch (error) {
    console.error("GET specific file error:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch file", 
        details: error instanceof Error ? error.message : "Unknown error" 
      }, 
      { status: 500 }
    );
  }
}

// --- DELETE specific file ---
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fileId = params.id;

    console.log("DELETE request - fileId:", fileId);

    if (!fileId) {
      return NextResponse.json({ error: "Missing fileId" }, { status: 400 });
    }

    await drive.files.delete({ fileId });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { 
        error: "Failed to delete file",
        details: error instanceof Error ? error.message : "Unknown error"
      }, 
      { status: 500 }
    );
  }
}

// --- PUT update specific file ---
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fileId = params.id;
    
    if (!fileId) {
      return NextResponse.json({ error: "Missing fileId" }, { status: 400 });
    }

    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: "Missing name in request body" }, { status: 400 });
    }

    const res = await drive.files.update({
      fileId,
      requestBody: {
        name,
      },
      fields: "id, name, mimeType, modifiedTime, thumbnailLink",
    });

    return NextResponse.json({
      ...res.data,
      url: `https://drive.google.com/uc?export=view&id=${res.data.id}`,
    });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { 
        error: "Failed to update file",
        details: error instanceof Error ? error.message : "Unknown error"
      }, 
      { status: 500 }
    );
  }
}
