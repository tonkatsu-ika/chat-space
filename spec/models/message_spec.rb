require 'rails_helper'

RSpec.describe Message, type: :model do

  describe '#create' do

    context 'can save' do

      it "is posted with a content" do
        user = create(:user)
        group = create(:group)
        message = create(:message, image: nil, user_id: user.id, group_id: group.id)
  
        expect(message).to be_valid
  
      end
  
      it "is posted with an image" do
        user = create(:user)
        group = create(:group)
        message = create(:message, content: nil, user_id: user.id, group_id: group.id)
  
        expect(message).to be_valid
  
      end
  
      it "is posted with both a content and an image" do
        user = create(:user)
        group = create(:group)
        message = create(:message, user_id: user.id, group_id: group.id)
  
        expect(message).to be_valid
  
      end
  
    end
  
    context 'cannot save' do
  
      it "is not posted without both a content and an image" do
        user = create(:user)
        group = create(:group)
        message = build(:message, content: nil, image: nil, user_id: user.id, group_id: group.id)
        message.valid?
        expect(message.errors[:content]).to include("を入力してください")
      end
  
      it "is not postd without group_id" do
        user = create(:user)
        message = build(:message, group_id: nil, user_id: user.id)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end
  
      it "is not posted without user_id" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
  
    end

  end

end



