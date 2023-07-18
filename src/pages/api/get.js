import clientPromise from "@/lib/mongodb";
import isAdmin from "../../../middleware/isAdmin";
import { getSession } from "next-auth/react";

//create new collection
export default async function handler(req, res) {



 
    
  try { 
    await isAdmin(req, res, async () => {
      const client = await clientPromise;
      const db = client.db("boba");
      const collection = db.collection("product");

      //get db query
      const result = await collection.find({}).toArray();
      res.status(200).send(result);
      //create new collection
    });
  } catch (error) {
    res.json(error);
  }
}
