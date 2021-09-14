IMAGE = lucperkins/vrl-server:latest

client-dev:
	(cd client && yarn run start)

docker-build:
	docker build -t $(IMAGE) .

docker-run: docker-build
	docker run --rm -it -p 8080:8080 $(IMAGE)

docker-push: docker-build
	docker push $(IMAGE)