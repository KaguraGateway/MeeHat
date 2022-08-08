# MeeHatドキュメント
## URL設計
### /
トップページはMeeHatの紹介ページとする。<br>
この部分はReactは使わない。またRailsでほぼ静的ページにする。<br>
[参考ページ](https://railstutorial.jp/chapters/static-pages?version=3.2)

### /app
MeeHatのWebアプリケーションページ<br>
このURL配下はReactを用いてCSRで開発する。

### /admin
MeeHatのAdminページ<br>
SPAほどのリッチさはいらないことから、Hotwireを用いてSSRで開発する。
