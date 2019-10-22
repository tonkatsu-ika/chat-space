class MessagesController < ApplicationController
  
  def index
    @message = Message.new
    @group = Group.find(params[:group_id])
    @messages = @group.messages.includes(:user)
  end

  def create
    binding.pry
    @group = Group.find(params[:group_id])
    @message = @group.messages.new(message_params)
   
    if @message.save
      # 成功時
      redirect_to group_messages_path
    else
      # 失敗時
      render index
    end
  end

  private
  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id).merge(group_id: :group_id)
  end


end
