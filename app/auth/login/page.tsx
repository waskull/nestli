"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import DarkModeButton from "@/components/darkModeButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, TloginSchema } from "@/schemas/authSchema";
import { ButtonLoading } from "@/components/loadingButton";
import { useRouter } from "next/navigation";
export default function Login(): JSX.Element {
    const router = useRouter();
    const onSubmit = async (data: TloginSchema) => {
        const valid = await trigger();
        function sleep(ms:number) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        
        await sleep(1000);
        console.log(valid ? 'Valid' : 'Invalid');
        router.push("/dashboard");
    };
    const {
        register,
        trigger,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setError,
    } = useForm<TloginSchema>({
        // connnect zod to react-hook-form via zodResolver
        resolver: zodResolver(loginSchema),
    });
    return (
        <>
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <DarkModeButton />
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">
                            INICIO DE SESIÓN
                        </h1>
                        <p className="text-balance text-muted-foreground">
                            Introduce tu correo y contraseña
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Correo</Label>
                            <Input
                                {...register("email")}
                                id="email"
                                name="email"
                                placeholder="correo@gmail.com"
                                type="email"
                            />{errors?.email?.message && (
                                <p className="text-red-500 dark:text-red-600">{`${errors?.email?.message}`}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Contraseña</Label>
                                <a
                                    href="/forgot-password"
                                    className="ml-auto inline-block text-sm underline"
                                >
                                    Olvidaste tu contraseña?
                                </a>
                            </div>
                            <Input {...register("password")} id="password" type="password" required />
                            {errors.password && (
                                <p className="text-red-500 dark:text-red-600">{`${errors.password.message}`}</p>
                            )}
                        </div>
                        {!isSubmitting ? (
                            <Button type="submit" onClick={handleSubmit(onSubmit)} className="w-full">
                                Iniciar sesión
                            </Button>

                        ) : (
                            <ButtonLoading />
                        )}
                    </div>
                    <div className="mt-4 text-center text-sm">
                        No tienes una cuenta?
                        <a href="/auth/register" className="underline ml-1">
                            Registrate
                        </a>
                    </div>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/background.jpg"
                    alt="Image"
                    width={1920}
                    height={1080}
                    className="h-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </>
    )
}