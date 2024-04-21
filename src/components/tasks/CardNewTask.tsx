"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ButtonLoading } from "../ui/button-loading"
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
  })

export default function CardNewTask(){

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
      }

    const [isLoading, setIsLoading] = useState(false)
    return (
        <Card className="w-full shadow-lg">
            <CardHeader>
                <CardTitle>Nova tarefa</CardTitle>
                <CardDescription>Adicione uma nova tarefa.</CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <CardContent>
                        
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Nome</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nome da tarefa" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Descrição</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Descrição da tarefa" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                            </div>

                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="destructive" type="button">Cancel</Button>
                        <ButtonSubmit text="Adicionar" isLoading={isLoading} />
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}