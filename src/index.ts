#!/usr/bin/env ts-node
import input from "@inquirer/input";
import fs from "fs";
import path from "path";
import checkbox from "@inquirer/checkbox";
import { VerfyPackage } from "./packageTypes";

let nameApp: string;
let packages: string[] = [];
let selectTemplate: string;

export class Operator {
  public async start(): Promise<void> {
    console.log(
      `
 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
    _______        _____      _____         _____ _    _ _______  ______
    |       |        |   ___ |     | |        |    \\  /  |______ |_____/
    |_____  |_____ __|__     |_____| |_____ __|__   \\/   |______ |    \\_
 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
     `
    );
  }

  public async createNameApp(): Promise<void> {
    const answer = await input({ message: "Enter your app name" });
    nameApp = answer;
  }
  public async selectPackages(): Promise<void> {
    const answer = await checkbox({
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

    answer.forEach((value: any) => packages.push(value));

    const typesPacks = new VerfyPackage();
    const typesPackages = typesPacks.getTypes(packages);

    const objDependencies = {
      dependencies: packages.join(" "),
      devDependencies: typesPackages,
    };

    fs.writeFileSync(path.resolve(__dirname, "dependencies.json"), JSON.stringify(objDependencies, null, 2));
  }

  public async selectTemplates(): Promise<void> {
    const answer = await checkbox({
      message: "Select your template",
      choices: [
        { name: "Basic Clean-Architecture", value: "clean-archi" },
        { name: "No-template", value: "no-template" },
      ],
      required: true,
      validate: (value: any) => (value.length > 1 ? "Please select only one template" : true),
    });
    selectTemplate = answer[0];
  }

  public async generateJson(): Promise<void> {
    const objAppProps = {
      nameApp,
      packages,
      selectTemplate,
    };
    fs.writeFileSync(path.resolve(__dirname, "AppProps.json"), JSON.stringify(objAppProps, null, 2));
    console.log(`
          🪬   Install sucess:
                cd <your-app>
                npx oliver install
                `);
  }
}
