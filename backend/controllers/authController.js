import User, { findOne } from "./models/User.js";
import { sign } from "jsonwebtoken";

const JWT_SECRET = "your_jwt_secret_key";

export async function signup(req, res) {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    const token = sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user: { id: user._id, username, email } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });
    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });
    const token = sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user: { id: user._id, username: user.username, email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
