import { z } from "zod";

const createBike = z.object({
    brand: z.string(),
    model: z.string(),
    year: z.number(),
    customerId: z.string()
})

export const bike_validation_schema = {
    createBike
}