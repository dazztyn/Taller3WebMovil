-- CreateTable
CREATE TABLE "Venta" (
    "id" SERIAL NOT NULL,
    "producto" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "metodoPago" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "sucursal" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Venta_pkey" PRIMARY KEY ("id")
);
