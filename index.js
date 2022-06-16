const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zqquk.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const database = client.db('carMechanic');
        const servicesCollection = database.collection('services');

        // POST API
        app.post('/services', async (req, res) => {
            const service = {
                "name": "Replace Tire1",
                "price": 2000,
                "time": 2,
                "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. At similique dolor corrupti minus, soluta aut neque eligendi nobis, rerum commodi fuga! Quisquam ab nostrum saepe amet et. Aperiam laboriosam inventore veritatis eum tempora itaque, impedit explicabo debitis voluptates quasi non dolor unde minus. Libero suscipit nemo expedita repudiandae omnis incidunt!",
                "img": "https://i.ibb.co/JcJ4zwt/Background1.png"
            }

            const result = await servicesCollection.insertOne(service);
            console.log(result);
        })
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('hellow world');
})

app.listen(port, () => {
    console.log('listening from port,', port);
})