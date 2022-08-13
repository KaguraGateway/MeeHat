# MeeHat WebAPI Accountドキュメント(v1)
## `/api/v1/accounts/change-password`
### POST
パスワードを変更するAPIです。
```json
{
    "reCaptchaKey": "",
    "currentPassword": "",
    "newPassword": ""
}
```

## `/api/v1/accounts/change-email`
### GET
メールアドレスを変更するAPIです。
```json
{
    "reCaptchaKey": "",
    "newEmail": ""
}
```

## `/api/v1/accounts`
### DELETE
自身のルートアカウントを削除します。<br>
注意：ルートアカウントを削除すると、ワークスペースアカウントも同時に削除されます。
```json
{
    "reCaptchaKey": ""
}
```