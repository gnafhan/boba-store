import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { signIn } from "next-auth/react";
import isAdmin from "../../../../middleware/isAdmin";

export default async function handler(req, res) {
  try {
    if (req.headers.authorization != process.env.BEARER_AUTH) {
      return res.status(403).json({ error: "forbidden" });
    }
    if (req.method !== "POST") {
      return res.status(403).json({ error: "forbidden" });
    }

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    const client = await clientPromise;
    const db = client.db("boba");
    const usersCollection = db.collection("users");
    let existingEmailDoc = await usersCollection.findOne({ email });
    if (existingEmailDoc) {
      return res
        .status(400)
        .json({ error: "An account with that email already exists." });
    }
    // if username already exist
    let existingUsernameDoc = await usersCollection.findOne({ username });
    if (existingUsernameDoc) {
      return res
        .status(400)
        .json({ error: "An account with that username already exists." });
    }
    // if user does not exist, insert into db
    const role = "user"; // default
    const image = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
    await usersCollection.insertOne({
      username,
      email,
      password: hashedPassword,
      role,
      image
    });
    return res.status(201).json({ message: "User registered successfully." });
    //   },
    //   "post"
    // );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error registering user." });
  }
}
