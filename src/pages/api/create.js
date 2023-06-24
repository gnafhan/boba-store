import clientPromise from "@/lib/mongodb";

//create new collection
export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const {
        name,
        description,
        price,
        image
      } = req.body
      const client = await clientPromise
      const db = client.db('boba')
      const collection = db.collection('product')

      const result = await collection.insertOne({
        name: name,
        description: description,
        price: price,
        image: image
      })
      res.status(200).send(result)

    } else {
      res.status(400).send("Method not allowed")
    }
  } catch (error) {
    res.json(error)
  }
}