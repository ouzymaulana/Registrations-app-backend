const db = require("./connection");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const Registrations = require("./router/registrations");

(async () => {
  try {
    await db.authenticate();
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
})();
app.use(express.json());

app.use(express.static("public"));

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", Registrations);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
