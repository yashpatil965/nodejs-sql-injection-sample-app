const express = require("express");
const { Client } = require("pg");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To handle JSON input

const client = new Client({
  host: "your-host",
  database: "your-database",
  username: "your-username",
  password: "your-password",
  port: "your-port",
});
client.connect();

app.post("/search", (req, res) => {
  const userInput = req.body.userInput;
  const query = "SELECT * FROM users WHERE name = '" + userInput + "';";
  client.query(query, (err, result) => {
    if (err) throw err;
    res.send(result.rows);
  });
});

app.post("/create", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).send("Name is required");
    return;
  }

  const query = "INSERT INTO users (name) VALUES ($1) RETURNING *;";
  client.query(query, [name], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send(result.rows[0]); // Respond with the created user record
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
