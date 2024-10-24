import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import DarkModeButton from "@/components/darkModeButton";
export default function Register() {
    return (
        <>
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/placeholder.svg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <DarkModeButton />
                        <h1 className="text-3xl font-bold">
                            REGISTRO DE USUARIO
                        </h1>
                        <p className="text-balance text-muted-foreground">
                            Introduce los datos solicitados
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Correo</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="correo@gmail.com"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Registrarse
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Ya tienes una cuenta?
                        <a href="/auth/login" className="underline ml-1">
                            Iniciar sesión
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}