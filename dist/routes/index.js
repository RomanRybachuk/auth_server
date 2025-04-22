"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
// Init user router path
router.use("/user", router);
// Requests
router.post("/get", controllers_1.getUser);
router.post("/create", controllers_1.createUser);
exports.default = router;
