# CLI OLIVER

```
- Version: 1.2.8
- Author: Wictor Hiago
- Github: https://github.com/WictorHiago/cli-oliver.git
- Description: CLI OLIVER is a CLI for building RESTful APIs with Node.js.
- Oliver CLI provides a rapid and clean architecture structure, fully customizable, and includes
- pre-configured packages such as Express.js, Morgan, and Cors.
```

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
npx oliver install
```

### Commands

```
npx oliver list                 // view commands
npx oliver make:controller      // create controller
npx oliver make:usecase         // create usecase
npx oliver config:orm           // not working
```

<div align="center">

[![gh-workflow-image]][gh-workflow-url] [![npm-image]][npm-url] ![][typescript-image] [![license-image]][license-url]

</div>
<br>
<br>
<div align="center">
  <sub>Built with ❤︎ by <a href="https://github.com/WictorHiago/cli-oliver.git">Wictor Hiago</a>
</div>
