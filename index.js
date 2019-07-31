$(document).ready(function() {
	//Starter list
	var groceries = [ 'Milk', 'Apples', 'Cereal', 'Bread' ];

	//Add item from array to <ul> as <li>
	$('#check-list').each(function(i) {
		for (var x = 0; x < groceries.length; x++) {
			$(this).append('<li class="list-item"><i class="fas fa-sort"></i> ' + groceries[x] + '</li>');
		}
	});

	//Make list sortable
	$(function() {
		$('#check-list').sortable();
		$('#check-list').disableSelection();
	});
  
  //Add new item to 
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
			$(this > 'span').detach();
		} else {
			$(this).addClass('strike');
			$('#check-list').append(this);
			$(this).append('<span class="remove"><i class="fas fa-times"></i></span>');
		}
  });
  
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
  

});
