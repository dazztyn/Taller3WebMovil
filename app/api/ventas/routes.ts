import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try
    {
        const ventas = await prisma.venta.findMany({
            orderBy: {
                fecha: 'desc'},
        });
        return NextResponse.json(ventas);
    }
    catch (error)
    {
        console.error('Error fetching ventas:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {

    try
    {
        const data = await request.json();
        const nuevaVenta = await prisma.venta.create({
            data: {
                //el id no va por configuracion de prisma
                producto: data.producto,
                categoria: data.categoria,
                monto: Number(data.monto),
                cantidad: Number(data.cantidad),
                metodoPago: data.metodoPago,
                estado: "Pendiente",
                sucursal: data.sucursal,
                //la fecha no va por configuracion de prisma
            },
        });
        return NextResponse.json(nuevaVenta, { status: 201 });
    }
    catch (error)
    {
        console.error('Error creating venta:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }

}
