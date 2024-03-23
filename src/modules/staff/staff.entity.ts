import {z} from 'zod'

export const StaffIdentifier = z.enum(["NURSE", "CLERK"]);

export const staffEntity = z.object({
    name: z.string().trim(),
    email: z.string().trim(),
    role: StaffIdentifier
})

export type StaffEntity = z.infer<typeof staffEntity>

export type StaffIdentifier = z.infer<typeof StaffIdentifier>

export const vitalDetails = z.object({
    height: z.string().trim(),
    weight: z.string().trim(),
    temperature: z.string().trim(),
    userId: z.string().trim()
})

export type VitalDetails = z.infer<typeof vitalDetails>

