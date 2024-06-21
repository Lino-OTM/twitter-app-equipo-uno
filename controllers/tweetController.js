const Tweet = require("../models/Tweet");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Display a listing of the resource.
async function index(req, res) {
  const tweets = await Tweet.find().limit(20).populate("likes").limit(20).populate({ path: "user", select: "firstname lastname username image" });
  res.json(tweets);
}

// Display the specified resource.
async function show(req, res) {
  const tweets = await Tweet.findById(req.params.id);
  res.json({ tweets });
}

// Store a newly created resource in storage.node
async function store(req, res) {
  await Tweet.create({ text: req.body.text, user: req.auth.sub });
  res.json({ msg: "se creo el tweet" });
}

// Update the specified resource in storage.
async function update(req, res) {
  const tweetToUpdate = await Tweet.findById(req.params.id);
  if (tweetToUpdate.likes.includes(req.auth.sub)) {
    tweetToUpdate.likes.pull(req.auth.sub);
    console.log("se quito el like");
  } else {
    tweetToUpdate.likes.push(req.auth.sub);
    console.log("puse like");
  }
  await tweetToUpdate.save();
  return res.json({ msg: "se actualizó el like" });
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  await Tweet.findByIdAndDelete(req.params.id);
  return res.json({ msg: "se eliminó el tweet" });
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
