document.addEventListener('turbolinks:load', function() {

  function buildHTML(data) {

    let imgTag = '';
    if (data.image.url !== null) { 
      imgTag = `<img src=${data.image.url} >`;
    }
    
    let createdAtObj = new Date(data.created_at);
    let createdAtStr = `${createdAtObj.getFullYear()}/${createdAtObj.getMonth() + 1}/${createdAtObj.getDate()} ${createdAtObj.toLocaleTimeString()}`

    let html = `<div class="chat-message">
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
      $('#message_content').val('');

      $('.chat-content-container').animate({ 
        scrollTop: $('.chat-messages').height()
      }, 100);

      $('.chat-input-form-container__form--btn').removeAttr('disabled');
    })
    .fail(function() {
      alert('エラーが発生しました');
    })
  });
});
