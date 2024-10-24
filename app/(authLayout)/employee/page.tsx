import { Button } from '@/components/ui/button'
import { DataTable } from './TableList';
import { Payment, columns } from "./columns"
type Paymentt = {
  id: string
  phone: string
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const data: Paymentt[] = [
  {
    id: "728ed52f",
    phone: "54355464564545",
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    phone: "5435345345345",
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id:"1234",
    phone: "042494325",
    status: "success",
    email: "prueba@example.com",
  },
  {
    id:"2234",
    phone: "041294325",
    status: "failed",
    email: "test@example.com",
  }
]

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      phone: "5435345345345",
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}
export default function Employee() {
  const isTrue: boolean = true;
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          Empleados
        </h1>
      </div>
      {!isTrue ? (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              No hay ningun empleado
            </h3>
            <p className="text-sm text-muted-foreground">
              Introduce un empleado para comenzar.
            </p>
            <Button className="mt-4">
              Agregar empleado
            </Button>
          </div>
        </div>
      ) : (
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
        
      )}
    </div>
  );
}