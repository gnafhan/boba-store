import clientPromise from "@/lib/mongodb";

//create new collection
export default async function handler(req, res) {
    try {
        const client = await clientPromise
        const db = client.db('boba')
        const collection = db.collection('product')
        
        const deletedId = "644e976163462084164c5878"

        const result = await collection.deleteOne({_id: ObjectId(deletedId)})


        res.status(200).send(result)
        //create new collection

    } catch (error) {
        res.json(error)
    }
}