### Docker CLI Tool

A powerful Docker configuration generator for creating production-ready containerized applications with TypeScript/JavaScript support, complete with database management and flexible package manager options.

[![npm version](https://badge.fury.io/js/%40excli%2Fdocker.svg)](https://badge.fury.io/js/%40excli%2Fdocker)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

---

### Why Choose This Generator?

A CLI tool for generating Docker configurations for JavaScript and TypeScript projects with customizable package managers and databases.

**Built for modern development:**

- 🚀 TypeScript or JavaScript support
- 🐳 Production-ready Docker configurations
- 🗄️ Pre-configured databases (MySQL, MariaDB, PostgreSQL, MongoDB)
- 📦 Multiple package manager support (npm, yarn, pnpm, bun)
- 🛠️ Admin panels included for database management
- 🔧 Automatic .env file generation
- ⚡ Modern Docker best practices

---

### Getting Started

No installation needed! Just run:

```bash
npx @excli/docker --lang=ts --db=postgres --pkgManager=pnpm
```

**Or install globally:**

```bash
npm install -g @excli/docker

# Long way
excli-docker --lang=ts --db=postgres --pkgManager=yarn

# Short way
excli-docker -l=ts -d=postgres -p=yarn
```

#### Requirements

- Node.js 20 or higher
- npm, yarn, pnpm or bun
- Docker (required for running generated configurations)

---

### Usage

#### Creating Your Configuration

Use command-line arguments to generate your Docker configuration:

```bash
# Long form
excli-docker --lang=ts --db=postgres --pkgManager=yarn
npx @excli/docker --lang=ts --db=postgres --pkgManager=yarn

# Short form
excli-docker -l=js -d=mongodb -p=npm
npx @excli/docker -l=js -d=mongodb -p=npm
```

**Required arguments:**

1. **Language** (`--lang` or `-l`) - TypeScript or JavaScript
2. **Database** (`--db` or `-d`) - Choose MySQL, MariaDB, PostgreSQL, or MongoDB
3. **Package Manager** (`--pkgManager` or `-p`) - npm, yarn, pnpm, or bun

---

### What's Included

#### Generated Files

- **Dockerfile** - Production-optimized container configuration
- **docker-compose.yml** - Multi-service orchestration with proper volume paths
- **.env** - Environment variables for your configuration
- **.env.example** - Template for team members

---

#### Database Options

Choose the database that fits your needs:

| Database       | Admin Panel   | Admin Panel Port |
| -------------- | ------------- | ---------------- |
| **MySQL**      | phpMyAdmin    | 6969             |
| **MariaDB**    | phpMyAdmin    | 6969             |
| **PostgreSQL** | pgAdmin       | 6969             |
| **MongoDB**    | Mongo Express | 6969             |

All admin panels are accessible at `http://localhost:6969` after running `docker compose up`.

> **Note:** Some admin panels might take a minute to initialize. Why? Great question! I wish I knew. Please be patient during first startup while they contemplate the meaning of life.

#### Package Manager Support

The tool automatically configures your Dockerfile for your chosen package manager:

- **npm** - Default Node.js package manager
- **yarn** - Fast, reliable, and secure dependency management
- **pnpm** - Efficient disk space usage with hard links
- **bun** - All-in-one JavaScript runtime and toolkit

---

### Common Commands

#### Docker & Databases

```bash
docker compose up        # Start database and admin panel
docker compose down      # Stop all Docker services
docker compose up -d     # Start services in detached mode
```

> **Note:** Add this script to your `package.json` for running your application inside Docker:
>
> ```json
> "docker:run": "node dist/main.js"
> ```

---

### Managing Your Database

After running `docker compose up`, access your database admin panel at **http://localhost:6969**

- **pgAdmin** - Full-featured PostgreSQL management
- **phpMyAdmin** - Intuitive MySQL & MariaDB interface
- **Mongo Express** - Simple MongoDB administration

---

### Command-Line Options

| Long Form      | Short Form | Description          | Options                                   |
| -------------- | ---------- | -------------------- | ----------------------------------------- |
| `--lang`       | `-l`       | Programming language | `ts`, `js`                                |
| `--db`         | `-d`       | Database type        | `mysql`, `mariadb`, `postgres`, `mongodb` |
| `--pkgManager` | `-p`       | Package manager      | `npm`, `yarn`, `pnpm`, `bun`              |

**Examples:**

```bash
# TypeScript with PostgreSQL and Yarn
excli-docker --lang=ts --db=postgres --pkgManager=yarn
excli-docker -l=ts -d=postgres -p=yarn

# JavaScript with MongoDB and pnpm
excli-docker --lang=js --db=mongodb --pkgManager=pnpm
excli-docker -l=js -d=mongodb -p=pnpm

# TypeScript with MySQL and bun
excli-docker -l=ts -d=mysql -p=bun

# Using with npx
npx @excli/docker --lang=ts --db=postgres --pkgManager=yarn
npx @excli/docker -l=js -d=mongodb -p=npm
```

---

### Recent Updates

#### Version Improvements

- ✅ Added production-ready Dockerfile templates
- ✅ Improved environment variable management
- ✅ Support for multiple package managers
- ✅ Command-line arguments support with yargs
- ✅ Cross-platform compatibility improvements

---

### Troubleshooting

**Port already in use?**
Check if another service is running on port 6969, or modify the ports in your `.env` file.

**Docker issues?**
Make sure Docker Desktop is running before executing `docker compose up`.

**Package manager not found in container?**
Ensure the generated Dockerfile includes the correct package manager installation steps.

**Missing required arguments?**
Make sure you provide all three required arguments: `--lang`, `--db`, and `--pkgManager`.

**Need help?**
Open an issue on GitHub with details about your problem.

---

### Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

---

### License

ISC License - see LICENSE file for details.

### Author

**Noman**  
📧 [pxycknomdictator@gmail.com](mailto:pxycknomdictator@gmail.com)  
🐙 [@pxycknomdictator](https://github.com/pxycknomdictator)

---

**Happy coding! Built with ❤️ for developers who value productivity.**
