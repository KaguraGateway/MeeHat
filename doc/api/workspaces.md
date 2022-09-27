# MeeHat WebAPI Workspaceドキュメント(v1)
## `/api/v1/workspaces`
### GET
参加しているワークスペース一覧を返します。
### POST
ワークスペースを作成します。


## `/api/v1/workspaces/ワークスペースID`
### GET
ワークスペースの情報を取得します。
### DELETE
ワークスペースを削除します。このAPIにはワークスペースのオーナーである必要があります。


## `/api/v1/workspaces/join`
### POST
ワークスペースに参加する。
### DELETE
ワークスペースから離脱する。

## `/api/v1/workspaces/ワークスペースID/invite`
### POST
招待コードを生成します。

## `/api/v1/workspaces/ワークスペースID/channels`
### GET
そのワークスペース内にある全てのチャンネルを返します。
### POST
チャンネルを作成する。


## `/api/v1/workspaces/ワークスペースID/channels/チャンネルID`
### GET
チャンネルの情報を取得します。
### POST
チャンネルの設定を変更します。
