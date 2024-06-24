const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

async function getToken(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.json({ msg: "verifque credenciales 1..." });

    const match = await bcrypt.compare(req.body.password, user.password); //devuelve true or false
    if (!match) return res.json({ msg: "verifique credenciales 2..." });

    const token = jwt.sign({ sub: user.id, username: user.username }, process.env.SECRET_JWT);

    res.json({ token, user });
  } catch (error) {
    res.json({ msg: "Error en el token", error });
  }
}

module.exports = { getToken };
