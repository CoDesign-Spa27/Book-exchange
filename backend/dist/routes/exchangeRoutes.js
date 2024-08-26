"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const exchangeController_1 = require("../controllers/exchangeController");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const router = express_1.default.Router();
router.post('/exchange', authMiddlewares_1.protect, exchangeController_1.createExchangeRequest);
router.get('/exchange', authMiddlewares_1.protect, exchangeController_1.getExchangeRequests);
router.put('/exchange/accept/:id', authMiddlewares_1.protect, exchangeController_1.acceptExchangeRequest);
router.put('/exchange/reject/:id', authMiddlewares_1.protect, exchangeController_1.rejectExchangeRequest);
exports.default = router;
