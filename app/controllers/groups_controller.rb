class GroupsController < ApplicationController


  def new
    @group = Group.new
  end

  def create
    @group.create(group_params)
  end

  def edit
    binding.pry
    @group = Group.find(params[:id]).includes(:user)
  end

  def update
  end

  private
  def group_params
    params.permit(:name)
  end
end
