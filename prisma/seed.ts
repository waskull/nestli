import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { hash } from "bcryptjs";
import { Role } from "../constants/rol";

async function main() {
    const res = await prisma.employee.findFirst({ where: { email: 'mrtncsto@gmail.com' } });
    if (!res) {
        const admin = await prisma.employee.create({
            data: {
                email: 'mrtncsto@gmail.com',
                firstname: 'Martin',
                password: await hash(process.env.ADMIN_PASSWORD!, 12),
                lastname: 'Castillo',
                dni: "22618265",
                phone: "123456789",
                rol: Role.MANAGER,
                birthdate: new Date("1990-10-10"),
                address: "address"
            },
        });
        console.log(`Administrador ${admin.lastname} ${admin.firstname}, correo: ${admin.email}`);
    }
    console.log("FIN DEL SEED");

}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });