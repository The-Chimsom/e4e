import {z} from 'zod'

export const AppointmentStatus = z.enum(['SEEN', 'NOT-SEEN'])
 
export const appointmentDetails= z.object({
    name: z.string().trim(),
    userId: z.string(),
    appointmentDate: z.date(),
})

export type AppointmentDetails = z.infer<typeof appointmentDetails>