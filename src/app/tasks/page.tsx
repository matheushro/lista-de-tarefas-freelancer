import CardNewTask from "@/components/tasks/CardNewTask"
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import { GetTasks } from "@/actions/GetTasks"


async function getData(){
  return GetTasks()
}

export default async function task() {
  const data = await getData()
  console.log(data)

  return (
    <div className="container mx-auto py-10 space-y-5">
        <CardNewTask />
        <DataTable columns={columns} data={data.tasks} />
    </div>
  )
}
