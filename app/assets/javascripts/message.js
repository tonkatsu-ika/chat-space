$(document).ready(function() {

  
  $('#new_message').on('submit', function(e) {
    e.preventDefault;
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
  });
});
