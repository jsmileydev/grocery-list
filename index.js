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
		$('#check-list').sortable();
		$('#check-list').disableSelection();
	});

	//Add new items with keypress from list body input box to list
	$('#new-item').keypress(function(event) {
		if (event.which === 13) {
      var newItem = $(this).val();
      $('#new-item').val('');
			$('#new-item').attr('placeholder', 'Add new item');
			$('#check-list').prepend('<li class="list-item"><i class="fas fa-sort"></i> ' + newItem + '<i class="fas fa-times-circle fa-sm"></i></li>');
		}
  });

	//On click of list item, cross off and move to bottom of list, or uncross and move back to top
	$(document).on('click', '.list-item', function() {
		var item = $(this).closest('li');
    console.log(item);
		if ($(item).hasClass('strike')) {
			$(item).removeClass('strike');
			$('#check-list').prepend(item);
			//$('item > span').detach();
		} else {
			$(this).addClass('strike');
			$('#check-list').append(this);
			//$(this).append('<span class="remove"><i class="fas fa-times"></i></span>');
		}
	});

	//Begin new recipe <ul> with title <li> including input for recipe ingredients as additional <li>
	$('#start-btn').click(function() {
		var newRecipe = document.getElementById('new-recipe').value;
		console.log(newRecipe);
		$('#recipe-body').prepend(
			'<ul class="recipe-list" id="' +
				newRecipe +
				'-list"><li class="recipe-name recipe-item">' +
				newRecipe +
				'<span class="rec-input"><input type="text" id="' +
				newRecipe +
				'-item" placeholder="Add an item"><button class="rec-btn">Add</button></span></li></ul>'
		);
  });  
  
  //Begin new recipe with keypress from list body input
  $('#new-new').keypress(function(event) {
    if (event.which === 13) {
      var newRecipe = $(this).val();
      $('#new-new').val('');
			$('#new-new').attr('placeholder', 'Start new recipe');
      $('#recipe-body').prepend(
        '<ul class="recipe-list" id="' +
          newRecipe +
          '-list"><li class="recipe-name recipe-item">' +
          newRecipe +
          '<span class="rec-input"><input type="text" id="' +
          newRecipe +
          '-item" placeholder="Add an item"></span></li></ul>'
      );
    }
  });


});
