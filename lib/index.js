#!/usr/bin/env ts-node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operator = void 0;
const input_1 = __importDefault(require("@inquirer/input"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const checkbox_1 = __importDefault(require("@inquirer/checkbox"));
const packageTypes_1 = require("./packageTypes");
let nameApp;
let packages = [];
let selectTemplate;
class Operator {
    async start() {
        console.log(`
 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
    _______        _____      _____         _____ _    _ _______  ______
    |       |        |   ___ |     | |        |    \\  /  |______ |_____/
    |_____  |_____ __|__     |_____| |_____ __|__   \\/   |______ |    \\_
 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
     `);
    }
    async createNameApp() {
        const answer = await (0, input_1.default)({ message: "Enter your app name" });
        nameApp = answer;
    }
    async selectPackages() {
        const answer = await (0, checkbox_1.default)({
            message: "Select a package manager",
            choices: [
                { name: "Express", value: "express" },
                { name: "Morgan", value: "morgan" },
                { name: "Cors", value: "cors" },
                { name: "Dotenv", value: "dotenv" },
                { name: "Postgres", value: "pg" },
                { name: "Sqlite3", value: "sqlite3" },
            ],
            required: true,
        });
        answer.forEach((value) => packages.push(value));
        const typesPacks = new packageTypes_1.VerfyPackage();
        const typesPackages = typesPacks.getTypes(packages);
        const objDependencies = {
            dependencies: packages.join(" "),
            devDependencies: typesPackages,
        };
        fs_1.default.writeFileSync(path_1.default.resolve(__dirname, "dependencies.json"), JSON.stringify(objDependencies, null, 2));
    }
    async selectTemplates() {
        const answer = await (0, checkbox_1.default)({
            message: "Select your template",
            choices: [
                { name: "Basic Clean-Architecture", value: "clean-archi" },
                { name: "No-template", value: "no-template" },
            ],
            required: true,
            validate: (value) => (value.length > 1 ? "Please select only one template" : true),
        });
        selectTemplate = answer[0];
    }
    async generateJson() {
        const objAppProps = {
            nameApp,
            packages,
            selectTemplate,
        };
        fs_1.default.writeFileSync(path_1.default.resolve(__dirname, "AppProps.json"), JSON.stringify(objAppProps, null, 2));
        console.log(`
          🪬   Install sucess:
                cd <your-app>
                npx oliver install
                `);
    }
}
exports.Operator = Operator;
