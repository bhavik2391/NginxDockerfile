const express = require("express");
const mysql = require("mysql2");

const app = express();

// Connect using container name as hostname
const db = mysql.createConnection({
  host: "mysql-container",
  user: "root",
  password: "root123",
  database: "testdb"
});

db.connect(err => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL!");
  }
});

app.get("/", (req, res) => {
  res.send("🚀 Node + MySQL running inside Docker!");
});

app.listen(3000, () => console.log("Server running on port 3000"));
