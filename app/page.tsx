import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Facebook, Twitter, Instagram, LogIn, UserRoundPlus } from "lucide-react"
import Link from "next/link"
import Image from "next/image";



export default function EcommerceLandingPage() {
  const COMPANYNAME = "TEMPLATE NEXT";
  return (
    <div className="flex flex-col min-h-screen ml-2">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mr-2 flex h-16 items-center">
          <Link href="/auth/login" className="flex items-center space-x-2">
            <ShoppingCart className="ml-2 h-6 w-6" />
            <span className="font-bold">{COMPANYNAME}</span>
          </Link>
          <div className="ml-auto" />
          <Button variant="outline" size="icon" className="ml-4">
            <LogIn className="h-4 w-4" />
            <span className="sr-only">Login</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 ">
        <section className="w-full  py-12 md:py-24 lg:py-32 xl:py-48 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <Image
                alt="Hero product"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                height="550"
                src="/placeholder.svg"
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Descubre los mejores precios
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Contamos con los mejores precios y el delivery mas rapido de Maturín.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/login" className="flex items-center space-x-2">
                    
                    <Button size="lg"><LogIn className="h-6 w-6"/>Iniciar sesión</Button>
                  </Link>

                  <Link href="/auth/register" className="flex items-center space-x-2">
                    
                    <Button size="lg" variant="outline"><UserRoundPlus className="h-6 w-6"/>Registrarse</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className=" px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-8">Productos mas vendidos</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="group relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    alt={`Product ${item}`}
                    className="object-cover w-full h-60"
                    height="300"
                    src={`/placeholder.svg?height=300&width=300`}
                    width="300"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">PRODUCTO_NOMBRE</h3>
                    <p className="text-muted-foreground">$99.99</p>
                    <Button className="mt-2 w-full">Ver detalles</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container mx-auto max-w-3xl px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Mantente al día</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Subscribete a nuestro newsletter para estar al tanto de nuestras ofertas.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit">Suscribirse</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8">
          <div className="flex-1 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingCart className="h-6 w-6" />
              <span className="font-bold">{COMPANYNAME}</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Tu tienda favorita de comercios
            </p>
          </div>
          <div className="flex-1 space-y-4">
            <h3 className="font-semibold">Links de interes</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="hover:underline" href="/">
                  Inicio
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/dashboard">
                  Tienda
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="#">
                  Acerca de
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="#">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex-1 space-y-4">
            <h3 className="font-semibold">Siguenos</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t py-6 text-center text-sm">
          <p>© 2024 {COMPANYNAME}. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}