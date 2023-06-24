import clientPromise from "@/lib/mongodb";

//create new collection
export default async function handler(req, res) {
    try {
      if(req.method === "POST"){
       const {name, description, price, image} = req.body 
       const client = await clientPromise
       const db = client.db('boba')
       const collection = db.collection('product')
        console.log (name, description, price, image)
        //if no payload

          const result = await collection.insertOne({name: name, description: description, price: price, image: image})
          res.status(200).send(result)
        
      }else{
        res.status(400).send("Method not allowed")
      }

        // const client = await clientPromise
        // const db = client.db('boba')
        // const collection = db.collection('product')
        // const products = [
        //     {
        //       name: "Boba Tea",
        //       description: "A classic milk tea with chewy tapioca pearls.",
        //       price: 8000,
        //       image: "https://i.ibb.co/Xsmx4Kv/1.png"
        //     },
        //     {
        //       name: "Float Tea",
        //       description: "A refreshing tea with a layer of creamy foam on top.",
        //       price: 12000,
        //       image: "https://i.ibb.co/MSs80PY/2.png"
        //     },
        //     {
        //       name: "Banana Tea",
        //       description: "A fruity tea infused with banana flavor.",
        //       price: 15000,
        //       image: "https://i.ibb.co/9yq65bY/3.png"
        //     },
        //     {
        //       name: "Matcha Float Tea",
        //       description: "A creamy matcha tea with a layer of foam on top.",
        //       price: 10000,
        //       image: "https://i.ibb.co/kyHk1bC/4.png"
        //     },
        //     {
        //       name: "Taro Tea",
        //       description: "A unique tea with a nutty and sweet taro flavor.",
        //       price: 13000,
        //       image: "https://i.ibb.co/Ks6fqGj/5.png"
        //     },
        //     {
        //       name: "Bubble Gum Tea",
        //       description: "A fun and sweet tea with a bubble gum twist.",
        //       price: 18000,
        //       image: "https://i.ibb.co/9rHYT3L/6.png"
        //     },
        //     {
        //       name: "Matcha Tea",
        //       description: "A traditional Japanese tea made with high-quality matcha.",
        //       price: 15000,
        //       image: "https://i.ibb.co/59Sbj1F/7.png"
        //     },
        //     {
        //       name: "Matcha Strawberry Tea",
        //       description: "A sweet and creamy tea with a blend of matcha and strawberry.",
        //       price: 10000,
        //       image: "https://i.ibb.co/9s6W01Z/8.png"
        //     },
        //     {
        //       name: "Special Mango Tea",
        //       description: "A refreshing tea with a tropical twist of mango flavor.",
        //       price: 12000,
        //       image: "https://i.ibb.co/dktcbrM/9.png"
        //     },
        //     {
        //       name: "Peach Tea",
        //       description: "A fruity and refreshing tea with a peachy twist.",
        //       price: 20000,
        //       image: "https://i.ibb.co/tCXRN5R/10.png"
        //     }
        //   ];

        // const result = await collection.insertMany(products)
        // res.status(200).send(result)
        // //create new collection

    } catch (error) {
        res.json(error)
    }
}