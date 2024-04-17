# CLI OLIVER

```
- Version: 1.3.5
- Author: Wictor Hiago
- Github: https://github.com/WictorHiago/cli-oliver.git
- Description: CLI OLIVER is a CLI for building RESTful APIs with Node.js.
- Oliver CLI provides a rapid and clean architecture structure, fully customizable, and includes
- pre-configured packages such as Express.js, Morgan, and Cors.
```

#Shots
<img src="https://github.com/WictorHiago/cli-oliver/blob/main/assets/image2.png" width="45%">
<hr>
<img src="https://github.com/WictorHiago/cli-oliver/blob/main/assets/image1.png" width="45%">
<hr>
<img src="https://github.com/WictorHiago/cli-oliver/blob/main/assets/image3.png" width="45%">


# Template project

```
src
├── application
│   ├── controllers
│   │   ├── user.controller.ts
│   │   └── ...
│   ├── entities
│   │   ├── user.entity.ts
│   │   └── ...
│   ├── usecases
│   │   ├── create-user.usecase.ts
│   │   └── ...
│   └── ports
│       ├── http.port.ts
│       └── repository.port.ts
├── infrastructure
│   ├── adapters
│   │   ├── express.adapter.ts
│   │   └── ...
│   ├── database
│   │   ├── user.repository.ts
│   │   └── ...
│   └── driver
│       ├── mysql.driver.ts
│       └── ...
└── main.ts
```

# Install

```
npx oliver create
cd <your-app>
npx oliver install
tsc -init
code .
```

### Typescript

Configure your project to typescript
run: tsc -init and edit your choices

### Commands

```
npx oliver list                 // view commands
npx oliver make:controller      // create controller
npx oliver make:usecase         // create usecase
npx oliver config:orm           // not working
```

<br>
<br>
<div align="center">
  <sub>Built with ❤︎ by <a href="https://github.com/WictorHiago/cli-oliver.git">Wictor Hiago</a>
</div>
