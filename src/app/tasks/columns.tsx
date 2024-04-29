"use client"

import { formatCurrencyToBR, formatDateToBR } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"


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
]
