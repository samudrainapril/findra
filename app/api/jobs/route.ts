import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Job from '@/lib/models/Job';
import { ObjectId } from 'mongodb';

export async function POST(req: Request) {
  await connectMongo();
  const body = await req.json();

  try {
    const job = new Job(body);
    await job.save();
    return NextResponse.json({ success: true, job });
  } catch {
    return NextResponse.json({ success: false, message: 'Gagal menyimpan data' }, { status: 500 });
  }
}

export async function GET() {
  await connectMongo();

  try {
    const jobs = await Job.find().sort({ _id: -1 });
    return NextResponse.json(jobs);
  } catch {
    return NextResponse.json({ success: false, message: 'Gagal mengambil data' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  await connectMongo();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, message: 'ID tidak valid' }, { status: 400 });
  }

  try {
    const result = await Job.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: 'Lowongan tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Lowongan berhasil dihapus' });
  } catch {
    return NextResponse.json({ success: false, message: 'Gagal menghapus data' }, { status: 500 });
  }
}
