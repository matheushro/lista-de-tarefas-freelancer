'use client'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"

import { signIn } from 'next-auth/react'
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"

export function AuthForm(){
    const form = useForm()

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = form.handleSubmit((async (data)  => {
      setIsLoading(true)
      try {
        await signIn('email', {email: data.email, redirect: false})
        toast({
          title: 'Magic Link Sent',
          description: 'Check yout e-mail'
        })
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Magic Link Sent',
          description: 'Check yout e-mail'
        })
      }
      setIsLoading(false)
    }))
    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign in with a magic link</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your email address and we'll send you a magic link to sign in.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input disabled={isLoading} id="email" placeholder="Enter your email" required type="email" {...form.register('email')} />
          </div>
          <Button className="w-full" type="submit">
            Send magic link
          </Button>
        </form>
      </div>
    </div>
    )
}