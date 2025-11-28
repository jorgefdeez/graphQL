import jwt from "jsonwebtoken"
import { getDb } from './db/mongo';
import dotenv from "dotenv"
import { ObjectId } from 'mongodb';


dotenv.config()
export type TokenPayload ={
    userId: string;
}

const SECRET = process.env.SECRET   

export const signToken = (userId : string ) =>{
    jwt.sign({userId},SECRET!,{expiresIn: "1h"})
}

export const verifyToken = (token:string):TokenPayload | null => {
    try{
        return jwt.verify(token, SECRET!) as TokenPayload
    }catch{
        return null
    }
}

export const getUserFromToken = async (token: string) => {
    const payload = verifyToken(token);
    if(!payload) return null;
    const db = getDb();
    return await db.collection("usersVideoGames").findOne({
        _id: new ObjectId(payload.userId)
    })
}