import {z} from 'zod'

export const patientEntity = z.object({
    name: z.string().trim(),
    email: z.string().email(),
    age: z.string().trim(),
    gender: z.string().trim(),
    appointmentDate: z.string()
})

export type PatientEntity = z.infer<typeof patientEntity>

