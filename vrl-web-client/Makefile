build:
	yarn build

dev:
	yarn dev

publish: build
	yarn export

run-local: build
	python3 -m http.server --directory ./out 1313
