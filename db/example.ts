import mongoose from "mongoose"
import { Contact } from "../types.ts"

const Schema = mongoose.Schema

const contactSchema = new Schema (
    {
        name: {type: String, required: true, unique: false},
        phoneNumber: {type: String, required: true, unique: true},
        country: {type: String, requiered: false, unique: false}
    },
    {timestamps: true}
)

export type ContactModelType = mongoose.Document & Omit<Contact, "id">
export const ContactModel = mongoose.model<ContactModelType>("Example", contactSchema)