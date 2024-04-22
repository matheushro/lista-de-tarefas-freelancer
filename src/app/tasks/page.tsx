import CardNewTask from "@/components/tasks/CardNewTask"
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"


async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
        id: "728ed52f",
        price: 100,
        priority: "pending",
        name: "m@example.com",
        expectedDelivery: "2024-11-29",
        payDate: "2024-12-01"
    },
    {
        id: "728ed52f",
        price: 100,
        priority: "pending",
        name: "m@example.com",
        expectedDelivery: "2024-11-29",
        payDate: "2024-12-01"
    },
    {
        id: "728ed52f",
        price: 100,
        priority: "pending",
        name: "m@example.com",
        expectedDelivery: "2024-11-29",
        payDate: "2024-12-01"
    },
    {
        id: "728ed52f",
        price: 100,
        priority: "pending",
        name: "m@example.com",
        expectedDelivery: "2024-11-29",
        payDate: "2024-12-01"
    },
    {
        id: "728ed52f",
        price: 100,
        priority: "pending",
        name: "m@example.com",
        expectedDelivery: "2024-11-29",
        payDate: "2024-12-01"
    },
    {
        id: "728ed52f",
        price: 100,
        priority: "pending",
        name: "m@example.com",
        expectedDelivery: "2024-11-29",
        payDate: "2024-12-01"
    },
    {
        id: "728ed52f",
        price: 100,
        priority: "pending",
        name: "m@example.com",
        expectedDelivery: "2024-11-29",
        payDate: "2024-12-01"
    },
    {
        id: "728ed52f",
        price: 100,
        priority: "pending",
        name: "m@example.com",
        expectedDelivery: "2024-11-29",
        payDate: "2024-12-01"
    },
    {
        id: "728ed52f",
        price: 100,
        priority: "pending",
        name: "m@example.com",
        expectedDelivery: "2024-11-29",
        payDate: "2024-12-01"
    },
    {
        id: "728ed52f",
        price: 100,
        priority: "pending",
        name: "m@example.com",
        expectedDelivery: "2024-11-29",
        payDate: "2024-12-01"
    },
    {
        id: "728ed52f",
        price: 100,
        priority: "pending",
        name: "m@example.com",
        expectedDelivery: "2024-11-29",
        payDate: "2024-12-01"
    },
    {
        id: "728ed52f",
        price: 100,
        priority: "pending",
        name: "m@example.com",
        expectedDelivery: "2024-11-29",
        payDate: "2024-12-01"
    },
    {
        id: "728ed52f",
        price: 100,
        priority: "pending",
        name: "m@example.com",
        expectedDelivery: "2024-11-29",
        payDate: "2024-12-01"
    },
    {
        id: "728ed52f",
        price: 100,
        priority: "pending",
        name: "m@example.com",
        expectedDelivery: "2024-11-29",
        payDate: "2024-12-01"
    },
    {
        id: "728ed52f",
        price: 100,
        priority: "pending",
        name: "m@example.com",
        expectedDelivery: "2024-11-29",
        payDate: "2024-12-01"
    },
    // ...
  ]
}

export default async function task() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10 space-y-5">
        <CardNewTask />
        <DataTable columns={columns} data={data} />
    </div>
  )
}
