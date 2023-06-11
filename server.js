const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());

const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const doctorsRoute = require("./routes/doctorsRoute");
const path = require("path");

app.use(express.static(path.join(__dirname, "client/build")));

// Rest API
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
});

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorsRoute);
const port = process.env.PORT || 5000;

// if (process.env.NODE_ENV === "production") {
//   app.use("/", express.static("client/build"));
// }

app.listen(port, () => console.log(`Node server started at port ${port}`));
