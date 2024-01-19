import { GraphQLError } from "graphql"
import { NINJA_API } from "../main.ts"
import {ContactModelType, ContactModel} from "../db/example.ts"
import { Contact } from "../types.ts";

export const Query = {
    getContact: async (_:unknown, args:{ id: string}): Promise<ContactModelType> => {
        try {
            const { id } = args;

            const contactExists = ContactModel.findOne({id}).exec()
            console.log(await contactExists)
            if(!contactExists){
                throw new GraphQLError(Error)
            }
            console.log(await contactExists.phoneNumber)
            const phoneNumber = await contactExists.phoneNumber
            const urlPhone = "https://api.api-ninjas.com/v1/validatephone?number="+phoneNumber
            const response = await fetch(urlPhone, {
                headers: {
                    'X-Api-Key': NINJA_API as string
                }
            })
            const json = await response.json()
            const country = json.country

            console.info(country)
            const urlCapital = `https://api.api-ninjas.com/v1/country?name=${country}`
            const responseCapital = await fetch(urlCapital, {
                headers: {
                    'X-Api-Key': NINJA_API as string
                }
            })
            console.log(urlCapital)

            const jsonCapital = await responseCapital.json()
            const capital = jsonCapital[0].capital

            const urlCapitalTime = "https://api.api-ninjas.com/v1/worldtime?city="+capital.toString()
            
            console.log(capital)
            console.log(urlCapitalTime)	
            const responseCapitalTime = await fetch(urlCapitalTime, {
                headers: {
                    'X-Api-Key': NINJA_API as string
                }
            })

            const jsonCapitalTime = await responseCapitalTime.json()
            const datetime = jsonCapitalTime.datetime
            console.log(datetime)

            const contact = new ContactModel({id,name,phoneNumber:contactExists.phoneNumber,country:contactExists.country,capital,datetime})
            return contact
        }catch(e){
            throw new GraphQLError(e)
        }
    },
    getContacts: async(_:unknown): Promise<Array<ContactModelType>> => {
        try{
            const contacts = ContactModel.find().exec()
            if(!contacts){
                throw new GraphQLError(Error)
            }
            return contacts
        }catch(e){
            throw new GraphQLError(e)
        }
    }
}