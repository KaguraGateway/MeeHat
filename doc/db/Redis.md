# MeeHat Redisドキュメント
RedisではRailsのセッション管理も行います。<br>
| DB INDEX          |   備考 |
| ----------------- | ------ |
| 0                 | セッション管理 |
| 1                 | Railsキャッシュ |
| 2                 | meehat_voicechat |
| 3                 | Active Cable |

## meehat_voicechat
ボイスチャンネル・ビデオミーティングに関係するKVS
```
{
    // 現在ボイスチャンネル中のチャンネルリスト
    "current_voicechat_channels": {
        "[channel_id]": {
            "members": [
                user_id,
                user_id,
                user_id,
                user_id...
            ]
        }
    },
    // 現在ビデオミーティング中リスト
    "current_meeting_channels": {
        "[meeting_id]": {
            "members": [
                user_id,
                user_id,
                user_id,
                user_id...
            ]
        }
    },
    // 現在ボイスチャンネル・ビデオミーティング中のユーザーリスト
    "current_webrtc_users": {
        "[user_id]": {
            "channel_id": integer, // チャンネルID
            "meeting_id": integer, // ミーティングID（チャンネルIDとミーティングIDのどちらかだけが存在）
            "is_muted": boolean,
            "is_speaker_muted": boolean,
            "is_screen_sharing": boolean,
            "is_video": boolean,
        }
    }
}
```