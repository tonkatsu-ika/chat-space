document.addEventListener('turbolinks:load', function() {

  $('#user-search-field').on('keyup', function() {
    let input = $(this).val();
    
    $.ajax ({
      url: 'http://localhost:3000/users',
      method: 'GET',
      data: input,
      dataType: 'json',
      processData: false,
    })
    .done(function() {
      console.log('success');
    })
    .fail(function() {
      console.log('fail');
    })

  });

});
