"use client";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import menuList, { IMenu } from "@/constants/menu";
import { Bell, Home, LineChart, Package, Package2, ShoppingCart, Users } from 'lucide-react';
import NextLink from 'next/link';

export default function Sidebar({currentPage}: {currentPage: string}) {
    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen py-1 flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <a href="/" className="flex items-center gap-2 font-semibold">
                        <Package2 className="h-6 w-6" />
                        <span className="">Plantilla NEXT</span>
                    </a>
                    <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                        <Bell className="h-4 w-4" />
                        <span className="sr-only">Toggle notifications</span>
                    </Button>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {menuList.map((menu: IMenu) => (
                            <NextLink
                                key={menu.path}
                                href={menu.path}
                                className={currentPage === menu.path ? menu.sidebarActiveStyle : menu.sidebarStyle}>
                                <menu.icon className="h-4 w-4" />
                                <span >{menu.name}</span>
                            </NextLink>
                        ))}
                    </nav>
                </div>
                <div className="mt-auto p-4">

                        <NextLink href={"/auth/login"}>
                    <Button size="sm" variant="destructive" className="w-full">
                        Salir
                    </Button>
                    </NextLink>
                </div>
            </div>
        </div>
    )
}