## Docker CLI Tool

A CLI generator for production-ready Docker configurations for JavaScript and TypeScript projects, with your choice of database, package manager, and optional Redis.

[![npm version](https://badge.fury.io/js/%40excli%2Fdocker.svg)](https://badge.fury.io/js/%40excli%2Fdocker)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## Features

- TypeScript or JavaScript support
- Databases: MySQL, MariaDB, PostgreSQL, SQLite, MongoDB
- Optional Redis cache
- Package managers: npm, yarn, pnpm, bun
- Admin panel for each database
- Interactive mode or quick flag-based setup

## Requirements

- Node.js 20 or higher
- npm, yarn, pnpm, or bun
- Docker

## Quick Start

### Interactive mode

```bash
npx @excli/docker
```

You'll be prompted for your database, language, Redis (optional), and package manager.

### Flag mode

```bash
npx @excli/docker --ts --pnpm --postgres
```

### Global install

```bash
npm install -g @excli/docker

excli-docker                          # interactive
excli-docker --ts --pnpm --postgres   # with flags
```

## Generated Files

| File              | Purpose                                    |
| ----------------- | ------------------------------------------ |
| `Dockerfile`      | Production-optimized container image       |
| `compose.yaml`    | Multi-service setup (app, database, admin) |
| `.dockerignore`   | Keeps unnecessary files out of the image   |
| `.env`            | Environment variables for development      |
| `.env.production` | Environment variables for production       |

## Flags

| Category        | Flags                                                         |
| --------------- | ------------------------------------------------------------- |
| Language        | `--ts`, `--js`                                                |
| Database        | `--mysql`, `--mariadb`, `--postgres`, `--sqlite`, `--mongodb` |
| Cache           | `--redis` (optional, works with any database)                 |
| Package manager | `--npm`, `--yarn`, `--pnpm`, `--bun`                          |

### Examples

```bash
# TypeScript + PostgreSQL + pnpm
npx @excli/docker --ts --pnpm --postgres

# JavaScript + MongoDB + npm
npx @excli/docker --js --npm --mongodb

# TypeScript + MySQL + yarn + Redis
npx @excli/docker --ts --yarn --mysql --redis

# JavaScript + MariaDB + bun
npx @excli/docker --js --bun --mariadb

# TypeScript + SQLite + yarn
npx @excli/docker --ts --yarn --sqlite
```

## Databases and Admin Panels

| Database   | Admin Panel   | URL                     |
| ---------- | ------------- | ----------------------- |
| MySQL      | phpMyAdmin    | `http://localhost:6969` |
| MariaDB    | phpMyAdmin    | `http://localhost:6969` |
| PostgreSQL | pgAdmin       | `http://localhost:6969` |
| MongoDB    | Mongo Express | `http://localhost:6969` |
| SQLite     | None          | None                    |

> Some admin panels can take a minute to initialize on first startup.

## Running Your Services

```bash
docker compose up        # start services
docker compose up -d     # start in detached mode
docker compose down      # stop services
```

## Troubleshooting

**Port already in use?**
Another service may be using port 6969. Stop it, or change the port in your `.env` file.

**Docker not working?**
Make sure Docker Desktop (or the Docker daemon) is running before `docker compose up`.

**Interactive mode not working?**
Update to the latest version: `npm install -g @excli/docker@latest`

**Still stuck?**
Open an issue on GitHub with details about your problem.

## Contributing

Contributions are welcome: bug reports, feature ideas, documentation fixes, and pull requests.

## License

ISC. See the `LICENSE` file for details.

## Author

**Noman**
[pxycknomdictator@gmail.com](mailto:pxycknomdictator@gmail.com) | [@pxycknomdictator](https://github.com/pxycknomdictator)
