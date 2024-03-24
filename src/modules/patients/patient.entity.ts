import {z} from 'zod'
import zodToJsonSchema from 'zod-to-json-schema';


export const patientEntity = z.object({
    name: z.string().trim(),
    email: z.string().email(),
    age: z.string().trim(),
    gender: z.string().trim(),
    appointmentDate: z.string()
})

export type PatientEntity = z.infer<typeof patientEntity>

export const PatientEntitySchema = zodToJsonSchema(patientEntity)

