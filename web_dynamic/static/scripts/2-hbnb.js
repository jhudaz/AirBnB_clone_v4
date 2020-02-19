$(document).ready(function () {
  const dict = {};
  $('input[type=checkbox]').click(function () {
    // all amenities
    if ($(this).is(':checked')) {
      dict[$(this).data('name')] = $(this).data('id');
    } else {
      delete dict[$(this).data('name')];
    }
    // set h4 with the amenities
    const element = $(this).closest('.amenities').find('h4');
    const list = Object.keys(dict).join(', ');
    if (list.length > 0) {
      element.text(list);
    } else {
      element.text('');
      element.append('<br/>');
    }
  });
  // request
  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    dataType: 'script',
    success: function () {
      $('DIV#api_status').addClass('available');
    },
    error: function () {
      $('DIV#api_status').removeClass('available');
    }
  });
  // uncheck checkbox after reload the DOM
  $(':checkbox').prop('checked', false);
});
