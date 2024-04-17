#!/usr/bin/env ts-node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.install = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
const child_process_1 = require("child_process");
const command = new commander_1.Command();
function list() {
    console.log(`
🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
  create                              // create new app                                              
  make:install                        // install packages pre-installed                              
  make:update                         // update packages PS: not recommended for production          
  make:controller <name-controller>   // create controller                                           
  make:usecase <name-usecase>         // create usecase                                              
  make:config <name-orm>              // setup orm (prisma) or (typeorm) PS: not working             
🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹            `);
}
async function install() {
    const fileContents = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "AppProps.json"), "utf8");
    const AppProps = JSON.parse(fileContents);
    const rootDir = path_1.default.resolve(__dirname, "..", "..", "..", `${AppProps.nameApp}`);
    const fileContentDependencies = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "dependencies.json"), "utf8");
    const dependencies = JSON.parse(fileContentDependencies);
    console.log(dependencies);
    (0, child_process_1.execSync)(`npm i ${dependencies.dependencies}`, { cwd: path_1.default.resolve(rootDir), stdio: "inherit" });
    (0, child_process_1.execSync)(`npm i ${dependencies.devDependencies} -D`, { cwd: path_1.default.resolve(rootDir), stdio: "inherit" });
}
exports.install = install;
const _1 = require(".");
const template_1 = require("./template");
const cli = new _1.Operator();
const template = new template_1.Template();
command
    .command("create")
    .description("🪬  create new app")
    .action(async () => {
    cli.start();
    await cli.createNameApp();
    await cli.selectPackages();
    await cli.selectTemplates();
    await cli.generateJson();
    await template.generate();
});
command
    .command("list")
    .description("🪬  help")
    .action(() => {
    list();
});
command
    .command("install")
    .description("🪬  install packages")
    .action(() => {
    install();
});
command.parse(process.argv);
