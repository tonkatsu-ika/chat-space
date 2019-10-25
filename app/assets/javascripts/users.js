document.addEventListener('turbolinks:load', function() {

  $('#user-search-field').on('keyup', function() {
    let input = $(this).val();
    console.log(input);
  });

});
