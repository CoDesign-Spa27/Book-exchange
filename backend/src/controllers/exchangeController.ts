import { Request, Response } from "express";
import Exchange from "../models/Exchange";
import z from "zod";
const createExchangeRequestSchema = z.object({
  toUser: z.string(),
  bookOffered: z.string(),
  bookRequested: z.string(),
});
export const createExchangeRequest = async (req: Request, res: Response) => {
  try {
    const exchangeData = createExchangeRequestSchema.parse(req.body);

    const exchangeRequest = new Exchange({
      ...exchangeData,
      fromUser: req.user.id,
    });

    const savedExchange = await exchangeRequest.save();
    res.status(201).json(savedExchange);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getExchangeRequests = async (req: Request, res: Response) => {
  try {
    // Fetch only exchanges with status "pending"
    const exchanges = await Exchange.find({
      toUser: req.user.id,
      status: "pending",
    })
      .populate("fromUser", "username")
      .populate("bookOffered")
      .populate("bookRequested");

    if (exchanges.length === 0) {
      return res.status(404).json({
        message: "No pending exchange requests found",
      });
    }

    res.status(200).json(exchanges);
  } catch (error) {
    res.status(500).json({ message: error || "Server error" });
  }
};

export const acceptExchangeRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const exchange = await Exchange.findById(id);
    if (!exchange) {
      return res.status(404).json({ message: "Exchange request not found" });
    }

    if (exchange.toUser.toString() !== req.user.id) {
      return res.status(403).json({ message: "User not authorized" });
    }

    exchange.status = "accepted";
    await exchange.save();

    res.status(200).json({ message: "Exchange request accepted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const rejectExchangeRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const exchange = await Exchange.findById(id);
    if (!exchange) {
      return res.status(404).json({ message: "Exchange request not found" });
    }

    if (exchange.toUser.toString() !== req.user.id) {
      return res.status(403).json({ message: "User not authorized" });
    }

    exchange.status = "rejected";
    await exchange.save();

    res.status(200).json({ message: "Exchange request rejected" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
