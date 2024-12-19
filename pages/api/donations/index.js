// pages/api/donations/index.js
import { PrismaClient } from '@prisma/client';
import { createRouter } from 'next-connect';

const prisma = new PrismaClient();
const router = createRouter();

router
  .get(async (req, res) => {
    try {
      const donations = await prisma.donation.findMany({
        orderBy: { createdAt: 'desc' },
      });
      res.json(donations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const donation = await prisma.donation.create({
        data: req.body,
      });
      res.status(201).json(donation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router.handler();