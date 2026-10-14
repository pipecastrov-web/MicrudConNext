import { NextResponse } from 'next/server';
import { getProductoById, updateProducto, deleteProducto } from '@/lib/db';

// GET /API/Productos/1 -> un producto
export async function GET(request, { params }) {
  const { id } = await params;
  const producto = getProductoById(Number(id));
  if (!producto) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }
  return NextResponse.json(producto);
}

// PUT /API/Productos/1 -> editar
export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  const actualizado = updateProducto(Number(id), body);
  if (!actualizado) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }
  return NextResponse.json(actualizado);
}

// DELETE /API/Productos/1 -> eliminar
export async function DELETE(request, { params }) {
  const { id } = await params;
  const ok = deleteProducto(Number(id));
  if (!ok) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }
  return NextResponse.json({ mensaje: 'Producto eliminado' });
}