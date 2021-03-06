class MessagesController < ApplicationController
  
  def index
    @message = Message.new
    @group = Group.find(params[:group_id])
    @messages = @group.messages.includes(:user)
    @groups = current_user.groups.includes(:messages)
  end

  def create
    @group = Group.find(params[:group_id])
    @message = @group.messages.new(message_params)

    if @message.save
      respond_to :json
    else
      redirect_to root_path
    end
  end

  private
  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id).merge(group_id: :group_id)
  end


end
