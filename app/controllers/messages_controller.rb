class MessagesController < ApplicationController
  
  def index
    @messages = Message.includes(:group).find(params[:group_id])
  end

  def create
    if Message.create(message_params)
      # 成功時
    else
      # 失敗時
    end
  end

  private
  def message_params
    params.permit(:content, :image).merge(username: current_user.name)
  end


end
