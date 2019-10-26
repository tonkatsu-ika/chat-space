document.addEventListener('turbolinks:load', function() {

  $.fn.addHTMLWhenNoUser = function(){
    
    var html = `<div>test</div>`;
    
    this.append(html);

    console.log('func no user called');
  }

  $.fn.addHTMLWhenWithUsers = function(user){
    
    console.log('func with user called');

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
      // emptyメソッドで一度検索結果をからにする
      console.log($('#user-search-field').val());

      $('#user-search-field').empty();
      
      console.log(`user # is ${users.length}`);

      if (users.length === 0) {
        console.log('no user');
        // ユーザゼロの場合の処理
        
        $('#user-search-result').addHTMLWhenNoUser();

      } else {
        // 各ユーザの処理
        users.forEach(function(user) {

          $('#user-search-result').addHTMLWhenWithUsers(user);

        });

      }

    })
    
    
    .fail(function() {
      console.log('fail');
    })

  });

});
