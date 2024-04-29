"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ButtonSubmit } from "../ui/button-submit"
import { useState } from "react"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Textarea } from "../ui/textarea"
import { useToast } from "@/components/ui/use-toast"


const formSchema = z.object({
    name: z.string().min(2, {
        message: "Nome deve ter pelo menos 2 caractéres.",
        }).max(50, {
            message: "Nome deve ter no máximo 50 caractéres.",
        }),
    description: z.string().min(2, {
        message: "Descrição deve ter pelo menos 2 caractéres.",
      }).max(50, {
          message: "Descrição deve ter no máximo 50 caractéres.",
      }),
    expectedDelivery: z.string().max(50, {
          message: "Descrição deve ter no máximo 50 caractéres.",
      }),
    priority: z.string().max(50, {
            message: "Descrição deve ter no máximo 50 caractéres.",
        }),
    value: z.string().max(50, {
            message: "Valor deve ter no máximo 50 caractéres.",
        }),
    payDate: z.string().max(50, {
            message: "Valor deve ter no máximo 50 caractéres.",
        }),
  })

export default function CardNewTask(){
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            expectedDelivery: "",
            priority: "",
            value: "",
            payDate: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)

        try {
            
           const response = await fetch('/api/task', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(values), 
            });
            toast({
                title: "Task adicionada com sucesso",
            })
            
            form.reset();
        } catch (error: any) {
            toast({
                title: "Erro ao criar task",
                description: error.message,
              })
        }
        setIsLoading(false)

    }

    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Adicionar nova task</Button>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Adicionar nova task</DialogTitle>
                    <DialogDescription>
                        Cadastre as informações da tarefa.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col gap-5">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormLabel>Nome*</FormLabel>
                                                    <FormControl>
                                                        <Input disabled={isLoading} className="w-full" placeholder="Nome da tarefa" {...field} />
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
                                                        <FormLabel>Previsão de entrega</FormLabel>
                                                        <FormControl>
                                                            <Input disabled={isLoading} className="w-full" type="date" {...field} />
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
                                                        <FormLabel>Prioridade</FormLabel>
                                                        <FormControl>
                                                            <Select disabled={isLoading} onValueChange={field.onChange} defaultValue={field.value}>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Prioridade" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="light">Urgente</SelectItem>
                                                                    <SelectItem value="light">Alta</SelectItem>
                                                                    <SelectItem value="dark">Média</SelectItem>
                                                                    <SelectItem value="system">Baixa</SelectItem>
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
                                                    <FormLabel>Descrição</FormLabel>
                                                    <FormControl>
                                                        <Textarea disabled={isLoading} placeholder="Descrição da tarefa" {...field} />
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
                                                        <FormLabel>Valor</FormLabel>
                                                        <FormControl>
                                                            <Input disabled={isLoading} placeholder="R$ 1000" {...field} />
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
                                                        <FormLabel>Data de pagamento</FormLabel>
                                                        <FormControl>
                                                            <Input disabled={isLoading} type="date" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>

                                </div>

                        <DialogFooter className="flex justify-between">
                            <ButtonSubmit text="Adicionar" isLoading={isLoading} />
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}