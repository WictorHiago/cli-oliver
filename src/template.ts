import fs from "fs";
import path from "path";
import { exec } from "child_process";

export class Template {
  public async generate(): Promise<void> {
    const fileContents = fs.readFileSync(path.resolve(__dirname, "AppProps.json"), "utf8");
    const { nameApp, packages, selectTemplate } = JSON.parse(fileContents);
    const rootDir = path.resolve(__dirname, "..", "..", "..", `${nameApp}`);
    if (!fs.existsSync(path.resolve(rootDir))) {
      await fs.mkdirSync(path.resolve(rootDir), { recursive: true });
    }
    exec(`npm init -y`, { cwd: path.resolve(rootDir) }, (error, stdout, stderr) => {
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
    const dirProject = path.resolve(rootDir);

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
        const fullDirPath = path.resolve(rootDir, "src", directory);

        fs.mkdirSync(fullDirPath, { recursive: true }); // Cria o diretório pai recursivamente
      });
      files.forEach((file) => {
        console.log(`🔹 Create success: ${file.path}`);
        const fullFilePath = path.resolve(rootDir, "src", file.path);
        fs.writeFileSync(fullFilePath, file.content);
      });
      (function end() {
        const json = fs.readFileSync(path.resolve(rootDir, "package.json"), "utf8");
        console.log(json);
        const packageJson = JSON.parse(json);
        packageJson.scripts = {
          dev: "ts-node-dev --respawn --transpile-only src/infra/http/express.ts",
        };

        fs.writeFileSync(path.resolve(rootDir, "package.json"), JSON.stringify(packageJson, null, 2));
        console.log(`
          🪬   Install sucess:
                cd <your-app>
                npx oliver install
                `);
      })();
    }
    if (selectTemplate === "no-template") {
      setTimeout(async () => {
        exec(`npm i ${packagesToInstall}`, { cwd: path.resolve(dirProject) }, (error, stdout, stderr) => {
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

  public async installDependencies() {
    const fileDependencies = fs.readFileSync(path.resolve(__dirname, "dependencies.json"), "utf8");
    console.log(fileDependencies);
  }
}
