"use server";

import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Readable } from "stream";

// --- Embed service account credentials ---
const SERVICE_ACCOUNT = {
  type: "service_account",
  project_id: "shadilock-fabrications",
  private_key_id: "e07e8d4e576315aedb826b345e5b42da0606c3a4",
  private_key: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCkhKhcJWnZm+Qs
/hPHdAPVvK+C3sc5U1JYw9ke1SnUfmSY8Bfe1qkdVp3cFJzc+mPatbxSQtl/DeCX
nzCb/jDIQErtek1uhoK6EMLAtleZnnLe+jjw1aheIwbCUnt5lrepXKNgI9wVsPzd
Vmgr4y9IfTR70tuxbYNkbKNuwfuSH2RuHgBPpiCv+OgNpZ3udYPD/WT4D4UG5UcI
TZTPs8CUVPz0JQ1F5xrlPKEjakBhtNSfcKDvnImCu1eUj9Ar6Spn+c3w1OtXkJSB
XtBaKENEBpMJEE4xnEa6G1iYIKL2wraSrdjITWeZO3hybfpqV7z2vLLCX2sti+SR
ki6iC/h5AgMBAAECggEAEL7Obquht6QsEE7Pt1NWERcuo6LWkx2Jog6ULtTaWD5B
scXtXhGKHtn6QSSJd14WlBQ/rf1PK0UftTsfLN+NelJ99ehHEZ8IFxV95zTgG3si
3NKKAWxz4doNlfGkjwKR4N+UowRfYkdUo5hIC+CIx2d0FD7o/OklUK9UnsFIoI2e
4BDHy6btzKRfnMZScgrmM9COb7+X2JY8cLLNsPfW/RdKgwZU4/E/lHwf5f8Tt/EI
GNDl8tUyPv9U9ltW2gQhOAC+Es231cXtmaXEg3KcLQ7/HhlAxEeiyJhjVgBVpePC
VXZLhQtH1WIME4Gt0XTX48kp7Uu9V1p2YGIZ8exrMQKBgQDWE/oJC004aJQwLn+z
TRL57Vt4wEoDyZEh4WQbkaIjnBUvJml5Hqiv6mai5DKqWunnr0EJt25PCDMQ8vSN
MgWvhS/aG+NLIPzetFptp319ziWfPLpJ8WkboZoJRsQ6Hho4zirUgL8ZhrKavFlB
NJds8cPxRzhsQP3RzhknjLWBiQKBgQDEvC2/cLjQWRQlJl+6Z7DUAPZVVy1kpEIN
1Ky3lKMS9VTYVyhvJHEW3zwekMUICit8Zem5c+FgAkivuFQgUn9b98wONGy9SgAK
HNjIaJDGjq2ce0iTSn5WV7+84SE+z1OT8iqHdrvjLQ2V63kZ25eXNYCfRPKdf/qe
hSYmKcOzcQKBgHxTu7l269Dfw3g7+QP7thKaC66UFige7v+7M3VjXcPKiO8KIuUp
rhQEULk3SElxZTidqmrnMdQKUgX845QAwhaOhhzoZ1ehf9oi6gWW6SWgDG9vSE1b
O4zFjHzosVuDUf09ltg1MUa02JNO4ZMh5PNrcT11/Em6cO5hAHDcoijpAoGBAKuR
+MuVwHdi2CC14JItz5Zz6F/wkRPN9BUfviizpavo7D9nc0nKHB34PPPjCRHD3Ly2
HCixmIEkPMOSGzu89nj8F6bjrVk+6d3n3l6YYnnnAB0Rnu9k7dza1cohA99E6/yA
GvrcX2r1ZX2zR393dDJYZH2BoZwdejE4qVZq4dLhAoGAdEWPhQK5VsYXKcOQdS2+
7UNexlI79GJ8EDpX6DKa85kagFg3IJIjKV992+wtYSs/pw0cFUU43gJOQQMEmQ6+
x0xqMKFoiES0tVMP7aSNAxdOLY1TaewNNExmTISlqvHSBcIHNYKMnfAQICK9XIhG
ruBgjXwDzE0Egu/MK4CT6XI=
-----END PRIVATE KEY-----`,
  client_email: "shadilock-fabrications@shadilock-fabrications.iam.gserviceaccount.com",
  client_id: "116628356259668775935",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/shadilock-fabrications%40shadilock-fabrications.iam.gserviceaccount.com",
};

// --- Google Drive Auth ---
const auth = new google.auth.GoogleAuth({
  credentials: SERVICE_ACCOUNT,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

// --- Shared folder ID ---
const FOLDER_ID = "187ZD5xwmakTCKN3uFA0yI4sfSihVpp-X";

// --- Helper: build direct Googleusercontent URL ---
const getDirectImageUrl = (fileId: string) =>
  `https://lh3.googleusercontent.com/d/${fileId}=w2000-h2000-no`;

// --- GET all files in folder with pagination ---
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "20", 10);

    const res = await drive.files.list({
      q: `'${FOLDER_ID}' in parents and trashed=false`,
      fields: "files(id, name, mimeType, modifiedTime, thumbnailLink)",
      pageSize: 1000,
    });

    const allFiles = res.data.files || [];
    const totalFiles = allFiles.length;

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pagedFiles = allFiles.slice(startIndex, endIndex);

    const formattedFiles = pagedFiles.map((file) => ({
      id: file.id!,
      name: file.name!,
      mimeType: file.mimeType,
      modifiedTime: file.modifiedTime,
      thumbnail: getDirectImageUrl(file.id!),
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

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    const res = await drive.files.create({
      requestBody: { name: file.name, parents: [FOLDER_ID] },
      media: { mimeType: file.type || "application/octet-stream", body: stream },
      fields: "id, name, mimeType, modifiedTime, thumbnailLink",
    });

    const fileId = res.data.id!;

    // Make file public
    try {
      await drive.permissions.create({
        fileId,
        requestBody: { role: "reader", type: "anyone" },
      });
    } catch (permError) {
      console.warn("Failed to set public permission:", permError);
    }

    return NextResponse.json({
      id: fileId,
      name: res.data.name!,
      mimeType: res.data.mimeType,
      modifiedTime: res.data.modifiedTime,
      thumbnail: getDirectImageUrl(fileId),
      url: `https://drive.google.com/uc?export=view&id=${fileId}`,
      message: "File uploaded successfully!",
    });
  } catch (error) {
    console.error("POST upload error:", error);
    return NextResponse.json(
      {
        error: "Failed to upload file",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
