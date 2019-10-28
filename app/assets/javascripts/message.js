$(function() {

  function buildHTML(data) {

    let imgTag;
    data.image.url !== null?imgTag = `<img src=${data.image.url} >`:imgTag = '';
    
    let createdAtObj = new Date(data.created_at);
    let createdAtStr = `${createdAtObj.getFullYear()}/${createdAtObj.getMonth() + 1}/${createdAtObj.getDate()} ${createdAtObj.toLocaleTimeString()}`

    let html = `<div class="chat-message" data-message-id=${data.id}>
                  <div class="chat-massage__upper-content">
                    <p class="chat-message__upper-content__user-name">
                      ${data.user_name}
                    </p>
                    <p class="chat-message__upper-content__date">
                      ${createdAtStr}
                    </p>
                  </div>
                  <p class="chat-message__message">
                    ${data.content}
                  </p>
                  ${imgTag}
                </div>`;
    
    return html;

  }

  $('#new_message').on('submit', function(e) {
    $('.chat-input-form-container__form--btn').attr('disabled');
    e.preventDefault();
    let formData = new FormData(this);
    let url = window.location.href
    $.ajax({
      url: url,
      method: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-messages').append(html);
      $('#new_message')[0].reset();
      $('.chat-input-form-container__form--btn').removeAttr('disabled');
      $('.chat-content-container').animate({ 
        scrollTop: $('.chat-messages').height()
      }, 100);
    })
    .fail(function() {
      alert('エラーが発生しました');
    })
  });


  let reloadMessages = function() {

    let last_message_id = $(document).find('.chat-message:last').data('message-id');
    
    console.log(`last_message_id: ${last_message_id}`);

    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: { id: last_message_id }
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        messages.forEach(function(message) {
          let html = '';
          html = buildHTML(message);      
          $('.chat-messages').append(html);
        });

        $('.chat-content-container').animate({
          scrollTop: $('.chat-messages').height()
        }, 100);

      } else {
        console.log('no new message'); 
      }

    })
    .fail(function() {
      alert('自動更新に失敗しました');
    })

  };


  let currentPath = location.pathname;
  let flagToTriggerReload = currentPath.match('groups/[0-9]+/messages') ? true : false ;
  if (flagToTriggerReload) {

    setInterval(reloadMessages, 5000); 

  }; 


});
