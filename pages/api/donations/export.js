// pages/api/donations/export.js
import * as XLSX from 'xlsx';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const donations = await prisma.donation.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const worksheet = XLSX.utils.json_to_sheet(donations);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Donations');
    
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=donations.xlsx'
    );
    
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}