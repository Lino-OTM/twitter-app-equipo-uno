const User = require("../models/User");

// Display a listing of the resource.
async function index(req, res) {
  const users = await User.find().limit(10).populate("tweets").populate("likes");

  res.json(users);
}
// Display the specified resource.
async function show(req, res) {
  const user = await User.findOne({ username: req.params.username })
    .populate("tweets")
    .select("-password");
  res.json(user);
}

// Store a newly created resource in storage.
async function store(req, res) {
  const { firstname, lastname, email, username, password } = req.body;
  await User.create({ firstname, lastname, email, username, password });
  res.json({ msg: "se ha creado el usuario" });
}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
