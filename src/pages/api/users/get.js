import clientPromise from "@/lib/mongodb";
import { getSession } from "next-auth/react";
import isAdmin from "../../../../middleware/isAdmin";

//create new collection
export default async function handler(req, res) {



 
    
  try { 
    await isAdmin(req, res, async () => {
      const client = await clientPromise;
      const db = client.db("boba");
      const collection = db.collection("users");

      //get db query
      const result = await collection.find({}, {projection:{_id: 0, password:0}}).toArray();
      res.status(200).send(result);
      //create new collection
    });
  } catch (error) {
    res.json(error);
  }
}
