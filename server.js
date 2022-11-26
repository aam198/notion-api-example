const express = require("express");
// Retrieve Module
const  moduleToFetch = require("./index.js");
// import getDatabases() from index.js
const getDatabase  = moduleToFetch.getDatabase;

const port = 8000;
const app = express();

// To connect to frontend and accessing by /users route.
app.use(express.static("public"));

app.get("/users", async (req, res) => {
  // Callback to invoke getDatabase function
  const users = await getDatabase();
  res.json(users);
});


app.listen(port, console.log(`Server started on ${port}`));
