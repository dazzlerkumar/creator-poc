'use client'
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function HabuildLogo({ className }: { className?: string }) {
    return (<div className={cn("relative w-14 aspect-[221/61] mb-6", className)}>
        <Image
            src="/logo-full.png"
            alt="Habuild"
            fill
            className="object-contain"
        />
    </div>)
}