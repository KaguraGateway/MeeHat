# MeeHat データベースドキュメント
## meehat_root_users
ルートアカウントテーブル

| column            |   type    | 制約                           | 備考 |
| ----------------- | --------- | ------------------------------ | ------------------------ |
| user_id           | integer   | PRIMARYKEY AUTTOINCREMENT INDEX| ユーザーID |
| email_encrypted   | string    |                                | 暗号化されたメールアドレス |
| email_hashed      | string    | INDEX                          | ハッシュ化されたメールアドレス |
| password_hashed   | string    |                                | ハッシュ化されたパスワード |
| country_code      | integer   |                                | 国 |
| status            | integer   |                                | ステータス |

### メールアドレスの暗号化
AES256-CBCによって暗号化されたメールアドレスをemail_encryptedに保存する。<br>
SHA256により512回ハッシュ化されたメールアドレスをemail_hashedに保存する。<br>
メールアドレスの暗号化は完全におまけ程度（ソルト含めれないけど平文は気分的に嫌なのでくらい）

### パスワードの暗号化
bcryptによるハッシュ化（不可逆暗号化）を行ってからpassword_hashedに保存する。

### `status`
- 0: オフライン
- 1: 離席中（通知オフ）
- 2: オンライン

## meehat_profile_users
プロフィールアカウントテーブル

| column            |   type    | 制約                           | 備考 |
| ----------------- | --------- | ------------------------------ | ------------------------ |
| profile_id        | integer   | PRIMARYKEY AUTTOINCREMENT INDEX| プロフィールユーザーID |
| user_id           | integer   | INDEX                          | 紐づいているルートユーザーID |
| email             | string    |                                | メールアドレス |
| is_display_email  | boolean   |                                | メールアドレスをプロフィールに表示するか |
| phone_number      | string|                                | 電話番号 |
| profile_name      | string    |                                | プロフィール名 |
| is_custom_profile_img|boolean |                                | プロフィール画像をカスタマイズされているか |
| profile_comments  | string    |                                | プロフィールコメント |
| notification_status| integer  |                                | 通知ステータス |
| custom_status_emoji| string   |                                | カスタムステータス絵文字 |
| custom_status_text | string   |                                | カスタムステータスメッセージ |

### `notification_status`
- 0: すべて通知
- 1: メンションのみ通知
- 2: 通知しない

## meethat_workspcaes
ワークスペーステーブル

| column            |   type    | 制約                           | 備考 |
| ----------------- | --------- | ------------------------------ | ------------------------ |
| workspace_id      | integer   | PRIMARYKEY AUTTOINCREMENT INDEX| ワークスペースID |
| name              | string    | INDEX                          | ワークスペース名 |
| owner_profile_id  | integer   | INDEX                          | ワークスペースのオーナー |
| created_at        | timestamp |                                | ワークスペースの作成日時 |

## meethat_workspace_members
チャンネルテーブル

| column            |   type    | 制約                           | 備考 |
| ----------------- | --------- | ------------------------------ | ------------------------ |
| workspace_id      | integer   | PRIMARYKEY INDEX               | ワークスペースID |
| profile_id        | integer   | PRIMARYKEY INDEX               | ユーザーID |

## meethat_channels
チャンネルテーブル

| column            |   type    | 制約                           | 備考 |
| ----------------- | --------- | ------------------------------ | ------------------------ |
| channel_id        | integer   | PRIMARYKEY AUTTOINCREMENT INDEX| チャンネルID |
| name              | string    | INDEX                          | チャンネル名 |
| created_at        | timestamp |                                | チャンネルの作成日時 |
| type              | integer   |                                | チャンネルの種類 |
| visibility        | integer   |                                | チャンネルの可視性 |
| workspace_id      | integer   |                                | ワークスペースID |

### `type`
チャンネルの種類を示し、0ならテキストチャンネル、1ならボイスチャンネルを示します。

### `visibility`
チャンネルの可視性を示します。0ならパブリック、1ならパーティシペーション、2ならプライベートを示します。


## meethat_channel_members
チャンネルに参加しているユーザーチャンネル<br>
パブリック、パーティシペーション、プライベートのどれであってもこのテーブルに追加します。<br>
パブリックならワークスペースへの参加時にこのテーブルにレコードを追加する。<br>

| column            |   type    | 制約                           | 備考 |
| ----------------- | --------- | ------------------------------ | ------------------------ |
| channel_id        | integer   | PRIMARYKEY INDEX               | チャンネルID |
| profile_id        | integer   | PRIMARYKEY INDEX               | ユーザーID |


## meethat_chats
チャンネルでのチャットテーブル

| column            |   type    | 制約                           | 備考 |
| ----------------- | --------- | ------------------------------ | ------------------------ |
| chat_id           | integer   | PRIMARYKEY AUTTOINCREMENT INDEX| チャットID |
| content        | string   |                           | メッセージ |
| channel_id        | integer   | INDEX                          | チャンネルID |
| profile_id        | integer   | INDEX                          | ユーザーID |
| created_at        | timestamp | INDEX                          | 投稿日時 |
| updated_at        | timestamp |                                | 最終アップデート日時 |
| is_attachments    | boolean   |                                | 添付ファイルを含むか |
| is_embed          | boolean   |                                | エンベッドを含むか |
| replay_to_chat_id | integer   |                                | リプライ先のチャットID |
| thread_origin_chat_id |integer|                                | スレッド元のチャットID |
| is_thread_released| boolean   |                                | チャンネル全体に投稿されるスレッドか |

## meethat_chat_attachments
チャットの添付ファイルテーブル

| column            |   type    | 制約                           | 備考 |
| ----------------- | --------- | ------------------------------ | ------------------------ |
| attachment_id     | integer   | PRIMARYKEY AUTTOINCREMENT INDEX| 添付ファイルID |
| chat_id           | integer   | INDEX                          | チャットID |
| original_file_name| string    |                                | 元のファイル名 |

## meethat_meeting_events
ビデオミーティングテーブル

| column            |   type    | 制約                           | 備考 |
| ----------------- | --------- | ------------------------------ | ------------------------ |
| meeting_id        | integer   | PRIMARYKEY AUTTOINCREMENT INDEX| ミーティングID |
| channel_id        | integer   | INDEX                          | チャンネルID（0が代入されているときはチャンネルなし） |
| original_file_name| string    |                                | 元のファイル名 |

## meethat_meeting_participants
ビデオミーティングの参加予定者テーブル
| column            |   type    | 制約                           | 備考 |
| ----------------- | --------- | ------------------------------ | ------------------------ |
| meeting_id        | integer   | PRIMARYKEY INDEX               | ミーティングID |
| profile_id        | integer   | PRIMARYKEY INDEX               | ユーザーID |
| original_file_name| string    |                                | 元のファイル名 |