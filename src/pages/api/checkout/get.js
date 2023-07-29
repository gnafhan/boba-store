import clientPromise from "@/lib/mongodb";
// import isAdmin from "../../../middleware/isAdmin";
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";
import isAdmin from "../../../../middleware/isAdmin";

//create new collection
export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      return res.status(403).json({ error: 'forbidden' });
    }

    await isAdmin(req, res, async () => {
    const { id } = req.body;
    const client = await clientPromise;
    const db = client.db("boba");
    const collection = db.collection("product");

    //get db query
    const result = await collection.findOne({ _id: ObjectId(id) });
    res.status(200).send(result);
    }, "post");
  } catch (error) {
    res.json(error);
  }
}
