import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILES_DATA_FILE = path.join(DATA_DIR, 'files.json');

// Ensure data directory exists
async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

// GET files data
export async function GET() {
  try {
    await ensureDataDir();
    
    if (existsSync(FILES_DATA_FILE)) {
      const data = await readFile(FILES_DATA_FILE, 'utf-8');
      return NextResponse.json(JSON.parse(data));
    }
    
    return NextResponse.json({
      technicalReport: { url: '', name: '' },
      teamIntroduction: { url: '', name: '' },
      poster: { url: '', name: '' },
      outreach: { url: '', name: '' },
    });
  } catch (error) {
    console.error('Error reading files data:', error);
    return NextResponse.json(
      { error: 'Failed to read files data' },
      { status: 500 }
    );
  }
}

// POST/UPDATE file
export async function POST(request: NextRequest) {
  try {
    await ensureDataDir();
    
    const formData = await request.formData();
    const fileType = formData.get('fileType') as string;
    const file = formData.get('file') as File | null;

    if (!file || !fileType) {
      return NextResponse.json(
        { error: 'File and fileType are required' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }
    
    const fileExtension = file.name.split('.').pop();
    const fileName = `${fileType}-${Date.now()}.${fileExtension}`;
    const filePath = path.join(uploadsDir, fileName);
    
    await writeFile(filePath, buffer);
    const fileUrl = `/uploads/${fileName}`;

    // Read existing data
    let filesData: any = {
      technicalReport: { url: '', name: '' },
      teamIntroduction: { url: '', name: '' },
      poster: { url: '', name: '' },
      outreach: { url: '', name: '' },
    };
    
    if (existsSync(FILES_DATA_FILE)) {
      const data = await readFile(FILES_DATA_FILE, 'utf-8');
      filesData = JSON.parse(data);
    }

    // Update the specific file
    filesData[fileType] = {
      url: fileUrl,
      name: file.name,
    };

    await writeFile(FILES_DATA_FILE, JSON.stringify(filesData, null, 2));

    return NextResponse.json({ success: true, fileUrl, fileName: file.name });
  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json(
      { error: 'Failed to save file' },
      { status: 500 }
    );
  }
}

