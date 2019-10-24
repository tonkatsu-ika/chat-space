require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do
    
    context 'signed_in' do
      before do
        login user
        get :index, params: { group_id: group.id }
      end


      it 'assings @message' do
        binding.pry
        expect(assigns(:message)).to be_a_new(Message)
      end

      it 'assigns @group' do
        expect(assigns(:group)).to eq(group)
      end

      it 'renders index' do
        expect(response).to render_template :index
      end
 
    end
  
    context 'singed_out' do
      before do
        get :index, params: { group_id: group.id }
      end

      it 'does not render the :index template' do
        expect(response).to redirect_to(new_user_session_path)
      end

    end

  end

end
