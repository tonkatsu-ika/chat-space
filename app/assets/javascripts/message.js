$(document).ready(function() {

  
  $('#new_message').on('submit', function() {
    let formData = new FormData(this);
    let url = window.location.href
    console.log(url);
    $.ajax({
      url: url,
      method: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  });
});
