$(document).ready(function() {
	//Starter list
  var groceries = [ 'Milk', 'Apples', 'Cereal', 'Bread' ];
  var dialog, form;
  
  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#27;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };
  
  function escapeHtml(string) {
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
      return entityMap[s];
    });
  }

	//Add item from array to <ul> as <li>
	$('#check-list').each(function(i) {
		for (var x = 0; x < groceries.length; x++) {
      var item = escapeHtml(groceries[x]);
			$(this).append('<li class="list-item"><i class="fas fa-sort sort-icon"></i><span> ' + item + ' </span><i class="fas fa-edit edit-icon"></i><i class="fas fa-trash-alt trash-icon"></i></li>');
		}
  });

  
	//On click of list item, add cross-off style and move to bottom of list, or uncross and move back to top
  $('.list-item').bind('click', function(e) {
		if ($(this).hasClass('strike')) {
			$(this).removeClass('strike');
			$('#check-list').prepend(this);
		} else {
			$(this).addClass('strike');
			$('#check-list').append(this);
		}
  })

  $('.edit-icon').click(function(e) {
    e.stopPropogation();
  })

	/*$(document).on('click', '.list-item *:not(.edit-icon)', function() {
		if ($(this).hasClass('strike')) {
			$(this).removeClass('strike');
			$('#check-list').prepend(this);
		} else {
			$(this).addClass('strike');
			$('#check-list').append(this);
		}
  });*/
  
  //Add new item to main list, taking value from input and prepending to start of main list
  $('#new-item').keypress(function(event) {
    if(event.which === 13 && $(this).val()) {
      var newItem = $(this).val();
      $(this).val('').attr('placeholder', 'Add an item');
      $('#check-list').prepend('<li class="list-item"><i class="fas fa-sort"></i><span> ' + newItem + '</span><i class="fas fa-edit edit-icon"></i><i class="fas fa-trash-alt trash-icon"></i></li>');
    }
  });
  
  //Start new recipe list on keypress, taking recipe name from input and appending as a new <ul> with input value as part of id, as header of new <ul>, and as part of new <input> id
  $('#new-recipe').keypress(function(event) {
    if (event.which === 13 && $(this).val()) {
      var newRecipe = $(this).val();
      $(this).val('').attr('placeholder', 'Add new recipe');
      $('#recipe-body').append(
        '<ul class="recipe-list" id="' +
          newRecipe +
          '-list"><i class="fas fa-lg fa-caret-down recipe-toggle-icon"></i><i class="fas fa-folder-plus add-recipe-icon"></i><i class="fas fa-trash-alt trash-icon"></i><h3 class="recipe-name"><span> ' +
          newRecipe +
          '</span></h3><input type="text" id="' +
          newRecipe +
          '-item" class="recipe-input toggle-recipe" placeholder="Add an ingredient"> </ul>'
      );
      newRecipe.val = '';
    }
  });
  
  //Add new item to individual recipe on keypress, taking value from input and appending as a child <li>
  $(document).on('keypress', '.recipe-input', function(event) {
    if (event.which === 13 && $(this).val()) {
      var newRecItem = $(this).val();
      $(this).val('').attr('placeholder', 'Add an ingredient');
      console.log(newRecItem);
      $(this).closest('ul').append('<li class="recipe-item toggle-recipe"><i class="fas fa-sort"></i><span> ' + newRecItem + '</span><i class="fas fa-edit edit-icon"></i><i class="fas fa-plus-circle add-rec-item-icon"></i><i class="fas fa-trash-alt trash-icon"></i></li>');
    }
    $(this).closest('ul').sortable({items: 'li:not(.recipe-name)'}).disableSelection();
  });

  //On click of icon, add all incredients of recipe to the main shopping list, filtering for <li> from <ul>, and removing recipe item classes & add icon
  $(document).on('click', '.add-recipe-icon', function() {
    var recLi = $(this).closest('ul').contents().filter('li');
    $(recLi).clone().prependTo('#check-list').removeClass('recipe-item').addClass('list-item').contents().filter('.add-rec-item-icon').remove();
  });

  //On click of icon, add single recipe item to the main shopping list, removing recipe item class & add icon
  $(document).on('click', '.add-rec-item-icon', function() {
    var recItem = $(this).parent();
    $(recItem).clone().prependTo('#check-list').removeClass('recipe-item').addClass('list-item').contents().filter('.add-rec-item-icon').remove();
  });

  //On click of icon, delete item with fadeout
  $(document).on('click', '.trash-icon', function() {
    $(this).parent().fadeOut(350, function(){
      $(this).remove();
    });	
  });

  //On click of recipe name (ideally icon), toggle hide/show recipe items
  $(document).on('click', '.recipe-toggle-icon', function() {
    $(this).siblings('.toggle-recipe').slideToggle();
    $(this).toggleClass('fa-caret-right fa-caret-down');
  });

  
	//Make main shopping list sortable
	$(function() {
    $('#check-list').sortable().disableSelection();
  });

  //Function to edit item from modal
  function editItem() {
    var valid = true;
    $('#edit-item-input').val() = $(this).siblings('span').text();
  }

  //Create modal dialog box
  dialog = $('#dialog-form').dialog({
    autoOpen: false,
    height: 200,
    width: 300,
    modal: true,
    buttons: {
      'Done': editItem,
      Cancel: function() {
        dialog.dialog('close');
      }
    },
    close: function() {
      form[0].reset();
    }
  });
  form = dialog.find('form').on('submit', function(e) {
    e.preventDefault();
    editItem();
  })
  $(document).on('click', '.edit-icon', function() {
    dialog.dialog('open');
  });


});

