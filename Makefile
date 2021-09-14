IMAGE = lucperkins/vrl-server:latest

client-dev:
	(cd client && yarn run start)

docker-build:
	docker buildx build -t $(IMAGE) .

docker-run:
	docker run --rm -it -p 8080:8080 $(IMAGE)

docker-push:
	docker push $(IMAGE)