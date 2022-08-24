# MeeHat WebAPI Channelドキュメント(v1)
## `/api/v1/channels/チャンネルID/pins`
### GET
そのチャンネルのピン留めを一覧で返します。


## `/api/v1/channels/チャンネルID/participation`
### POST
チャンネルに参加します。
### DELETE
チャンネルから離脱します。


## `/api/v1/channels/チャンネルID/messages`
### GET
そのチャンネルのメッセージを受け取ります。<br>
### POST
メッセージをチャンネルに送信します。


## `/api/v1/channels/チャンネルID/messages/メッセージID`
### PATCH
メッセージを変更します。投稿した本人である必要があります。
### DELETE
メッセージを削除します。投稿した本人である必要があります。


## `/api/v1/channels/チャンネルID/messages/メッセージID/reaction`
### POST
メッセージにリアクションを付ける。


## `/api/v1/channels/チャンネルID/messages/メッセージID/pin`
### POST
メッセージをピン留めする。
### DELETE
メッセージのピン留めを解除します。


## `/api/v1/channels/チャンネルID/messages/メッセージID/bookmark`
### POST
メッセージをブックマークする。


## `/api/v1/channels/チャンネルID/messages/メッセージID/replay`
### POST
メッセージに返信する。


## `/api/v1/channels/チャンネルID/messages/メッセージID/thread`
### GET
スレッドを返します。スレッド内のメッセージも含まれます。
### POST
スレッドでメッセージに返信します。
