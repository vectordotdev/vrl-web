IMAGE = lucperkins/vrl-server:latest

docker-build:
	docker buildx build -t $(IMAGE) .

docker-force-build:
	docker build --no-cache -t $(IMAGE) .

docker-run:
	docker run --rm -it -p 8080:8080 $(IMAGE)

docker-push:
	docker push $(IMAGE)
