json.(@message, :content, :image)
json.created_at @message.created_at
json.user_name @message.user.name
json.id @message.id
json.group_id @message.group_id
json.user_id @message.user_id
