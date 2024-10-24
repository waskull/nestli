
import { Bell, Home, LineChart, LucideProps, Package, Package2, ShoppingCart, Users } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export interface IMenu {
    name: string,
    path: string,
    style: string,
    sidebarStyle: string,
    sidebarActiveStyle: string,
    active: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
    roles?: string[]
}

export const menuList: IMenu[] = [
    {
        name: 'Empleados',
        path: '/employee',
        style: "text-muted-foreground transition-colors hover:text-foreground",
        active: "text-foreground transition-colors hover:text-foregroun",
        sidebarStyle: "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        sidebarActiveStyle: "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary",
        icon: Users
    },

    {
        name: 'Inicio',
        path: '/dashboard',
        style: "text-muted-foreground transition-colors hover:text-foreground",
        active: "text-foreground transition-colors hover:text-foregroun",
        sidebarStyle: "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        sidebarActiveStyle: "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        icon: Home
    },
    {
        name: 'Productos',
        path: '/products',
        style: "text-muted-foreground transition-colors hover:text-foreground",
        active: "text-foreground transition-colors hover:text-foregroun",
        sidebarStyle: "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        sidebarActiveStyle: "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        icon: Package
    },
    {
        name: 'Ventas',
        path: '/sales',
        style: "text-muted-foreground transition-colors hover:text-foreground",
        active: "text-foreground transition-colors hover:text-foreground",
        sidebarStyle: "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        sidebarActiveStyle: "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        icon: ShoppingCart
    },



    {
        name: 'Reportes',
        path: '/reports',
        style: "text-muted-foreground transition-colors hover:text-foreground",
        active: "text-foreground transition-colors hover:text-foregroun",
        sidebarStyle: "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        sidebarActiveStyle: "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        icon: LineChart
    },

];

export default menuList;