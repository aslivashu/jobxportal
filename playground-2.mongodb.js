// MongoDB Playground — Examples for MongoDB for VS Code
// IMPORTANT: Do NOT save credentials in this file or commit them.
// Connect via the MongoDB extension (Command Palette -> "MongoDB: Connect with Connection String")
// or use the Connections view to add a connection (the extension stores credentials securely).

/*
  1) Using the connected data source (recommended)
     - Connect with the extension first, then run the commands below.
     - When run against a connected data source, the playground exposes a `db` global.
*/

// --- Connected data source (mongosh-style)
show dbs
use("jobxportal") // switch to your DB name (optional)

// list a few documents from common collections
db.getCollection("users").find({}).limit(5).toArray()
db.getCollection("jobs").find({ isActive: true }).limit(10).toArray()
db.getCollection("applications").countDocuments()


/*
  2) Using the Node.js MongoDB driver (explicit connection string)
     - If you prefer to use the connection string directly here, paste it into `uri` temporarily
       and REMOVE it after use. Do NOT commit connection strings containing credentials.
*/

const { MongoClient } = require("mongodb");

// const uri = "<YOUR_CONNECTION_STRING>"; // ephemeral only — DO NOT COMMIT
// Example: mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
const uri = process.env.MONGODB_PLAYGROUND_URI || "";
if (uri) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db("jobxportal"); // change to your DB name
    const users = db.collection("users");
    const docs = await users.find({}).limit(5).toArray();
    console.log(docs);
  } finally {
    await client.close();
  }
} else {
  // If no uri provided, this block is a no-op when run connected via the extension.
  // Use the connected-data-source examples above instead.
}

// How to run:
// 1) Install the extension: 'MongoDB for VS Code'.
// 2) Open Command Palette -> 'MongoDB: Connect' -> 'Connect with Connection String', paste your URI.
// 3) Create a new Playground (or open this file), choose the connection, then click the Play icon.
