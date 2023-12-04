//server.js
const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors"); //Add CORS middleware

const app = express();

const port = 3002;

app.use(bodyParser.json());
app.use(cors()); //Enable CORS

let todolistData = [];

app.get("/todolist/", (req, res) => {
  res.json(todolistData);
});

app.post("/todolist", (req, res) => {
  const receivedData = req.body;
  console.log("Received data:", receivedData);

  // Assign the counter value as the new id
  const newItem = {
    id: todolistData.length + 1, // Use the length of the array as the new ID
    userid: receivedData.userid,
    title: receivedData.title,
    completed: receivedData.completed,
  };

  //Process the data or save it to a database
  todolistData.push(newItem);

  res.status(200).send("Data received successfully");
});

//Update endpoint to toggle the completed status
app.patch("/todolist/:id", (req, res) => {
  const idToUpdate = parseInt(req.params.id);
  const { completed } = req.body;

  const itemToUpdate = todolistData.find((item) => item.id === idToUpdate);

  if (itemToUpdate) {
    //If the item is found, update its completed status
    itemToUpdate.completed = completed;
    res.status(200).send("Status toggled successfully");
  } else {
    //If the item is not found, send a 404 response
    res.status(404).send("Item not found");
  }
});

//Delete endpoint to remove an item with a specific ID
app.delete("/todolist/:id", (req, res) => {
  const idToDelete = parseInt(req.params.id);

  //Find the inddex of the item with the secified ID
  const indexToDelete = todolistData.findIndex(
    (item) => item.id === idToDelete
  );

  if (indexToDelete !== -1) {
    // If the item is found, remove it from the array
    todolistData.splice(indexToDelete, 1);
    res.status(200).send("Data deleted successfully");
  } else {
    //If the item is not found ,send a 404 response
    res.status(404).send("Item not found");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
