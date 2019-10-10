# README

# DB設計

## messages table

|Field|Type|Key|Options|
|---|:---:|:---:|---|
|id|integer|pk|null: false, unique: true, index: true|
|body|text||null: false|
|image|string||null: false|
|group_id|integer|fk|null: false|
|user_id|integer|fk|null: false|

## Association
- belongs_to :group
- belongs_to :user


