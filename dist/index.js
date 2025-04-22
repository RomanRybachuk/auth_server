"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)({ origin: ["http://localhost:5173", "http://localhost:5500"] }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api", routes_1.default);
app.listen(PORT, () => {
    console.log("process.env.JWT_ACCESS_TOKEN_EXPIRY", process.env.JWT_ACCESS_TOKEN_EXPIRY);
    console.log(`Server running at http://localhost:${PORT}`);
});
