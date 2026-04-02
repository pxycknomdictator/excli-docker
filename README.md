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
- 🗄️ Pre-configured databases (MySQL, MariaDB, PostgreSQL, SQLite, MongoDB)
- ⚡ Optional Redis cache support
- 📦 Multiple package manager support (npm, yarn, pnpm, bun)
- 🛠️ Admin panels included for database management
- 🔧 Automatic .env file generation
- ⚡ Modern Docker best practices
- 🎯 **Interactive mode** for guided setup
- 🎨 **Simple flag-based CLI** for quick configuration

---

### Getting Started

#### Interactive Mode (Recommended for Beginners)

Simply run the command and follow the prompts:

```bash
npx @excli/docker
```

The interactive mode will guide you through selecting:

- Database (MySQL, MariaDB, SQLite, PostgreSQL, MongoDB)
- Programming language (TypeScript or JavaScript)
- Redis (optional)
- Package manager (npm, yarn, pnpm, bun)

#### Quick Setup with Flags

For experienced users who know what they want:

```bash
# With database only
npx @excli/docker --ts --pnpm --postgres

# With database and Redis cache
npx @excli/docker --ts --pnpm --postgres --redis
```

**Or install globally:**

```bash
npm install -g @excli/docker

# Interactive mode
excli-docker

# With flags
excli-docker --ts --pnpm --postgres
```

#### Requirements

- Node.js 20 or higher
- npm, yarn, pnpm or bun
- Docker (required for running generated configurations)

---

### Usage

#### Two Ways to Use

**1. Interactive Mode (Easiest)**

```bash
npx @excli/docker
```

Just answer the prompts and you're done!

**2. Flag-Based Mode (Fastest)**

```bash
# TypeScript with PostgreSQL and pnpm
npx @excli/docker --ts --pnpm --postgres

# JavaScript with MongoDB and npm
npx @excli/docker --js --npm --mongodb

# TypeScript with MySQL and yarn
npx @excli/docker --ts --yarn --mysql

# JavaScript with MariaDB and bun
npx @excli/docker --js --bun --mariadb

# TypeScript with SQLite and yarn
npx @excli/docker --ts --yarn --sqlite
```

---

### Command-Line Flags

#### Language Flags

- `--ts` - TypeScript
- `--js` - JavaScript

#### Database Flags

- `--mysql` - MySQL database
- `--mariadb` - MariaDB database
- `--postgres` - PostgreSQL database
- `--sqlite` - SQLite database
- `--mongodb` - MongoDB database

#### Cache Flags (Optional)

- `--redis` - Add Redis for caching (can be combined with any database)

#### Package Manager Flags

- `--npm` - npm package manager
- `--yarn` - Yarn package manager
- `--pnpm` - pnpm package manager
- `--bun` - Bun package manager

**Examples:**

```bash
# TypeScript with PostgreSQL and Yarn
npx @excli/docker --ts --yarn --postgres
excli-docker --ts --yarn --postgres

# JavaScript with MongoDB and pnpm
npx @excli/docker --js --pnpm --mongodb
excli-docker --js --pnpm --mongodb

# TypeScript with MySQL and bun
npx @excli/docker --ts --bun --mysql

# JavaScript with MariaDB and npm
npx @excli/docker --js --npm --mariadb

# TypeScript with PostgreSQL, pnpm, and Redis cache
npx @excli/docker --ts --pnpm --postgres --redis

# JavaScript with MongoDB, yarn, and Redis cache
npx @excli/docker --js --yarn --mongodb --redis
```

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

| Database             | Admin Panel   | Admin Panel Port |
| -------------------- | ------------- | ---------------- |
| **MySQL**            | phpMyAdmin    | 6969             |
| **MariaDB**          | phpMyAdmin    | 6969             |
| **PostgreSQL**       | pgAdmin       | 6969             |
| **MongoDB**          | Mongo Express | 6969             |
| **SQLite**           | ---           | ---              |
| **Redis** (Optional) |

All database admin panels are accessible at `http://localhost:6969` after running `docker compose up`.

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

---

### Managing Your Database

After running `docker compose up`, access your database admin panel at **http://localhost:6969**

- **pgAdmin** - Full-featured PostgreSQL management
- **phpMyAdmin** - Intuitive MySQL & MariaDB interface
- **Mongo Express** - Simple MongoDB administration

---

### Troubleshooting

**Port already in use?**
Check if another service is running on port 6969, or modify the ports in your `.env` file.

**Docker issues?**
Make sure Docker Desktop is running before executing `docker compose up`.

**Package manager not found in container?**
Ensure the generated Dockerfile includes the correct package manager installation steps.

**Using old syntax?**
If you're using the old v1.x syntax, please upgrade to the new flag-based syntax. See the [Breaking Changes](#-breaking-changes-v200) section.

**Interactive mode not working?**
Make sure you're using the latest version: `npm install -g @excli/docker@latest`

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
🔗 [@pxycknomdictator](https://github.com/pxycknomdictator)

---

**Happy coding! Built with ❤️ for developers who value productivity.**
