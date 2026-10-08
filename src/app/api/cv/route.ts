import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

/**
 * Returns the CV as a Base64-encoded JSON response.
 * This casual extraction protection prevents users from simply navigating 
 * to a URL to trigger a native PDF download. It forces consumption through 
 * the custom React viewer.
 */
export async function GET() {
  try {
    const cvPath = path.join(process.cwd(), "src", "private", "cv.pdf");
    const fileBuffer = await fs.readFile(cvPath);
    
    return NextResponse.json({
      success: true,
      data: fileBuffer.toString("base64"),
    }, {
      headers: {
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400"
      }
    });
  } catch (error) {
    console.error("[cv-api] Failed to read CV file", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
