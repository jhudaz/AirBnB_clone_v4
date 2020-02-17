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
});
