import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const galleryPath = path.join(process.cwd(), "public", "gallery");
    const files = fs.readdirSync(galleryPath)
      .filter((file) => /\.(jpe?g|png|webp|gif|avif)$/i.test(file));

    return NextResponse.json({ files });
  } catch (error) {
    console.error("Error reading gallery folder:", error);
    return NextResponse.json({ files: [] }, { status: 500 });
  }
}
