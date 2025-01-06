import { NextResponse } from 'next/server';
import { join } from 'path';
import { promises as fs } from 'fs';
// import { stat, readFile } from 'fs/promises';

const uploadsDir = join(process.cwd(), 'uploads');

export async function GET(
  req: Request,
  { params }: { params: Promise<{ file: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const filePath = join(uploadsDir, ...resolvedParams.file);

    if (!filePath.startsWith(uploadsDir)) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
    }

    await fs.stat(filePath);

    // Read the file contents
    const file = await fs.readFile(filePath);

    // Determine the MIME type (simple handling, enhance if needed)
    const mimeType = getMimeType(filePath);

    return new NextResponse(file, {
      headers: {
        'Content-Type': mimeType,
      },
    });
  } catch (error) {
    console.error('File not found or inaccessible:', error);
    return NextResponse.json(
      { error: 'File not found or inaccessible' },
      { status: 404 }
    );
  }
}

function getMimeType(filePath: string): string {
  if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg'))
    return 'image/jpeg';
  if (filePath.endsWith('.png')) return 'image/png';
  if (filePath.endsWith('.gif')) return 'image/gif';
  if (filePath.endsWith('.webp')) return 'image/webp';
  if (filePath.endsWith('.svg')) return 'image/svg+xml';
  return 'application/octet-stream';
}
