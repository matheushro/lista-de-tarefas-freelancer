
import { getUserTodos } from "./actions"
import TasksComponent from "./_components/TasksComponent"

export default async function Page(){
    const todos = await getUserTodos()
    return (
        <TasksComponent data={todos} />
    )
}