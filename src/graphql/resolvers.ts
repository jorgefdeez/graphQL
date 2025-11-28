import { IResolvers } from "@graphql-tools/utils";
import { getDb } from "../db/mongo";
import { ObjectId } from "mongodb";
import { creatUser } from "../collection/users";
import { signToken } from "../auth";
import { validateUser } from "../collection/users";

const COLLECTION = "VideoGames";

export const resolvers: IResolvers = {
  Query: {
    getVideoGames: async () => {
      const db = getDb();
      return db.collection(COLLECTION).find().toArray();
    },
    getVideoGame: async (_, { _id }: { _id: string }) => {
      const db = getDb();
      return db.collection(COLLECTION).findOne({ _id: new ObjectId(_id) });
    },

    me : async(_,__, {user})=>{
      if(!user) return null
      return {
        id: user._id.toString(),
        email: user.email
      }
    }
  },

  Mutation: {
    addVideoGame: async (_,{ name, platform, releaseYear }: { name: string; platform: string; releaseYear: number }) => {
        const db = getDb();
        const result = await db.collection(COLLECTION).insertOne({
          name,
          platform,
          releaseYear,
        });

        return {
          _id: result.insertedId,
          name,
          platform, 
          releaseYear,
        };

    },

    register: async(_, {email, password}: {email: string, password: string}) => {
      const userId = await creatUser(email, password)
      return signToken(userId)
    }, 

    login: async(_, {email, password}: {email: string, password: string}) => {
      const user = await validateUser(email, password)
      if(!user){
        throw new Error("Las credenciales no son correctas")
      }
      return signToken(user._id.toString())
    } 
  },
};
