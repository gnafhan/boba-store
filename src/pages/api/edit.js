import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import isAdmin from "../../../middleware/isAdmin";

export default async function handler(req, res) {
  try {
    await isAdmin(req, res, async () => {
      if (req.method === "POST") {
        const { name, description, price, image, id } = req.body;
        const client = await clientPromise;
        const db = client.db("boba");
        const collection = db.collection("product");
        const result = await collection.updateOne(
          { _id: ObjectId(id) },
          {
            $set: {
              name: name,
              description: description,
              price: price,
              image: image,
            },
          }
        );
        res.status(200).send(result);
      } else {
        return res.status(403).json({ error: "forbidden" });
      }
    }, "post");
  } catch (error) {
    res.json(error);
  }
}
