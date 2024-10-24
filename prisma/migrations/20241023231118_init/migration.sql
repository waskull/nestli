-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Administrador', 'Analista', 'Asistente', 'Gerente');

-- CreateEnum
CREATE TYPE "Payment" AS ENUM ('Efectivo', 'Debito', 'PagoMovil', 'Transferencia');

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(70) NOT NULL,
    "firstname" VARCHAR(50) NOT NULL,
    "lastname" VARCHAR(50) NOT NULL,
    "phone" VARCHAR(20),
    "birthdate" TIMESTAMP(3),
    "state" BOOLEAN NOT NULL DEFAULT true,
    "address" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "dni" VARCHAR(30) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(70) NOT NULL,
    "firstname" VARCHAR(50) NOT NULL,
    "lastname" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "rol" "Role" NOT NULL DEFAULT 'Analista',
    "phone" VARCHAR(20),
    "address" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "state" BOOLEAN DEFAULT true,
    "birthdate" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "dni" VARCHAR(30),

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT,
    "biography" TEXT DEFAULT 'Hi!',
    "image" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_dni_key" ON "Patient"("dni");

-- CreateIndex
CREATE INDEX "Patient_firstname_lastname_idx" ON "Patient"("firstname", "lastname");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_dni_key" ON "Employee"("dni");

-- CreateIndex
CREATE INDEX "Employee_firstname_lastname_idx" ON "Employee"("firstname", "lastname");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
