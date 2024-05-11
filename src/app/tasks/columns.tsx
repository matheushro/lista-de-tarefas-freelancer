"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatCurrencyToBR, formatDateToBR } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { CreditCard, EllipsisVertical, Keyboard, PenIcon, Settings, Trash, User } from "lucide-react"
import { deleteTask } from "./page"

export type Payment = {
  id: string
  price: number
  priority: "pending" | "processing" | "success" | "failed"
  name: string
  expectedDelivery: string
  payDate: string
}




export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "priority",
    header: "Prioridade",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "expectedDelivery",
    header: "Data de entrega",
    cell: ({ row }) => (
      <div>
        {formatDateToBR(row.getValue("payDate"))}
      </div>
    ),
  },
  {
    accessorKey: "value",
    header: "Valor",
    cell: ({ row }) => (
      <div>
        {formatCurrencyToBR(row.getValue("value"))}
      </div>
    ),
  },
  {
    accessorKey: "payDate",
    header: "Data de pagamento",
    cell: ({ row }) => (
      <div>
        {formatDateToBR(row.getValue("payDate"))}
      </div>
    ),
  },
  {
    accessorKey: "_id",
    header: "Opções",
    cell: ({ row }) => {
      const data = row.original

      return (
      <div className="flex flex-row gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost"><EllipsisVertical /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Opções da task</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => row.columnFilters}>
                <Trash className="mr-2 h-4 w-4" />
                <span>Deletar</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PenIcon className="mr-2 h-4 w-4" />
                <span>Editar</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
          
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      )
    },
  },
]


