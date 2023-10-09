install:
	npm install

lint:
	npx stylelint ./src/scss/**/*.scss
	npx htmlhint ./src/*.html

sass:
	sass -w src/scss/app.scss src/css/style.css

build:
	npx webpack

start:
	npx webpack serve