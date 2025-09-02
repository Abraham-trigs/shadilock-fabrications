// utils/drive.ts
export function getDriveThumbnail(fileIdOrUrl: string, size = 200): string {
  // If it's already a full https link, just return it
  if (fileIdOrUrl.startsWith("http")) {
    return fileIdOrUrl;
  }

  // If it looks like a Google Drive file ID (no protocol, just ID)
  // Generate a standard thumbnail link
  return `https://lh3.googleusercontent.com/d/${fileIdOrUrl}=w${size}-h${size}`;
}

// Optional: convert any "https://drive.google.com/file/d/..." link into a direct ID
export function extractDriveFileId(driveUrl: string): string | null {
  const match = driveUrl.match(/\/file\/d\/([^/]+)/);
  return match ? match[1] : null;
}
