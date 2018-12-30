//data
var thoughts = [];
var editMode = false;
var thoughtSelected;
//methods
function create(){
	if (checkCreate()) {
		var thoughtText = document.getElementById('input-thought-create').value;
		var date = getDate();
		thoughts.push({thought: thoughtText, date: date});
		localStorage.setItem('crud-js-localstorage', JSON.stringify(thoughts));
		read();
	}
	document.getElementById('input-thought-create').value = '';
}//end create
function read(){
	var thoughtList = document.getElementById('thought-list');
	thoughtList.innerHTML = '';
	let datesDB = JSON.parse(localStorage.getItem('crud-js-localstorage'));
    if (datesDB === null) {
        thoughts = [];
    }else{
        thoughts = datesDB;
    }
	thoughts.forEach(function(element,index){
		thoughtList.innerHTML +=
		'<div class="card-body">'+
			'<h5 class="card-title">'+element.date+'</h5>'+
			'<p class="card-text">'+element.thought+'</p>'+
			'<div id="btn-edit" class="btn btn-warning" onclick="edit('+index+')">edit</div>'+
			'<div id="btn-delete" class="btn btn-danger" onclick="deleter('+index+')">delete</div>'+
		'</div>';
	});
}//end read
function edit(index){
	thoughtSelected = index;
	editMode = true;
	updateViews();
}//end edit
function update(){
	if (checkUpdate()) {
		var date = getDate();
		thoughts[thoughtSelected] = {
			thought: document.getElementById('input-thought-update').value,
			date: date
		}
		localStorage.setItem('crud-js-localstorage', JSON.stringify(thoughts));
		editMode = false;
	}
	read();
	updateViews();
	document.getElementById('input-thought-update').value = '';
}//end update
function deleter(index){
	thoughtSelected = index;
	thoughts.splice(thoughtSelected, 1);
	localStorage.setItem('crud-js-localstorage', JSON.stringify(thoughts));
	read();
}//end deleter
function getDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();
	if (dd < 10){
	  dd = '0' + dd;
	} 
	if (mm < 10) {
	  mm = '0' + mm;
	} 
	var today = dd + '/' + mm + '/' + yyyy;
	return today;
}//end getDate
function checkCreate(){
	if (document.getElementById('input-thought-create').value != '') {
		return true;
	}else{
		return false;
	}
}//end checkCreate
function checkUpdate(){
	if (document.getElementById('input-thought-update').value != '') {
		return true;
	}else{
		return false;
	}	
}//end checkUpdate
function updateViews(){
	if (editMode) {
		document.getElementById('input-thought-update').value = thoughts[thoughtSelected].thought;
		document.getElementById('create-thought').style = 'display: none';
		document.getElementById('update-thought').style = 'display: block';
		document.getElementById('thought-list').style = 'display: none';
	}else{
		document.getElementById('input-thought-update').value = '';
		document.getElementById('create-thought').style = 'display: block';
		document.getElementById('update-thought').style = 'display: none';
		document.getElementById('thought-list').style = 'display: block';
	}
}//end updateViews
//mounted
window.onload = function(){
	read();
	updateViews();
}//end mounted