import express from "express";
import Expense from "../models/Expense.js";

const router = express.Router();

// Add expense
router.post("/", async (req, res) => {
  try {
    const { userId, title, amount, category, date } =
      req.body;

    // Validation
    if (!userId || !title || !amount || !date) {
      return res
        .status(400)
        .json({ msg: "All fields required" });
    }

    const expense = new Expense({
      userId,
      title,
      amount,
      category,
      date,
    });

    await expense.save();

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user expenses
router.get("/:userId", async (req, res) => {
  try {
    const expenses = await Expense.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete expense
router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(
      req.params.id
    );

    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
