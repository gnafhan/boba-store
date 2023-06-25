import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    try {
        if (req.method === "POST") {
        const {
            name,
            description,
            price,
            image,
            id
        } = req.body
        console.log(
            name,
            description,
            price,
            image,
            id
        )
        const client = await clientPromise
        const db = client.db('boba')
        const collection = db.collection('product')
    
        
        //update one 
        const result = await collection.updateOne({_id: ObjectId(id)}, {$set: {name: name, description: description, price: price, image: image}})
        res.status(200).send(result)
    
        } else {
        res.status(400).send("Method not allowed")
        }
    } catch (error) {
        res.json(error)
    }
}