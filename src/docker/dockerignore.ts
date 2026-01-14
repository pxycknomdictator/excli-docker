export function getDockerIgnoreFile(): string {
    return `# Git files
.git
.gitignore
.gitattributes

# CI/CD
.github
.gitlab-ci.yml
.travis.yml
.circleci
.jenkins

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
package-lock.json
yarn.lock
pnpm-lock.yaml

# IDE and editor files
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store
*.sublime-project
*.sublime-workspace

# Test files
tests/
test/
*.test.js
*.test.ts
*.spec.js
*.spec.ts
__tests__/
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
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Environment files
.env
.env.local
.env.*.local
.env.development
.env.test
.env.production

# Docker
Dockerfile*
docker-compose*.yml
.dockerignore
compose.yaml

# Temporary files
tmp/
temp/
*.tmp
*.cache

# OS files
Thumbs.db
.DS_Store
desktop.ini

# TypeScript
*.tsbuildinfo

# ESLint & Prettier
.eslintcache
.prettierignore
`;
}
