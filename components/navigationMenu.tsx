"use client";
import { Badge } from '@/components/ui/badge'
import menuList, { IMenu } from "@/constants/menu";
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { CircleUser, Home, LineChart, Menu, Package, Package2, Search, ShoppingCart, Users } from 'lucide-react'
import DarkModeButton from './darkModeButton'
import NextLink from 'next/link'

export default function NavigationMenu({ currentPage }: { currentPage: string }) {
    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Package2 className="h-6 w-6" />
                {menuList.map((menu: IMenu) => (
                    <NextLink
                        key={menu.path}
                        href={menu.path}
                        className={currentPage === menu.path ? menu.active : menu.style}>
                        <span >{menu.name}</span>
                    </NextLink>
                ))}
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Activar menu de navegación</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                <SheetTitle className='mb-6'>Menu</SheetTitle>
                    <nav className="grid gap-6 text-lg font-medium">
                        {menuList.map((menu: IMenu) => (
                            <NextLink
                                key={menu.path}
                                href={menu.path}
                                className={currentPage === menu.path ? menu.active : menu.style}>
                                <span >{menu.name}</span>
                            </NextLink>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <form className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Buscar..."
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        />
                    </div>
                </form>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <CircleUser className="h-5 w-5" />
                            <span className="sr-only">Menu de usuario</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>NOMBRE</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Editar perfil</DropdownMenuItem>
                        <DropdownMenuItem>Cambiar contraseña</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <NextLink href={"/auth/login"}>
                            <DropdownMenuItem className="bg-red-600 text-white dark:text-white dark:bg-red-700 hover:bg-red-700 focus:bg-red-700 focus:text-white dark:focus:bg-red-800">Salir</DropdownMenuItem>
                        </NextLink>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DarkModeButton />
            </div>
        </header>
    );
}