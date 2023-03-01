install: # установить зависимости после клонирования проекта
	npm ci

publish: # выполняет имитацию публикации проекта
	npm publish --dry-run

lint: # выполняет проверку Linter всех файлов проекта
	npx eslint .

lint-fix: # автоматически исправляет найденные ошибки Linter
	npx eslint . --fix

start: # сборка приложения через WEBPack
	npx webpack serve