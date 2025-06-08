import { z } from "zod";

const createCustomer = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string()
})
const updateCustomer = z.object({
    name: z.string().optional(),
    phone: z.string().optional()
})

export const customerSchema = {
    createCustomer,
    updateCustomer
}