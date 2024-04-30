import CardNewTask from "@/components/tasks/CardNewTask"
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import { GetTasks } from "@/actions/GetTasks"
import { DeleteTask } from "@/actions/DeleteTask"


async function getData(){
  return GetTasks()
}

export async function deleteTask(id: string){
  await DeleteTask(id)
}

export default async function task() {
  const {tasks} = await getData()
  console.log(tasks)

  return (
    <div className="container mx-auto py-10 space-y-5">
        <CardNewTask />
        <DataTable columns={columns} data={tasks} />
    </div>
  )
}
