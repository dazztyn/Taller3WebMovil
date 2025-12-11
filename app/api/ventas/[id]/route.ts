import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

//para recibir el id de la venta
interface Params {
  params: { id: string };
}

export async function PUT(request: Request, { params }: Params)
{
    try
    {
        const id = Number(params.id);
        const data = await request.json();

        //en la venta solo se podra modificar el estado del pedido y la sucursal
        const ventaActualizada = await prisma.venta.update({
            where: { id: id },
            data: {
                estado: data.estado,
                sucursal: data.sucursal
            },
        });
        return NextResponse.json(ventaActualizada);

    }
    catch (error)
    {
        console.error('Error actualizando venta:', error);
        return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: Params)
{
    try 
    {
    const id = Number(params.id);

    await prisma.venta.delete({
      where: { id: id },
    });

        return NextResponse.json({ message: 'Venta eliminada correctamente' });
    } 
    catch (error) 
    {
        console.error('Error eliminando venta:', error);
        return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 });
    }
}