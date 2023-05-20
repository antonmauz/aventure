const {MongoClient, ServerApiVersion} = require("mongodb")

console.log(process.env.DATABASE_PASSWORD ?? "seba123")

const uri = `mongodb+srv://aventure:${process.env.DATABASE_PASSWORD ?? "seba123"}@aventure.kxalqsz.mongodb.net/?retryWrites=true&w=majority`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const databaseClient = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const run = async () => {
    // Connect the client to the server	(optional starting in v4.7)
    await databaseClient.connect();
    // Send a ping to confirm a successful connection
    await databaseClient.db("admin").command({ping: 1});
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
}

run().catch(console.dir);
