import clientPromise from "@/lib/mongodb";
// import isAdmin from "../../../middleware/isAdmin";
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";

//create new collection
export default async function handler(req, res) {
  try {
    // await isAdmin(req, res, async () => {
    // const { id } = req.body;
    const id = "644ea228106a46b07092a40d"
    const client = await clientPromise;
    const db = client.db("boba");
    const collection = db.collection("product");

    //get db query
    const result = await collection.findOne({ _id: ObjectId(id) });
    res.status(200).send(result);
    // });
  } catch (error) {
    res.json(error);
  }
}
