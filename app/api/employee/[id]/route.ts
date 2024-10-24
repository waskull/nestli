import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { EmployeeSchema } from "@/schemas/employeeSchema";
import { Role } from "@/constants/rol";

async function getEmployee(id: string) {
    const employee = await prisma.employee.findUnique({ where: { id: id, state: true }, select: { birthdate: true, firstname: true, lastname: true, rol: true, dni: true, email: true, id: true, phone: true, isActive: true, address: true, created_at: true, updated_at: true } });
    return employee;
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
    const employee = await getEmployee(params.id);
    return NextResponse.json(employee ? employee : { message: "El empleado solicitado no existe" }, { status: employee ? 200 : 404 });
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
    const employeeId = await getEmployee(params.id);
    try {
        const { data } = await request.json();
        const {confirmPassword, ...formData} = EmployeeSchema.parse(data);
        let employee = await getEmployee(params.id);
        if(!employee) {return NextResponse.json({ok:false, message: "Error el empleado no existe" }, { status: 404 });}
        if(employee.rol !== (Role.ADMIN || Role.MANAGER) && params.id !== employeeId?.id) {return NextResponse.json({ok:false, message: "No puedes editar otro empleado" }, { status: 403 });}
        if(employee.rol !== Role.ADMIN && formData.rol === Role.ADMIN) {return NextResponse.json({ok:false, message: "No tienes los privilegios para editar el usuario administrador" }, { status: 403 });}
        employee = await prisma.employee.update({ where: { id: params.id }, data:  {firstname:formData.firstname, lastname:formData.lastname, rol:formData.rol, dni:formData.dni, email:formData.email, phone:formData.phone, address:formData.address}  });
        return NextResponse.json({ok:true, message: `Empleado ${employee?.lastname} ${employee?.firstname} editado` }, { status: 200 });
    } catch (e: any) {
        console.log(typeof e);
        console.log("error: ", e, e.errors[0].message);
        return NextResponse.json({ok:false, message: "Error de validación", errors: e.errors }, { status: 400 });
    };
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
    const employee = await getEmployee(params.id);
    if (!employee) return NextResponse.json({ok:false, message: "El empleado solicitado no existe" }, { status: 404 });
    await prisma.employee.update({ where: { id: params.id }, data: { state: false } });
    return NextResponse.json({ok:true, message: `El empleado ${employee.lastname} ${employee.firstname} ha sido eliminado` }, { status: 200 });
}