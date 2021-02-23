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

const checkList = document.getElementById('check-list');
const newItem = document.getElementById('new-item');
const newRecipe = document.getElementById('new-recipe');
const recipeBody = document.getElementById('recipe-body');
var listItem = document.querySelectorAll('.list-item');

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
    })
}

function addNewItem(item) {
    item = escapeHtml(item);
    var li = groceryLiOpen + item + groceryLiClose;
    var documentFragment = range.createContextualFragment(li);
    checkList.appendChild(documentFragment);
}

newItem.addEventListener('keydown', inputNewItem);

function inputNewItem(e) {
    if (e.code === 'Enter') {
        console.log('enter');
        groceries.push(newItem.value);
        addNewItem(newItem.value);
        newItem.value = '';
    }
    console.log(groceries);
}

groceryList(groceries);

function handleItem() {
    Array.from(document.querySelectorAll('.list-item')).forEach((item) => {
        item.addEventListener('click', function handleClick(e) {
            console.log(e.target);
            if (e.target.classList.contains('strike')) {
                e.target.classList.remove('strike');
                checkList.prepend(e.target);
            } else {
                e.target.classList.add('strike');
                checkList.append(e.target);
            }
        });
    })
}

handleItem();


//document.addEventListener('DOMContentLoaded', inputNewItem);