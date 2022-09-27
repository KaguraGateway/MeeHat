# MeeHat
ミーティングチャットアプリ「MeeHat」<br>
名前の由来はMeetとChatを繋げただけ。<br>
**WIP**

## 構成
### バックエンド
- Ruby 3.1.2
- Ruby on Rails >= 7
- MySQL
- Redis
- Elasticsearch（検索）
- kibana（分析用）
### フロントエンド（利用者用）
- TypeScript
- React
### フロントエンド（管理者用）
Hotwireを用いてSPA likeで開発する。
- Hotwire

## 環境変数（開発環境）
- MYSQL_ROOT_PASSWORD: DBのrootパスワード
- MYSQL_DATABASE: MYSQL_USERがデフォルトで権限を持つDB名（myapp_development）
- MYSQL_USER: Railsが使用するDBユーザーアカウント
- MYSQL_PASSWORD: MYSQL_USERのパスワード
- MAIL_USER: メール送信用のSMTPアカウントのメールアドレス
- MAIL_PASSWORD: メール送信用のSMTPアカウントのパスワード

## 環境変数（本番環境）
- MYSQL_USER: Railsが使用するDBユーザーアカウント
- MYSQL_PASSWORD: MYSQL_USERのパスワード
- REDIS_HOST: Redisのホスト（redis）
- REDIS_PORT: Redisのポート
- CABLE_REDIS: ActiveCable用Redis
- MAIL_USER: メール送信用のSMTPアカウントのメールアドレス
- MAIL_PASSWORD: メール送信用のSMTPアカウントのパスワード

## 環境構築（開発環境）
1. Docker（>= v20.10）とDocker Compose（>= v2.6.0）をインストールする
2. 本レポジトリをクローンする
3. .envファイルを [環境変数（開発環境）](##環境変数（開発環境）) に合わせて作成する
4. `docker compose build`
5. `docker compose up`
6. http://localhost:3000 にアクセスできればOK

### `bundle install`時
```
docker compose build
```
で`bundle install`することができます。

### `rails`コマンドを使用したいとき
`docker compose run web `...で実行することができます。<br>
例）rails db:migrate
```
docker compose run web rails db:migrate
```

### パーミッションエラーが出たとき
```shell
sudo chown -R ユーザー:root .
```
を実行することで解決する場合があります。

### db:migrate時に`Got error 168 - 'Unknown (generic) error from engine' from storage engine`となる場合
```
// container_idはdbのid
docker stop container_id
docker start container_id
```

## 技術的な詳細
[MeeHatドキュメント](./doc/README.md)