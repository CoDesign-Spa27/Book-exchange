"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectExchangeRequest = exports.acceptExchangeRequest = exports.getExchangeRequests = exports.createExchangeRequest = void 0;
const Exchange_1 = __importDefault(require("../models/Exchange"));
const zod_1 = __importDefault(require("zod"));
const createExchangeRequestSchema = zod_1.default.object({
    toUser: zod_1.default.string(),
    bookOffered: zod_1.default.string(),
    bookRequested: zod_1.default.string(),
});
const createExchangeRequest = async (req, res) => {
    try {
        const exchangeData = createExchangeRequestSchema.parse(req.body);
        const exchangeRequest = new Exchange_1.default({
            ...exchangeData,
            fromUser: req.user.id,
        });
        const savedExchange = await exchangeRequest.save();
        res.status(201).json(savedExchange);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
exports.createExchangeRequest = createExchangeRequest;
const getExchangeRequests = async (req, res) => {
    try {
        // Fetch only exchanges with status "pending"
        const exchanges = await Exchange_1.default.find({
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
    }
    catch (error) {
        res.status(500).json({ message: error || "Server error" });
    }
};
exports.getExchangeRequests = getExchangeRequests;
const acceptExchangeRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const exchange = await Exchange_1.default.findById(id);
        if (!exchange) {
            return res.status(404).json({ message: "Exchange request not found" });
        }
        if (exchange.toUser.toString() !== req.user.id) {
            return res.status(403).json({ message: "User not authorized" });
        }
        exchange.status = "accepted";
        await exchange.save();
        res.status(200).json({ message: "Exchange request accepted" });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
exports.acceptExchangeRequest = acceptExchangeRequest;
const rejectExchangeRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const exchange = await Exchange_1.default.findById(id);
        if (!exchange) {
            return res.status(404).json({ message: "Exchange request not found" });
        }
        if (exchange.toUser.toString() !== req.user.id) {
            return res.status(403).json({ message: "User not authorized" });
        }
        exchange.status = "rejected";
        await exchange.save();
        res.status(200).json({ message: "Exchange request rejected" });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
exports.rejectExchangeRequest = rejectExchangeRequest;
