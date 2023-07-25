import clientPromise from "@/lib/mongodb";
// import isAdmin from "../../../middleware/isAdmin";
// import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  try {
    // await isAdmin(req, res, async () => {
    // const {email, products} = req.body;
    // Dummy Email
    const email = "user@example.com";

    // Dummy Products
    const products = [
      {
        nama: "Produk A",
        jumlah: 2,
        harga: 10000,
        totalHarga: 20000,
      },
      {
        nama: "Produk D",
        jumlah: 1,
        harga: 17000,
        totalHarga: 15000,
      },
      {
        nama: "Produk B",
        jumlah: 4,
        harga: 5000,
        totalHarga: 15000,
      },
    ];

    if (!email) {
      return res.status(400).json({ error: "email is required." });
    }
    const client = await clientPromise;
    const db = client.db("boba");
    const collection = db.collection("cart");

    //if exist cart
    const existingCart = await collection.findOne({ email });

    if (existingCart) {
      await collection.updateOne(
        { email },
        {
          $set: {
            products: products,
          },
        }
      );
    } else {
      await collection.insertOne({
        email,
        products,
      });
    }
    res.status(200).send(result);
    //create new collection
    // });
  } catch (error) {
    res.json(error);
  }
}
