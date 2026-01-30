import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const PHOTOS_DATA_FILE = path.join(DATA_DIR, 'team-photos.json');

// Ensure data directory exists
async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

// GET team photos
export async function GET() {
  try {
    await ensureDataDir();
    
    if (existsSync(PHOTOS_DATA_FILE)) {
      const data = await readFile(PHOTOS_DATA_FILE, 'utf-8');
      return NextResponse.json(JSON.parse(data));
    }
    
    return NextResponse.json({ photos: [] });
  } catch (error) {
    console.error('Error reading team photos:', error);
    return NextResponse.json(
      { error: 'Failed to read team photos' },
      { status: 500 }
    );
  }
}

// POST new team photo
export async function POST(request: NextRequest) {
  try {
    await ensureDataDir();
    
    const formData = await request.formData();
    const photoFile = formData.get('photo') as File | null;

    if (!photoFile || photoFile.size === 0) {
      return NextResponse.json(
        { error: 'No photo file provided' },
        { status: 400 }
      );
    }

    const bytes = await photoFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'team-photos');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }
    
    const fileExtension = photoFile.name.split('.').pop();
    const fileName = `team-photo-${Date.now()}.${fileExtension}`;
    const filePath = path.join(uploadsDir, fileName);
    
    await writeFile(filePath, buffer);
    const photoUrl = `/uploads/team-photos/${fileName}`;

    // Read existing photos
    let photosData: { photos: string[] } = { photos: [] };
    if (existsSync(PHOTOS_DATA_FILE)) {
      const data = await readFile(PHOTOS_DATA_FILE, 'utf-8');
      photosData = JSON.parse(data);
    }

    // Add new photo
    photosData.photos.push(photoUrl);

    await writeFile(PHOTOS_DATA_FILE, JSON.stringify(photosData, null, 2));

    return NextResponse.json({ photoUrl, photos: photosData.photos });
  } catch (error) {
    console.error('Error saving team photo:', error);
    return NextResponse.json(
      { error: 'Failed to save team photo' },
      { status: 500 }
    );
  }
}

// DELETE team photo
export async function DELETE(request: NextRequest) {
  try {
    await ensureDataDir();
    
    const { photoUrl } = await request.json();

    if (!photoUrl) {
      return NextResponse.json(
        { error: 'Photo URL is required' },
        { status: 400 }
      );
    }

    // Read existing photos
    let photosData: { photos: string[] } = { photos: [] };
    if (existsSync(PHOTOS_DATA_FILE)) {
      const data = await readFile(PHOTOS_DATA_FILE, 'utf-8');
      photosData = JSON.parse(data);
    }

    // Remove photo from array
    photosData.photos = photosData.photos.filter((url) => url !== photoUrl);

    // Delete file from filesystem
    const fileName = photoUrl.split('/').pop();
    if (fileName) {
      const filePath = path.join(process.cwd(), 'public', 'uploads', 'team-photos', fileName);
      if (existsSync(filePath)) {
        await unlink(filePath);
      }
    }

    await writeFile(PHOTOS_DATA_FILE, JSON.stringify(photosData, null, 2));

    return NextResponse.json({ success: true, photos: photosData.photos });
  } catch (error) {
    console.error('Error deleting team photo:', error);
    return NextResponse.json(
      { error: 'Failed to delete team photo' },
      { status: 500 }
    );
  }
}

