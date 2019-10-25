$(document).ready(function() {

  function buildHTML(data) {
    let html = `<div class="chat-message">
                  <div class="chat-massage__upper-content">
                    <p class="chat-message__upper-content__user-name">
                      ${data.user_name}
                    </p>
                    <p class="chat-message__upper-content__date">
                      ${data.created_at}
                    </p>
                  </div>
                  <p class="chat-message__message">
                    ${data.content}
                  </p>
                  <img src=${data.image}>
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
      });

    });
  });
});
