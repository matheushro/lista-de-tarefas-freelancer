'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useEffect, useRef, useState } from "react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Todo } from "../types"
import { upsertTodoSchema } from "../schema"
import { toast } from "@/components/ui/use-toast"
import { upsertTodo } from "../actions"
import { useRouter } from "next/navigation"
import Money from "@/components/ui/input-money"


type TodoUpsertSheetProps = {
    children?: React.ReactNode
    defaultValue?: Todo
}


export function TodoUpsertSheet({children, defaultValue}: TodoUpsertSheetProps) {
  
    const router = useRouter()

    const defaultValues = {
        id: defaultValue?.id ?? "",
        name: defaultValue?.name ?? "",
        description: defaultValue?.description ?? "",
        expectedDelivery: defaultValue?.expectedDelivery
          ? new Date(defaultValue.expectedDelivery).toISOString().substr(0, 10)
          : "",
        priority: defaultValue?.priority ?? "",
        value: defaultValue?.value ?? "",
        payDate: defaultValue?.payDate
          ? new Date(defaultValue.payDate).toISOString().substr(0, 10)
          : "",
    };
    const form = useForm<z.infer<typeof upsertTodoSchema>>({
        resolver: zodResolver(upsertTodoSchema),
        defaultValues: defaultValues,
    })

    useEffect(() => {
        if (form && defaultValues) {
            form.reset(defaultValues);
        }
    }, [defaultValue]);

    const ref = useRef<HTMLDivElement>(null)
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(values: z.infer<typeof upsertTodoSchema>) {
        setIsLoading(true)

        try {
            
            const response = await upsertTodo(values);
            console.log(response)
            toast({
                title: "Task adicionada com sucesso",
            })
            form.reset();
            router.refresh()
            ref.current?.click()

        } catch (error: any) {
            toast({
                title: "Erro ao criar task",
                description: error.message,
            })
        }
        setIsLoading(false) 

    }

    return (
    <Sheet>
        <SheetTrigger asChild>
            <div ref={ref}>{children}</div>
        </SheetTrigger>
        <SheetContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <SheetHeader>
                        <SheetTitle>
                            {defaultValue ? `Edit task` : 'Create new task'}
                        </SheetTitle>
                        <SheetDescription>
                            {defaultValue ? `Edit task` : 'Add a new task'}
                            
                        </SheetDescription>
                    </SheetHeader>
                                    <div className="flex flex-col gap-5">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormLabel>Name*</FormLabel>
                                                    <FormControl>
                                                        <Input disabled={isLoading} className="w-full" placeholder="Task name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="flex flex-row gap-5">
                                            
                                            <FormField
                                                control={form.control}
                                                name="expectedDelivery"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormLabel>Expected Delivery</FormLabel>
                                                        <FormControl>
                                                            <Input  disabled={isLoading} className="w-full" type="date" {...field}  value={field.value ?? ""}/>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="priority"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormLabel>Priority</FormLabel>
                                                        <FormControl>
                                                            <Select disabled={isLoading} onValueChange={field.onChange} defaultValue={field.value}>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Priority" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Urgente">Urgente</SelectItem>
                                                                    <SelectItem value="Alta">Alta</SelectItem>
                                                                    <SelectItem value="Média">Média</SelectItem>
                                                                    <SelectItem value="Baixa">Baixa</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea disabled={isLoading} placeholder="Task description" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="flex flex-row gap-5">
                                            <FormField
                                                control={form.control}
                                                name="value"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormLabel>Price</FormLabel>
                                                        <FormControl>
                                                            <Money 
                                                                disabled={isLoading}
                                                                id="price" 
                                                                value={field.value}
                                                                onChange={field.onChange} 
                                                                placeholder='Valor de cada ticket'  
                                                                defaultValue={field.value}  
                                                            />  
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="payDate"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormLabel>Pay Date</FormLabel>
                                                        <FormControl>
                                                            <Input disabled={isLoading} type="date" {...field}  value={field.value ?? ""}/>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>

                             
                        
                    <SheetFooter>
                        <Button type="submit">
                            {defaultValue ? `Edit ${defaultValue.name}` : 'Create new task'}
                        </Button>
                    </SheetFooter>
                </form>
            </Form>
        </SheetContent>
           
    </Sheet>
    )
}
