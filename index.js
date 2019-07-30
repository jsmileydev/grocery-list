var groceries = [
  'Milk', 'Apples', 'Cereal', 'Bread'
];

$('#check-list').each(function(i) {
  for (var x = 0; x < groceries.length; x++) {
    $(this).append('<li class="list-item">' + groceries[x] + '</li>');
  }
})

$('#add-btn').click(function() {
  var newInput = document.getElementById('new-item').value;
  $('#check-list').prepend('<li class="list-item">' + newInput + '</li>');
})

$(document).on('click', '.list-item', function() {
  if ($(this).hasClass('strike')) {
    $(this).removeClass('strike');
    $('#check-list').prepend(this);
  } else {
    $(this).addClass('strike');
    $('#check-list').append(this);
  }
});