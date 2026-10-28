export function getDockerIgnoreFile(): string {
    return `# Git
.git/
.gitignore
.gitattributes

# CI/CD
.github/
.gitlab-ci.yml
.travis.yml
.circleci/
.jenkins/

# Documentation
README.md
CHANGELOG.md
LICENSE
CONTRIBUTING.md
docs/
*.md

# Node.js dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# IDE and editor files
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store
*.sublime-project
*.sublime-workspace

# Tests and coverage
tests/
test/
__tests__/
*.test.js
*.test.ts
*.spec.js
*.spec.ts
coverage/
.nyc_output/

# Build artifacts
dist/
build/
out/
.next/
.nuxt/
.cache/
*.tsbuildinfo

# Logs
logs/
*.log

# Environment files and secrets
.env*
**/.env*

# Docker
Dockerfile*
docker-compose*.yml
docker-compose*.yaml
.dockerignore
compose.yaml
compose.yml

# Temporary files
tmp/
temp/
*.tmp
*.cache

# Operating system files
Thumbs.db
desktop.ini

# ESLint and Prettier
.eslintcache
.prettierignore
`;
}
