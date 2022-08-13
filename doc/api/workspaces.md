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


## `/api/v1/workspaces/ワークスペースID/join`
### POST
ワークスペースに参加する。


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

## `/api/v1/workspaces/ワークスペースID/channels/チャンネルID/pins`
### GET
そのチャンネルのピン留めを一覧で返します。

## `/api/v1/workspaces/ワークスペースID/channels/チャンネルID/messages`
### GET
そのチャンネルのメッセージを受け取ります。<br>
### POST
メッセージをチャンネルに送信します。


## `/api/v1/workspaces/ワークスペースID/channels/チャンネルID/messages/メッセージID`
### PATCH
メッセージを変更します。投稿した本人である必要があります。
### DELETE
メッセージを削除します。投稿した本人である必要があります。


## `/api/v1/workspaces/ワークスペースID/channels/チャンネルID/messages/メッセージID/reaction`
### POST
メッセージにリアクションを付ける。


## `/api/v1/workspaces/ワークスペースID/channels/チャンネルID/messages/メッセージID/pin`
### POST
メッセージをピン留めする。
### DELETE
メッセージのピン留めを解除します。


## `/api/v1/workspaces/ワークスペースID/channels/チャンネルID/messages/メッセージID/bookmark`
### POST
メッセージをブックマークする。


## `/api/v1/workspaces/ワークスペースID/channels/チャンネルID/messages/メッセージID/replay`
### POST
メッセージに返信する。


## `/api/v1/workspaces/ワークスペースID/channels/チャンネルID/messages/メッセージID/thread`
### GET
スレッドを返します。スレッド内のメッセージも含まれます。
### POST
スレッドでメッセージに返信します。
