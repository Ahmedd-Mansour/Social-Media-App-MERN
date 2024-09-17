require("dotenv").config();
const bodyParser = require ('body-parser')
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post")

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());


app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use('/user', userRoutes);
app.use('/post', postRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "connection to database established, listening on port",
        process.env.PORT
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
