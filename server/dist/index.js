"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
(async () => {
    const app = (0, express_1.default)();
    app.get("/", (_, res) => {
        res.send("hello from express !");
    });
    app.listen(process.env.PORT, () => {
        console.log(`🚀 server runing http://localhost:${process.env.PORT}`);
    });
})();
//# sourceMappingURL=index.js.map