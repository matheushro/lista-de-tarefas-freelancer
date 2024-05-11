import { z } from "zod";

export const upsertTodoSchema = z.object({
    id: z.string().optional(),
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
      }).optional().nullable(),
    priority: z.string().max(50, {
            message: "Descrição deve ter no máximo 50 caractéres.",
        }).optional(),
    value: z.string().max(50, {
            message: "Valor deve ter no máximo 50 caractéres.",
        }).optional(),
    payDate: z.string().max(50, {
            message: "Valor deve ter no máximo 50 caractéres.",
        }).optional().nullable(),
    doneAt: z.string().max(50, {
            message: "Valor deve ter no máximo 50 caractéres.",
        }).optional().nullable(),
})


export const deleteTodoSchema = z.object({
    id: z.string(),
  })