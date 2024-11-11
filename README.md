# Node + TypeScript + Express + RestAPI + Monolithic

## Steps

```bash
# Install nvm
nvm use 22.10.0

# Install Global packages
npm i -g nodemon typescript pnpm

# Initialize package.json and project and dev dependencies
pnpm init
pnpm add express cors dotenv yaml semver mongoose
pnpm add -D @types/node @types/express ts-node typescript

# Security Libs
pnpm add cors compression hpp helmet
  # hpp - protect against HTTP Parameter Pollution attacks

# TypeScript Setup
tsc --init

# ESLint Setup
pnpm create @eslint/config@latest

# Prettier Setup
touch .prettierrc

# Prettier + ESLint Setup
pnpm add
pnpm add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-import eslint-plugin-node eslint-plugin-prettier eslint-plugin-promise prettier

# Nodemon and Dev Environment Setup
touch nodemon.json

# SonarQube Setup

# Docker Setup

# Husky Setup

# Logging Mechanism

# JWT
pnpm add jsonwebtoken
pnpm add -D @types/jsonwebtoken

# Path Alias
pnpm add -D tsconfig-paths
  # "nodemon -r tsconfig-paths/register src/index.ts" - package.json
  # "ts-node -r tsconfig-paths/register src/index.ts" - nodemon.json

```
