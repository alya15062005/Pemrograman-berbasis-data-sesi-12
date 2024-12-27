const request = require('supertest');
const app = require('./server');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

beforeAll(async () => {
  // Kosongkan tabel sebelum pengujian
  await prisma.barang.deleteMany();
});

afterAll(async () => {
  // Tutup koneksi Prisma
  await prisma.$disconnect();
});

describe('API Barang', () => {
  test('Menambah data barang', async () => {
    const response = await request(app)
      .post('/barang')
      .send({ status_barang: 'baru', nama_barang: 'Laptop' });

    expect(response.status).toBe(201);
    expect(response.body.nama_barang).toBe('Laptop');
    expect(response.body.status_barang).toBe('baru');
  });

  test('Menghapus data barang', async () => {
    const barang = await prisma.barang.create({
      data: { status_barang: 'lama', nama_barang: 'Printer' },
    });

    const response = await request(app).delete(`/barang/${barang.id}`);
    expect(response.status).toBe(204);

    const deletedBarang = await prisma.barang.findUnique({
      where: { id: barang.id },
    });
    expect(deletedBarang).toBeNull();
  });

  test('Mengedit data barang', async () => {
    const barang = await prisma.barang.create({
      data: { status_barang: 'bekas', nama_barang: 'Monitor' },
    });

    const response = await request(app)
      .put(`/barang/${barang.id}`)
      .send({ status_barang: 'baru', nama_barang: 'Monitor HD' });

    expect(response.status).toBe(200);
    expect(response.body.status_barang).toBe('baru');
    expect(response.body.nama_barang).toBe('Monitor HD');
  });
});
