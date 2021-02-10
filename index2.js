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
	return String(string).replace(/[&<>"'`=\/]/g, function(s) {
		return entityMap[s];
	});
}

var checkList = document.getElementById('check-list');
var newItem = document.getElementById('new-item');
var newRecipe = document.getElementById('new-recipe');
var recipeBody = document.getElementById('recipe-body');


//Starter list
var groceries = [ 'Milk', 'Apples', 'Cereal', 'Bread' ];

var groceryLiOpen = `<li class="list-item"><i class="fas fa-sort sort-icon"></i>`;
var groceryLiClose = `<i class="fas fa-edit edit-icon"></i><i class="fas fa-trash-alt trash-icon"></i></li>`;

var range = document.createRange();

function groceryList(arr) {
    arr.forEach(function(item) {
        item = escapeHtml(item);
        var li = groceryLiOpen + item + groceryLiClose;
        var documentFragment = range.createContextualFragment(li);
        checkList.appendChild(documentFragment);
        //documentFragment.addEventListener('click', handleClick);
    })
}

groceryList(groceries);

