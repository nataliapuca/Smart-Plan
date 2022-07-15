import UserMessage from "../models/userMessage.js";
import express from "express";
import mongoose from "mongoose";

const router = express.Router();

export const getUsers = async (req, res) => {
  try {
    const userMessages = await UserMessage.find();
    res.status(200).json(userMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new UserMessage(user);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, surename, job, age, town, mail } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no user with given id");

  const updatedUser = { name, surename, job, age, town, mail, _id: id };

  await UserMessage.findByIdAndUpdate(id, updatedUser, {
    new: true,
  });

  res.json(updatedUser);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no user with given id");

  await UserMessage.findByIdAndRemove(id);

  res.json({ message: "user deleted sucesfully" });
};

export default router;
