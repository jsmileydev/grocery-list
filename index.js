$(document).ready(function() {
	//Starter list
	var groceries = [ 'Milk', 'Apples', 'Cereal', 'Bread' ];

	//Add item from array to <ul> as <li>
	$('#check-list').each(function(i) {
		for (var x = 0; x < groceries.length; x++) {
			$(this).append('<li class="list-item"><i class="fas fa-sort"></i> ' + groceries[x] + '<i class="fas fa-times-circle"></i></li>');
		}
	});

	//Make list sortable
	$(function() {
    $('#check-list').sortable().disableSelection();
    $('.recipe-list').sortable().disableSelection();
	});
  
  //Add new item to list on keypress
  $('#new-item').keypress(function(event) {
    if(event.which === 13) {
      var newItem = $(this).val();
      $(this).val('').attr('placeholder', 'Add new item');
      $('#check-list').prepend('<li class="list-item"><i class="fas fa-sort"></i> ' + newItem + '</li>');
    }
  });

	//On click of list item, cross off and move to bottom of list, or uncross and move back to top
	$(document).on('click', '.list-item', function() {
		if ($(this).hasClass('strike')) {
			$(this).removeClass('strike');
			$('#check-list').prepend(this);
		} else {
			$(this).addClass('strike');
			$('#check-list').append(this);
		}
  });
  
  //Start new recipe list on keypress, with recipe name and individual input
  $('#new-recipe').keypress(function(event) {
    if (event.which === 13) {
      var newRecipe = $(this).val();
      $(this).val('').attr('placeholder', 'Add new recipe');
      $('#recipe-body').prepend(
        '<ul class="recipe-list" id="' +
          newRecipe +
          '-list"><li class="recipe-name recipe-item">' +
          newRecipe +
          '<span><input type="text" id="' +
          newRecipe +
          '-item" class="rec-input" placeholder="Add an item"></span></li></ul>'
      );
    }
  });
  
  //Add new item to individual recipe on keypress
  $(document).on('keypress', '.rec-input', function(event) {
    if (event.which === 13) {
      var newRecItem = $(this).val();
      $(this).val('').attr('placeholder', 'Add new item');
      console.log(newRecItem);
      $(this).closest('ul').append('<li class="recipe-item"><i class="fas fa-sort"></i> ' + newRecItem + '</li>');
    }
  });
  

});
