$(document).ready(function () {
  const dict = {};
  let users;
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
  // request users
  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/users/',
    dataType: 'json',
    success: function (data) {
      users = data;
    },
    error: function () {
      $('DIV#api_status').removeClass('available');
    }
  });
  // request places
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    dataType: 'json',
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
      for (const place of data) {
        $('.places').append(`
          <article>
            <div class="title">
                <h2>${place.name}</h2>
                <div class="price_by_night">
                    ${place.price_by_night}
                </div>
            </div>
            <div class="information">
                <div class="max_guest">
                    <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                    <br />
                    ${place.max_guest} Guests
                </div>
                <div class="number_rooms">
                    <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                    <br />
                    ${place.number_rooms} Bedrooms
                </div>
                <div class="number_bathrooms">
                    <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                    <br />
                    ${place.number_bathrooms} Bathroom
                </div>
            </div>
            <div class="user">
              <strong>Owner: 
                ${users.find(user => (user.id === place.user_id)).first_name}
                ${users.find(user => (user.id === place.user_id)).last_name}
              </strong>
            </div>
            <div class="description">
                ${place.description}
            </div>
          </article>
          `);
      }
    },
    error: function () {
      $('DIV#api_status').removeClass('available');
    }
  });
  // search button
  $('button').click(function () {
    const amens = Object.values(dict);
    $('.places').empty();
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: amens }),
      success: function (data) {
        for (const place of data) {
          $('.places').append(`
            <article>
              <div class="title">
                  <h2>${place.name}</h2>
                  <div class="price_by_night">
                      ${place.price_by_night}
                  </div>
              </div>
              <div class="information">
                  <div class="max_guest">
                      <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                      <br />
                      ${place.max_guest} Guests
                  </div>
                  <div class="number_rooms">
                      <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                      <br />
                      ${place.number_rooms} Bedrooms
                  </div>
                  <div class="number_bathrooms">
                      <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                      <br />
                      ${place.number_bathrooms} Bathroom
                  </div>
              </div>
              <div class="user">
                <strong>Owner: 
                  ${users.find(user => (user.id === place.user_id)).first_name}
                  ${users.find(user => (user.id === place.user_id)).last_name}
                </strong>
              </div>
              <div class="description">
                  ${place.description}
              </div>
            </article>
            `);
        }
      }
    });
  });
  // uncheck checkbox after reload the DOM
  $(':checkbox').prop('checked', false);
});
