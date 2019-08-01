$(document).ready(function() {
	//Starter list
	var groceries = [ 'Milk', 'Apples', 'Cereal', 'Bread' ];

	//Add item from array to <ul> as <li>
	$('#check-list').each(function(i) {
		for (var x = 0; x < groceries.length; x++) {
			$(this).append('<li class="list-item"><i class="fas fa-sort"></i> ' + groceries[x] + '</li>');
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
  
  //Add new item to list on keypress
  $('#new-item').keypress(function(event) {
    if(event.which === 13) {
      var newItem = $(this).val();
      $(this).val('').attr('placeholder', 'Add new item');
      $('#check-list').prepend('<li class="list-item"><i class="fas fa-sort"></i> ' + newItem + '</li>');
    }
  });
  
  //Start new recipe list on keypress, with recipe name and individual input
  $('#new-recipe').keypress(function(event) {
    if (event.which === 13) {
      var newRecipe = $(this).val();
      $(this).val('').attr('placeholder', 'Add new recipe');
      $('#recipe-body').append(
        '<ul class="recipe-list" id="' +
          newRecipe +
          '-list"><h3 class="recipe-name"> ' +
          newRecipe +
          '<i class="fas fa-folder-plus add-recipe-icon"></i></h3><input type="text" id="' +
          newRecipe +
          '-item" class="rec-input" placeholder="Add an item"> </ul>'
      );
    }
  });
  
  //Add new item to individual recipe on keypress
  $(document).on('keypress', '.rec-input', function(event) {
    if (event.which === 13) {
      var newRecItem = $(this).val();
      $(this).val('').attr('placeholder', 'Add new item');
      console.log(newRecItem);
      $(this).closest('ul').append('<li class="recipe-item"><i class="fas fa-sort"></i> ' + newRecItem + '<i class="fas fa-plus-circle add-rec-item-icon"></i></li>');      
    }
    $(this).closest('ul').sortable({items: 'li:not(.recipe-name)'}).disableSelection();
  });

  //On click of icon, add all incredients of recipe to the main shopping list, filtering for <li> from <ul> and removing recipe item classese
  $(document).on('click', '.add-recipe-icon', function() {
    var recLi = $(this).closest('ul').contents().filter('li');
    $(recLi).clone().appendTo('#check-list').removeClass('recipe-item').addClass('list-item').contents().filter('.add-rec-item-icon').remove();
  });

  //On click of icon, add single recipe item to the main shopping list, removing recipe item class & add icon
  $(document).on('click', '.add-rec-item-icon', function() {
    var recItem = $(this).closest('li');
    $(recItem).clone().appendTo('#check-list').removeClass('recipe-item').addClass('list-item').contents().filter('.add-rec-item-icon').remove();
  });
  
	//Make list sortable
	$(function() {
    $('#check-list').sortable().disableSelection();
  });


});
