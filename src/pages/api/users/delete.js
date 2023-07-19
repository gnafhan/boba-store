import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
// import isAdmin from "../../../middleware/isAdmin";

//create new collection
export default async function handler(req, res) {
  try {
    // await isAdmin(req, res, async () => {
      if (req.method === "GET") {
        const { id } = req.body
          const client = await clientPromise
          const db = client.db('boba')
          const collection = db.collection('users')
        //delete one 
        const result = await collection.deleteOne({"_id": ObjectId("64b7c170c008a39fe5927a4f")})
    
        //   const result = await collection.deleteOne({})
          res.status(200).send(result)
        
    } else {
      return res.status(403).json({ error: 'forbidden' });
    }
    // }, "post")
  } catch (error) {
    res.json(error)
  }
}