"use client";
import NavigationMenu from '@/components/navigationMenu'
import Sidebar from '@/components/sidebar'
import { usePathname } from 'next/navigation';
export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const currentPage = usePathname();
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Sidebar currentPage={currentPage}/>
            <div className="flex flex-col">
                <NavigationMenu currentPage={currentPage}/>
                {children}
            </div>
        </div>
    );
}