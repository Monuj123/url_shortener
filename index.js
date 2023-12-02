const express = require("express");
const path = require("path");
const URL = require("./models/url");
const urlRoute = require("./router/url");
const staticRoute = require("./router/staticRouter");
const { default: mongoose } = require("mongoose");
const app = express();
var useragent = require("express-useragent");
const User = require("./models/user.test");

const PORT = 3001;

const dbURI =
  "mongodb+srv://Gogo_1:test123@cluster1.xhq9bob.mongodb.net/shortURL?retryWrites=true&w=majority";
app.use(useragent.express());

app.set("view engine", "ejs"); //our view engine is ejs which is used for server side rendering
app.set("views", path.resolve("./views")); //our ejs files are in views folder

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/url", urlRoute);
app.get("/", staticRoute);
// app.get("/createuser", async function (req, res, next) {
//   const { name } = req.query;
//   const newUser = new User({ name });
//   await newUser.save();
//   return res.json(newUser);
// });

app.get("/:shortId", async (req, res) => {
  // console.log(req.useragent.source);
  const shortId = req.params.shortId;
  // console.log(shortId);
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!entry) return res.send("<h2>Invalid Id </h2>");
  res.redirect(entry.redirectURL);
});

app.use("/url", urlRoute);

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Server started at PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
