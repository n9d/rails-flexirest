
```
git clone
```


# 起動方法

- 一方のターミナルで srvを起動 3001ポートで railsが起動する http://localhost:3001/arts 

```
cd srv
docker-compose build
docker-compose up
```

- 他方のターミナルで herを起動 3000ポートで railsが起動する http://localhost:3000/article_form/index

```
cd her
docker-compose build
docker-comose run api rails console
```

- herの方で ArtモデルとしてAPIがラッピングされている

```
Art.find(1)
```
