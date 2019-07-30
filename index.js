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
  $( function() {
    $( "#check-list" ).sortable();
    $( "#check-list" ).disableSelection();
  } );

  //Add new items from text input box to list as new <li>
	$('#add-btn').click(function() {
		var newInput = document.getElementById('new-item').value;
		$('#check-list').prepend('<li class="list-item"><i class="fas fa-sort"></i> ' + newInput + '</li>');
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


  //Begin new recipe <ul> with title <li> including input for recipe ingredients as additional <li>
  $('#start-btn').click(function() {
    var newRecipe = document.getElementById('new-recipe').value;
    console.log(newRecipe);
    $('#recipe-body').prepend('<ul class="recipe-list" id="' + newRecipe + '-list"><li class="recipe-name recipe-item">' + newRecipe + '<span class="rec-input"><input type="text" id="' + newRecipe + '-item" placeholder="Add an item"><button class="rec-btn">Add</button></span></li></ul>');
  });

  //Add new recipe item from text input as <li>
  $('.rec-btn').click(function() {
    var newRecipe = document.getElementById('new-recipe').value;
    var newRecInput = document.getElementById('#' + newRecipe + '-item').value;
    console.log(newRecipe);
		$('#' + newRecipe + '-list').prepend('<li class="recipe-item list-item"><i class="fas fa-sort"></i> ' + newRecInput + '</li>');
  });

});