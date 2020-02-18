
$(document).ready(function () {
  const dict = {};
  $('input[type=checkbox]').click(function () {
    if ($(this).is(':checked')) {
      dict[$(this).data('name')] = $(this).data('id');
    } else {
      delete dict[$(this).data('name')];
    }
    const element = $(this).closest('.amenities').find('h4');
    const list = Object.keys(dict);
    if (list.length > 0) {
      element.text(list);
    } else {
      element.text('');
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    dataType: 'json',
    Content-Type: 'application/json',
    data: '{}'
    success: function (data) {
      console.log(data)
      $('DIV#api_status').addClass('available');
    },
    error: function () {
      $('DIV#api_status').removeClass('available');
    }
  });
});
