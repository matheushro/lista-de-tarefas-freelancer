"use client"

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
  },
  {
    accessorKey: "price",
    header: "Valor",
  },
  {
    accessorKey: "payDate",
    header: "Data de pagamento",
  },
]
