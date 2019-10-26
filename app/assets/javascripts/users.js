document.addEventListener('turbolinks:load', function() {

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
      url: 'http://localhost:3000/users',
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
    // data-user-idを取得する
    console.log('triggered');
    console.log(this);
    // 追加したユーザのHTMLを作る関数
    $.fn.addHTMLToMemberList = function(user) {

    };

    // ajax通信
    $.ajax ({

    })
    .done(function(user){

      $('').addHTMLToMemberList(user);

    })
    .fail(function(){
      alert("ユーザーの追加に失敗しました");
    })

  });

});
