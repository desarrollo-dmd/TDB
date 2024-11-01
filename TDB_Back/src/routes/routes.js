const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const userInstance = new User();

router.get("/", (req, res) => {
  res.status(200).send("Conexion exitosa");
});

router.post("/register", async (req, res) => {
  const { user, password, role } = req.body;

  try {
    const result = await userInstance.register(user, password, role);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  const { user, password } = req.body;
  try {
    const result = await userInstance.login(user, password);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/deleteUser", async (req, res) => {
  const { user } = req.body;
  try {
    const result = await userInstance.delete(user);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
