import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const SPONSOR_FILE = path.join(DATA_DIR, 'sponsor.json');

// Ensure data directory exists
async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

// GET sponsor data
export async function GET() {
  try {
    await ensureDataDir();
    
    if (existsSync(SPONSOR_FILE)) {
      const data = await readFile(SPONSOR_FILE, 'utf-8');
      return NextResponse.json(JSON.parse(data));
    }
    
    return NextResponse.json({
      name: '',
      description: '',
      logoUrl: '',
    });
  } catch (error) {
    console.error('Error reading sponsor data:', error);
    return NextResponse.json(
      { error: 'Failed to read sponsor data' },
      { status: 500 }
    );
  }
}

// POST/UPDATE sponsor data
export async function POST(request: NextRequest) {
  try {
    await ensureDataDir();
    
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const logoFile = formData.get('logo') as File | null;

    let logoUrl = '';

    // Handle logo upload
    if (logoFile && logoFile.size > 0) {
      const bytes = await logoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true });
      }
      
      const fileExtension = logoFile.name.split('.').pop();
      const fileName = `sponsor-logo-${Date.now()}.${fileExtension}`;
      const filePath = path.join(uploadsDir, fileName);
      
      await writeFile(filePath, buffer);
      logoUrl = `/uploads/${fileName}`;
    }

    // Read existing data to preserve logoUrl if no new logo
    let existingData = { name: '', description: '', logoUrl: '' };
    if (existsSync(SPONSOR_FILE)) {
      const data = await readFile(SPONSOR_FILE, 'utf-8');
      existingData = JSON.parse(data);
    }

    const sponsorData = {
      name: name || existingData.name,
      description: description || existingData.description,
      logoUrl: logoUrl || existingData.logoUrl,
    };

    await writeFile(SPONSOR_FILE, JSON.stringify(sponsorData, null, 2));

    return NextResponse.json(sponsorData);
  } catch (error) {
    console.error('Error saving sponsor data:', error);
    return NextResponse.json(
      { error: 'Failed to save sponsor data' },
      { status: 500 }
    );
  }
}

