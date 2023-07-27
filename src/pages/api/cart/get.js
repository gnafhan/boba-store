import clientPromise from "@/lib/mongodb";
import { getSession } from "next-auth/react";
import isAdmin from "../../../../middleware/isAdmin";

//create new collection
export default async function handler(req, res) {



 
    
  try { 
    await isAdmin(req, res, async () => {
        // const email = "user@example.com";

        const { email } = req.body;
      const client = await clientPromise;
      const db = client.db("boba");
      const collection = db.collection("cart");

      //get db query
      const result = await collection.findOne({email})
      res.status(200).send(result);
      //create new collection
    }, "post");
  } catch (error) {
    res.json(error);
  }
}
