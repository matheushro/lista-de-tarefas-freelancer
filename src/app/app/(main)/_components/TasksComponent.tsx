'use client'
import { DashboardPage, DashboardPageHeader, DashboardPageHeaderNav, DashboardPageMain } from "@/components/dashboard/page"
import { TodoDataTable } from "./todo-datatable"

import { TodoUpsertSheet } from "./todo-upsert-sheet"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { Todo } from "../types"
import { useState } from "react"

type TodoDataTable = {
    data: Todo[]
}

  
export default function TasksComponent({data}: TodoDataTable){

    const [updateTodo, setUpdateTodo] = useState<undefined | Todo>(undefined)
    const onEdit = (todo: Todo) => {
        setUpdateTodo(todo)
        document.getElementById('addTaskButton')?.click();
    }; 
    
    return (
        <DashboardPage>
            <DashboardPageHeader>
                Tasks
                <DashboardPageHeaderNav>
                    <TodoUpsertSheet
                        defaultValue={updateTodo}
                    >
                        <Button 
                            id="addTaskButton" 
                            variant={'outline'} 
                            size={'sm'}
                        >
                            <PlusIcon className="w-4 h-3 mr-3" />
                            Add Task
                        </Button>
                    </TodoUpsertSheet>
                </DashboardPageHeaderNav>
            </DashboardPageHeader>
            
            <DashboardPageMain>
                <TodoDataTable data={data} onEdit={onEdit} />
            </DashboardPageMain>
        </DashboardPage>
    )
}