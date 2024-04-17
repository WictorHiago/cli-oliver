#!/usr/bin/env ts-node

import fs from "fs";
import path from "path";
import { Command } from "commander";
import { execSync } from "child_process";

const command = new Command();

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

export async function install() {
  const fileContents = fs.readFileSync(path.resolve(__dirname, "AppProps.json"), "utf8");

  const AppProps = JSON.parse(fileContents);
  const rootDir = path.resolve(__dirname, "..", "..", "..", `${AppProps.nameApp}`);
  const fileContentDependencies = fs.readFileSync(path.resolve(__dirname, "dependencies.json"), "utf8");
  const dependencies = JSON.parse(fileContentDependencies);
  console.log(dependencies);

  execSync(`npm i ${dependencies.dependencies}`, { cwd: path.resolve(rootDir), stdio: "inherit" });
  execSync(`npm i ${dependencies.devDependencies} -D`, { cwd: path.resolve(rootDir), stdio: "inherit" });
}

import { Operator } from ".";
import { Template } from "./template";

const cli = new Operator();
const template = new Template();

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
