"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
class Template {
    async generate() {
        const fileContents = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "AppProps.json"), "utf8");
        const { nameApp, packages, selectTemplate } = JSON.parse(fileContents);
        const rootDir = path_1.default.resolve(__dirname, "..", "..", "..", `${nameApp}`);
        if (!fs_1.default.existsSync(path_1.default.resolve(rootDir))) {
            await fs_1.default.mkdirSync(path_1.default.resolve(rootDir), { recursive: true });
        }
        (0, child_process_1.exec)(`npm init -y`, { cwd: path_1.default.resolve(rootDir) }, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
        });
        const packagesToInstall = packages.join(" ");
        const dirProject = path_1.default.resolve(rootDir);
        if (selectTemplate === "clean-archi") {
            console.log(`🪬  Please wait, loading project..`);
            const directories = [
                "core/entity",
                "core/repository",
                "core/usecase",
                "infra/controller",
                "infra/database",
                "infra/http",
                "infra/repository",
            ];
            const files = [
                { path: "core/entity/userEntity.ts", content: "export class UserEntity {}" },
                { path: "core/repository/userRepository.ts", content: "export class UserRepository {}" },
                { path: "core/usecase/usecase.ts", content: "export class Usecase {\n\n    execute() {\n    }\n}" },
                {
                    path: "infra/controller/Controller.ts",
                    content: `import { Request, Response } from 'express';\nexport class Controller {\n  public static async index(request: Request, response: Response) {\n    return response.status(200).json({ message: 'Hello World!' });\n  }\n}`,
                },
                { path: "infra/database/database-config.ts", content: "export const databaseConfig = {}" },
                {
                    path: "infra/http/express.ts",
                    content: `import express from 'express';\nimport morgan from 'morgan';\nimport cors from 'cors';\nimport router from './router';\n\nconst server = express();\n\nconst port = process.env.SERVER_PORT || 3000;\n\nserver.use(morgan('dev'));\n\nserver.use(\n  cors({\n    origin: '*',\n    methods: ['GET', 'POST', 'PUT', 'DELETE'],\n    allowedHeaders: ['Content-Type', 'Authorization'],\n  })\n);\n\nserver.use(express.json());\n\nserver.use(router);\n\nserver.listen(port, () => {\n  console.log(\`Server started on http://localhost:\${port}\`);\n});\n\nexport default server;`,
                },
                {
                    path: "infra/http/router.ts",
                    content: `import { Router } from 'express';\nimport { Controller } from '../controller/Controller';\n\nconst router = Router();\n\nrouter.get('/', Controller.index);\n\nexport default router;`,
                },
                { path: "infra/repository/repositoryInMemory.ts", content: "" },
            ];
            directories.forEach((directory) => {
                // console.log(`🔹 Create success: ${directory}`);
                const fullDirPath = path_1.default.resolve(rootDir, "src", directory);
                fs_1.default.mkdirSync(fullDirPath, { recursive: true }); // Cria o diretório pai recursivamente
            });
            files.forEach((file) => {
                console.log(`🔹 Create success: ${file.path}`);
                const fullFilePath = path_1.default.resolve(rootDir, "src", file.path);
                fs_1.default.writeFileSync(fullFilePath, file.content);
            });
            (function end() {
                const json = fs_1.default.readFileSync(path_1.default.resolve(rootDir, "package.json"), "utf8");
                console.log(json);
                const packageJson = JSON.parse(json);
                packageJson.scripts = {
                    dev: "ts-node-dev --respawn --transpile-only src/infra/http/express.ts",
                };
                fs_1.default.writeFileSync(path_1.default.resolve(rootDir, "package.json"), JSON.stringify(packageJson, null, 2));
                console.log(`
          🪬   Install sucess:
                cd <your-app>
                npx oliver install
                `);
            })();
        }
        if (selectTemplate === "no-template") {
            setTimeout(async () => {
                (0, child_process_1.exec)(`npm i ${packagesToInstall}`, { cwd: path_1.default.resolve(dirProject) }, (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                        process.exit(1);
                    }
                    if (stderr) {
                        console.log(`stderr instaling @packs: ${stderr}`);
                        process.exit(1);
                    }
                    console.log(`stdout: ${stdout}`);
                });
                console.log("🔹 ::Install @packs: " + packagesToInstall);
            }, 1000);
        }
    }
    async installDependencies() {
        const fileDependencies = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "dependencies.json"), "utf8");
        console.log(fileDependencies);
    }
}
exports.Template = Template;
