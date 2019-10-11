# README

# DB設計

## messages table

|Field|Type|Key|Options|
|---|:---:|:---:|---|
|body|text|||
|image|string|||
|group_id|integer|fk|null: false|
|user_id|integer|fk|null: false|

### Association
- belongs_to :group
- belongs_to :user


## groups table

|Field|Type|Key|Options|
|---|:---:|:---:|---|
|name|string||null: false|

### Association
- has_many :users, through: :groups_users
- has_many :messages
- has_many :groups_users

## users table

|Field|Type|Key|Options|
|---|:---:|:---:|---|
|name|string||null: false|
|email|string||null: false|

### Association
- has_many :groups, through: :groups_users
- has_many :messages


## groups_users table

|Field|Type|Key|Options|
|---|:---:|:---:|---|
|group_id|integer|fk|null: false|
|user_id|integer|fk|null: false|

### Association
- belongs_to :group
- belongs_to :user

