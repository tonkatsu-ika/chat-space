class MessagesController < ApplicationController
  
  def index

    @messages = Message.includes(:user).includes(:group)

  end

end
