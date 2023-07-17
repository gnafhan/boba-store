import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { signIn } from "next-auth/react";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end(); // Method Not Allowed
    }
    
    const { username, email, password } = req.body;
    console.log(username, email, password)
  
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Save the user to the database
    const client = await clientPromise
    const db = client.db('boba')
    const usersCollection = db.collection("users");
    
    try {
        // if email already exist
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
      await usersCollection.insertOne({
        username,
        email,
        password: hashedPassword,
        role,
      });
      return res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
    console.log(error);
      return res.status(500).json({ error: "Error registering user." });
    }
  }