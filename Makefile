# Makefile for Node.js project

.DEFAULT_GOAL := help

.PHONY: help
help:
	@echo "Available targets:"
	@echo "  make build   - Run build"
	@echo "  make dev     - Run dev"
	@echo "  make lint    - Run ESLint"
	@echo "  make clean   - Clean up project"
	@echo "  make help    - Display this help message"

.PHONY: dev
dev: node_modules
	pnpm run dev

.PHONY: build
build: node_modules
	pnpm run build

.PHONY: lint
lint:
	pnpm run lint

.PHONY: clean
clean:
	pnpm run clean

# Install dependencies if 'node_modules' is missing
node_modules: pnpm-lock.yaml
	pnpm install
