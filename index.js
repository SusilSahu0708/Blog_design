const express = require("express");
const app = express();
const port = 8800;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));

app.listen(port, () => {
  console.log("Express server started and listening on port ", port);
});

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let posts = [
  {
    id: uuidv4(),
    name: "Sashikant",
    content: "Believe in God",
  },
  {
    id: uuidv4(),
    name: "Raj Kishore",
    content: "Stay Blessed",
  },
  {
    id: uuidv4(),
    name: "Kartik",
    content: "Have Faith in God",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("newpost.ejs");
});

app.post("/posts", (req, res) => {
  let { name, content } = req.body;
  let id = uuidv4();
  // console.log(req.body);
  posts.push({ id, name, content });
  // console.log(posts);
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("detail.ejs", { post });
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  let newContent = req.body.content;
  post.content = newContent;
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => {
    return id != p.id;
  });
  res.redirect("/posts");
});
