import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

//create new collection
export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
        const { id } = req.body
          const client = await clientPromise
          const db = client.db('boba')
          const collection = db.collection('product')
        //delete one 
        const result = await collection.deleteOne({"_id": ObjectId(id)})
    
        //   const result = await collection.deleteOne({})
          res.status(200).send(result)
        
    } else {
        res.status(400).send("Method not allowed")
    }
  } catch (error) {
    res.json(error)
  }
}