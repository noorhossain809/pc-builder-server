require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId, ObjectID } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://moonTech:8IWtWlDXX5RuSQpV@cluster0.t0fgxph.mongodb.net/?retryWrites=true&w=majority";

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q66zrl2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db("moontech");
    const productCollection = db.collection("product");
    const cpuCollection = db.collection("cpu");
    const motherboardCollection = db.collection("motherboard");
    const monitorCollection = db.collection("monitor");
    const ramCollection = db.collection("ram");
    const storageCollection = db.collection("storage");
    const powerSupplyCollection = db.collection("powerSupply");

    app.get("/products", async (req, res) => {
      const cursor = productCollection.find({});
      const product = await cursor.toArray();

      res.send({ status: true, data: product });
    });
    
     app.get("/product/:id", async (req, res) => {
      const id = req.params.id;

      const result = await productCollection.findOne({ _id: ObjectId(id) });
      res.send({ status: true, data: result });
    });

    app.post("/product", async (req, res) => {
      const product = req.body;

      const result = await productCollection.insertOne(product);

      res.send(result);
    });
    
    app.put("/product/:id", async (req, res) => {
      const id = req.body
      console.log('req body', id)
      //const filter = {_id: ObjectId(id)}
      //console.log(filter)
    })

    app.delete("/product/:id", async (req, res) => {
      const id = req.params.id;

      const result = await productCollection.deleteOne({ _id: ObjectId(id) });
      res.send(result);
    })
    app.get("/processor", async (req, res) => {
      const cursor = cpuCollection.find({});
      const product = await cursor.toArray();

      res.send({ status: true, data: product });
    })
    app.get("/motherboard", async (req, res) => {
      const cursor = motherboardCollection.find({});
      const product = await cursor.toArray();

      res.send({ status: true, data: product });
    })
    app.get("/monitor", async (req, res) => {
      const cursor = monitorCollection.find({});
      const product = await cursor.toArray();

      res.send({ status: true, data: product });
    })
    app.get("/storage", async (req, res) => {
      const cursor = storageCollection.find({});
      const product = await cursor.toArray();

      res.send({ status: true, data: product });
    })
    app.get("/ram", async (req, res) => {
      const cursor = ramCollection.find({});
      const product = await cursor.toArray();

      res.send({ status: true, data: product });
    })
    app.get("/powerSupply", async (req, res) => {
      const cursor = powerSupplyCollection.find({});
      const product = await cursor.toArray();

      res.send({ status: true, data: product });
    });
    
  } finally {
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
