document.addEventListener('turbolinks:load', function() {

  function buildHTML(data) {

    let imgTag;
    data.image.url !== null?imgTag = `<img src=${data.image.url} >`:imgTag = '';
    
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

  let ajaxProcessingFlag;
  
  $('#new_message').on('submit', function(e) {
    
    ajaxProcessingFlag = true;

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

      $('.chat-content-container').animate({ 
        scrollTop: $('.chat-messages').height()
      }, 100);

      $('.chat-input-form-container__form--btn').removeAttr('disabled');
    })
    .fail(function() {
      alert('エラーが発生しました');
    })
    .always(function() {
      ajaxProcessingFlag = false;
    })
  });


  let reloadMessages = function() {

    let last_message_id = $('.chat-message:last-child').data('messageId');

    let groupPath = location.href.search('/[0-9]+');
    let url = `groups${groupPath}/messages`;
    console.log(url);

    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      data: { id: last_message_id }
    })
    .done(function() {
      console.log('success');
    })
    .fail(function() {
      console.log('error');
    })

  };

  // to be deleted
  let fullPath = location.href;
  let testArg = `/groups/${fullPath.match('/[0-9]+')[0]}/messages`;

  
  console.log(testArg);
  

});
