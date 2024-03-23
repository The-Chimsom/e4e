import { ObjectId } from 'mongodb'
import {z} from 'zod'

export const AppointmentStatus = z.enum(['SEEN', 'NOT-SEEN'])
 
export const appointmentDetails= z.object({
    name: z.string().trim(),
    userId: z.instanceof(ObjectId),
    appointmentDate: z.date(),
})

export type AppointmentDetails = z.infer<typeof appointmentDetails>