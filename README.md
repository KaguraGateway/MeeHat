# MeeHat
ミーティングチャットアプリ「MeeHat」<br>
名前の由来はMeetとChatを繋げただけ。<br>
**WIP**

## 構成
### バックエンド
- Ruby 3.1.2
- Ruby on Rails >= 7
- MySQL
### フロントエンド（利用者用）
- TypeScript
- React
### フロントエンド（管理者用）
Hotwireを用いてSPA likeで開発する。
- Hotwire

## 環境変数（開発環境）
- MYSQL_ROOT_PASSWORD: DBのrootパスワード
- MYSQL_DATABASE: MYSQL_USERがデフォルトで権限を持つDB名
- MYSQL_USER: Railsが使用するDBユーザーアカウント
- MYSQL_PASSWORD: MYSQL_USERのパスワード

## 環境変数（本番環境）
- MYSQL_USER: Railsが使用するDBユーザーアカウント
- MYSQL_PASSWORD: MYSQL_USERのパスワード

## 環境構築（開発環境）
1. Docker（>= v20.10）とDocker Compose（>= v2.6.0）をインストールする
2. 本レポジトリをクローンする
3. .envファイルを [環境変数（開発環境）](##環境変数（開発環境）) に合わせて作成する
4. `docker-compose up`
5. http://localhost:3000 にアクセスできればOK

## 技術的な詳細
[MeeHatドキュメント](./doc/README.md)