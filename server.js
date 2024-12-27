const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();

const prisma = new PrismaClient();
app.use(express.json());

// Endpoint Menambah Data
app.post('/barang', async (req, res) => {
  const { status_barang, nama_barang } = req.body;
  try {
    const barang = await prisma.barang.create({
      data: { status_barang, nama_barang },
    });
    res.status(201).json(barang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint Menghapus Data
app.delete('/barang/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.barang.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Data barang tidak ditemukan' });
  }
});

// Endpoint Mengedit Data
app.put('/barang/:id', async (req, res) => {
  const { id } = req.params;
  const { status_barang, nama_barang } = req.body;
  try {
    const barang = await prisma.barang.update({
      where: { id: parseInt(id) },
      data: { status_barang, nama_barang },
    });
    res.status(200).json(barang);
  } catch (error) {
    res.status(404).json({ error: 'Data barang tidak ditemukan' });
  }
});

// Menjalankan Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
