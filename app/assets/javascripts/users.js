$(document).ready(function() {

  $.fn.addHTMLWhenNoUser = function(){
    
    var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">一致するユーザーが見つかりません</p>
                </div>
               `;
    
    this.append(html);

  }

  $.fn.addHTMLWhenWithUsers = function(user){
    
    var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                </div>
               `;

    this.append(html);

  }

  $('#user-search-field').on('keyup', function() {
    let input = $(this).val();

    $.ajax ({
      url: '/users',
      method: 'GET',
      data: input,
      dataType: 'json',
      processData: false,
    })
    .done(function(users) {
      
      $('#user-search-result').empty();

      if (users.length === 0) {
        
        $('#user-search-result').addHTMLWhenNoUser();

      } else {

        users.forEach(function(user) {

          $('#user-search-result').addHTMLWhenWithUsers(user);

        });

      }

    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    })

  });


  $(document).on('click', '.user-search-add', function() {

    let userId = $(this).attr('data-user-id');
    let userName = $(this).attr('data-user-name');
   
    $.fn.addHTMLToMemberList = function(userId, userName) {

      let html = `
                  <div class="chat-group-user clearfix js-chat-member" id="chat-group-user-${userId}">
                    <input name="group[user_ids][]" type="hidden" value=${userId}>
                    <p class="chat-group-user__name">${userName}</p>
                    <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                  </div>
                 `
      $(this).append(html);

    };

    $('.js-add-user').addHTMLToMemberList(userId, userName);
    $(this).parent().remove();

  });

  $(document).on('click', '.js-remove-btn', function(e) {
    e.preventDefault();
    $(this).parent().remove();
  });

});
