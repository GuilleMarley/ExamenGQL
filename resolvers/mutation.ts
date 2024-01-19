import { ContactModel, ContactModelType} from "../db/example.ts"
import { GraphQLError } from "graphql"
import { NINJA_API } from "../main.ts"

export const Mutation = {
    addContact:async(_: unknown, args: {name: string, phoneNumber: string}):Promise<ContactModelType> =>{
        try{
            const {name, phoneNumber} = args
            const contactExists = await ContactModel.findOne({phoneNumber}).exec()
            if(contactExists){
                throw new GraphQLError("Already exists")
            }
            const urlPhone = "https://api.api-ninjas.com/v1/validatephone?number="+phoneNumber
            const response = await fetch(urlPhone, {
                headers: {
                    'X-Api-Key': NINJA_API as string
                }
            })
            const json = await response.json()
            const validPhone = json.is_valid
            if(!validPhone){
                throw new GraphQLError("Not valid phone number")
            }
            const country = json.country

            const newContact = new ContactModel({name, phoneNumber, country})
            await newContact.save()

            return newContact
        }catch(e){
            throw new GraphQLError(e)
        }

    },
    deleteContact:async(_:unknown, args:{id: string}):Promise<ContactModelType> => {
        try{
            const {id} = args
            const contactExists = await ContactModel.findOneAndDelete({id}).exec()
            if(!contactExists){
                throw new GraphQLError(Error)
            }
            return contactExists
        }catch(e){
            throw new GraphQLError(e)
        }
    }//,
    //updateContact:async(_:unknown, args:{})
}