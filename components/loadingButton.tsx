import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ButtonLoading() {
    return (
        <Button>
            <Loader2 className="w-full animate-spin" />
            Cargando...
        </Button>
    )
}