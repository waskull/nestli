import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { EmployeeSchema } from "@/schemas/employeeSchema";
import { Role } from "@/constants/rol";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;
    const take = limit;
    const totalEmployees = await prisma.employee.count({ where: { state: true, rol: { not: Role.ADMIN } } });
    const employees = await prisma.employee.findMany({
        orderBy: {
            lastname: "desc",
        },
        skip,
        take,
        where: { state: true, rol: { not: Role.ADMIN } }, select: { birthdate: true, firstname: true, lastname: true, rol: true, dni: true, email: true, id: true, phone: true, isActive: true, address: true, created_at: true, updated_at: true }
    });
    return NextResponse.json({ data: employees, total: Math.ceil(totalEmployees / limit) }, { status: 200 });
}

export async function POST(request: NextRequest) {
    try {
        const { data } = await request.json();
        const {confirmPassword, ...formData} = EmployeeSchema.parse(data);
        const employee = await prisma.employee.findUnique({ where: { email: formData.email, dni: formData.dni } });
        if (employee) return NextResponse.json({ ok:false,message: "El empleado ya existe" }, { status: 409 });
        await prisma.employee.create({ data: formData });
        return NextResponse.json({ok:true, message: `Empleado ${formData.firstname} ${formData.lastname} creado` }, { status: 201 });
    } catch (e: any) {
        console.log(typeof e);
        console.log("error: ", e, e.errors[0].message);
        return NextResponse.json({ok:false, message: "Error de validación", errors: e.errors }, { status: 400 });
    };
}