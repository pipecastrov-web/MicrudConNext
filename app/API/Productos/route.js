// app/api/productos/route.js
import { NextResponse } from 'next/server'; 
import { getProductos, createProducto } from '@/lib/db'; 
// GET /api/productos -> Retorna todos los productos 

export async function GET() { 
    const productos = getProductos(); 
    return NextResponse.json(productos); 
} 

// POST /api/productos -> Crea un nuevo producto 
export async function POST(request) { 
    const body = await request.json(); // Leer datos del body 

// Validacion basica 
 if (!body.nombre || !body.precio) { 
    return NextResponse.json( 
        { error: 'Nombre y precio son obligatorios' }, 
        { status: 400 } 
    ); 
} 

const nuevo = createProducto(body); 
return NextResponse.json(nuevo, { status: 201 }); 
}
