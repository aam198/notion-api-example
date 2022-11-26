import express from "express";
// Retrieve Module
import  moduleToFetch from "./index.js";
// Connect Get the function
const getDatabase = moduleToFetch.getDatabase;

const port = 8000;
const app = express();

// To connect to frontend and by accessing /users route.
app.use(express.static("public"));

app.get("/users", async(req, res) => {
  // Callback to invoke getDatabase function
  const users = await getDatabase();
  res.json(users);
});


app.listen(port, console.log(`Server started on ${port}`));
