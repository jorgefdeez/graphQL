const COLLECTION = "usersVideoGames"
import {getDb} from "../db/mongo"
import bcrypt from "bcryptjs"
import {ObjectId} from "mongodb"

export const creatUser = async(email:string, password:string) =>{
    const db =getDb()
    const contraEncriptada = await bcrypt.hash(password,10)

    const result =  await db.collection(COLLECTION).insertOne({
        email, 
        password : contraEncriptada
    })

    return result.insertedId.toString()
}

export const validateUser = async(email:string, password: string) =>{
    const db = getDb();
    const user = await db.collection(COLLECTION).findOne({email})
    if(!user){
        return null
    }

    const esLaMismaPassword = await bcrypt.compare(password, user.password)
    if(esLaMismaPassword!){
        return null
    }
    return user
}
export const findUserById = async (id: string) => {
    const db = getDb();
    return await db.collection(COLLECTION).findOne({_id: new ObjectId(id)})
}