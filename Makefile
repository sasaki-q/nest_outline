build:
	echo "Docker ビルド"
	docker-compose build

up:
	echo "アプリケーション起動"
	docker-compose up -d