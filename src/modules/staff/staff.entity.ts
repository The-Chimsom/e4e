import {z} from 'zod'
import zodToJsonSchema from 'zod-to-json-schema';

export const StaffIdentifier = z.enum(["NURSE", "CLERK"]);

export const staffEntity = z.object({
    name: z.string().trim(),
    email: z.string().trim(),
    role: StaffIdentifier
})

export type StaffEntity = z.infer<typeof staffEntity>

export const clerkEntitySchema = zodToJsonSchema(staffEntity)

export type StaffIdentifier = z.infer<typeof StaffIdentifier>

export const vitalDetails = z.object({
    height: z.string().trim(),
    weight: z.string().trim(),
    temperature: z.string().trim(),
    bloodPressure: z.string().trim(),
    bodyMassIndex: z.string().trim(),
    appointmentId: z.string().trim()
})

export type VitalDetails = z.infer<typeof vitalDetails>

export const VitalDetailsSchema = zodToJsonSchema(vitalDetails)

