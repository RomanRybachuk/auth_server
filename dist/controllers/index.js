"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = getUser;
exports.createUser = createUser;
const db_1 = __importDefault(require("../db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { JWT_ACCESS_TOKEN_SECRET, JWT_ACCESS_TOKEN_EXPIRY, JWT_REFRESH_TOKEN_SECRET, JWT_REFRESH_TOKEN_EXPIRY, } = process.env;
function getUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const userData = {
            id: 1,
            name: "Roman",
            email: "roman@gmail.com",
        };
        const accessToken = jsonwebtoken_1.default.sign(userData, JWT_REFRESH_TOKEN_SECRET, {
            expiresIn: JWT_REFRESH_TOKEN_EXPIRY,
        });
        const refreshToken = jsonwebtoken_1.default.sign(userData, JWT_ACCESS_TOKEN_SECRET, {
            expiresIn: JWT_ACCESS_TOKEN_EXPIRY,
        });
        response.status(200).send({
            accessToken,
            refreshToken,
        });
    });
}
function createUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield db_1.default.user.create({
            data: {
                firstname: "Roman",
                username: "romanrybachuk123",
                email: "roman.rybachuk.work123@gmail.com",
            },
        });
        response.json({ success: true, data: user });
    });
}
