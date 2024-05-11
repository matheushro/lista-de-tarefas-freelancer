'use server'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { z } from 'zod'
import { deleteTodoSchema, upsertTodoSchema } from './schema'

export async function getUserTodos() {
  const session = await auth()

  const todos = await prisma.todo.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return todos
}

export async function upsertTodo(input: z.infer<typeof upsertTodoSchema>) {
  const session = await auth()


  if (!session?.user?.id) {
    return {
      error: 'Not authorized',
      data: null,
    }
  }

  if (input.id) {
    const todo = await prisma.todo.findUnique({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      select: {
        id: true,
      },
    })

    if (!todo) {
      return {
        error: 'Not found',
        data: null,
      }
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      data: {
        name: input.name,
        description: input.description,
        expectedDelivery: input.expectedDelivery ? new Date(input.expectedDelivery).toISOString() : null,
        priority: input.priority,
        value: input.value,
        payDate: input.payDate ? new Date(input.payDate).toISOString() : null,
        doneAt: input.doneAt ? new Date(input.doneAt).toISOString() : null,
      },
    })

    return {
      error: null,
      data: updatedTodo,
    }
  }

  if (!input.name) {
    return {
      error: 'Name is required',
      data: null,
    }
  }

  const todo = await prisma.todo.create({
    data: {
      name: input.name,
      description: input.description,
      expectedDelivery: input.expectedDelivery ? new Date(input.expectedDelivery).toISOString() : null,
      priority: input.priority,
      value: input.value,
      payDate: input.payDate ? new Date(input.payDate).toISOString() : null,
      doneAt: input.doneAt ? new Date(input.doneAt).toISOString() : null,
      userId: session?.user?.id,
    },
  })

  return {
    error: null,
    data: todo,
  }
}

export async function deleteTodo(input: z.infer<typeof deleteTodoSchema>) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Not authorized',
      data: null,
    }
  }

  const todo = await prisma.todo.findUnique({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
    select: {
      id: true,
    },
  })

  if (!todo) {
    return {
      error: 'Not found',
      data: null,
    }
  }

  await prisma.todo.delete({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
  })

  return {
    error: null,
    data: 'Todo deleted successfully',
  }
}