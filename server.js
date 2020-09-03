const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connecct mongoDB
connectDB();

// init middleware
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

// Defining our routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

app.get("/", (req, res) => {
  res.json({ msg: "Hello World" });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
