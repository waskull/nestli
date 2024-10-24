import { Role as Rol } from '@/constants/rol';
import EnumToString from '@/helpers/enumToString';
import { z } from 'zod';
export const EmployeeSchema = z.object({
    email: z.string({ message: "El correo debe de ser una cadena de caracteres" }).trim().email("Debes proveer un correo valido"),
    password: z
    .string({ message: "La contraseña debe de ser una cadena de caracteres", required_error: "Debes proveer una contraseña" })
        .min(4, "La contraseña debe de tener minimo 4 caracteres")
        .max(50, "La contraseña debe de tener maximo 50 caracteres"),
    confirmPassword: z
        .string({ message: "La contraseña de confirmación debe de ser una cadena de caracteres" })
        .min(4, "La contraseña de confirmación debe de tener minimo 4 caracteres")
        .max(50, "La contraseña de confirmación debe de tener maximo 50 caracteres"),
    firstname: z
        .string({ message: "El nombre debe de ser una cadena de caracteres",required_error: "Debes proveer un nombre"  })
        .min(3, "El nombre debe de tener minimo 3 caracteres")
        .max(50, "El nombre debe de tener maximo 50 caracteres"),
    lastname: z
        .string({ message: "El apellido debe de ser una cadena de caracteres", required_error: "Debes proveer un apellido"  })
        .min(3, "El apellido debe de tener minimo 3 caracteres")
        .max(50, "El apellido debe de tener maximo 50 caracteres"),
    phone: z
        .string({ message: "El telefono debe de ser una cadena de caracteres" })
        .min(9, "El telefono debe de tener minimo 9 caracteres")
        .max(50, "El telefono debe de tener maximo 50 caracteres")
        .optional(),
    dni: z
        .string({ message: "La cedula debe de ser una cadena de caracteres" })
        .min(5, "La cedula debe de tener minimo 5 caracteres")
        .max(50, "La ceduladebe de tener maximo 50 caracteres"),
    rol: z.nativeEnum(Rol, { errorMap: () => { return { message: `El rol debe de ser uno valido entre: ${EnumToString(Rol)}` } } }),
    address: z
        .string({ message: "La dirección debe de ser una cadena de caracteres" })
        .min(5, "La dirección debe de tener minimo 5 caracteres")
        .max(50, "La dirección de tener maximo 100 caracteres")
        .optional(),
    birthdate: z.coerce.date({ message: "La fecha de nacimiento debe de ser una fecha valida" }),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no son iguales",
        path: ["password"],
    });

export type TemployeeSchema = z.infer<typeof EmployeeSchema>;