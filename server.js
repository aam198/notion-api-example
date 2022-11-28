const { a } = require("aws-amplify");
const express = require("express");
// Retrieve Module
const  moduleToFetch = require("./index.js");
// import getDatabases() from index.js
const getDatabase  = moduleToFetch.getDatabase;
// import newEntryToDatabase()
const newEntryToDatabase = moduleToFetch.newEntryToDatabase;

const port = 8000;
const app = express();

// To connect to frontend and accessing by /users route.
app.use(express.static("public"));

// middleware to send data
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/users", async (req, res) => {
  // Callback to invoke getDatabase function
  const users = await getDatabase();
  res.json(users);
});

app.post("/submit-form", async (req, res) => {
  // Callback to invoke newEntryToDatabase()
  // to get the request from frontend filled-in form
  const name = req.body.name;
  const address = req.body.address;
  // invoke with the 2 arguments 
  await newEntryToDatabase(name, address);
  // redirect to our base route
  res.redirect("/");
  // then end the request
  res.end();
});


app.listen(port, console.log(`Server started on ${port}`));
