//listen for form submit button
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {

	//get value from siteName
	var siteName = document.getElementById('siteName').value;
	//console.log(siteName);

	//get value from siteURL
	var siteURL = document.getElementById('siteURL').value;
	//console.log(siteURL);

	if(!validateForm(siteName,siteURL)){
		return false;
	}
	
	var bookmark = {
		name: siteName,
		url: siteURL
	}

	//console.log(bookmark);

	//test if bookamrk is null
	if(localStorage.getItem('bookmarks') === null){
		//Initialize array
		var bookmarks = [];
		//add to array
		bookmarks.push(bookmark);
		//set to local Storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
	else{
		//get bookmarks from local storage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// add bookmark to array
		bookmarks.push(bookmark);
		//re-set back to local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	//clear form
	document.getElementById('myForm').reset();

	//re=fetch bookmarks
	fetchBookmarks();

	//to prevent from flashing
	e.preventDefault();
}

function deleteBookmark(url){
	//get bookmark from local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// loop through bookmarks
	for (var i = 0; i < bookmarks.length; i++) {
		if(bookmarks[i].url == url){
			//remove from array
			bookmarks.splice(i,1);
		}
	}
	//re-set back to local storage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	//re=fetch bookmarks
	fetchBookmarks();
}	

function fetchBookmarks(){
	//get bookmarks from local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//get output id
	var bookmarksResults = document.getElementById('bookmarksResults');

	//build output
	bookmarksResults.innerHTML = '';
	for (var i = 0; i <bookmarks.length; i++) {
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="jumbotron">'+
									  '<h3>'+name+
									  '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
									  '<a onClick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'
									  '</h3>'+
									  '</div>';	
	}
}

function validateForm(siteName, siteURL){

	if(!siteName || !siteURL){
		alert('Please fill the details required below.');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteURL.match(regex)){
		alert('Enter a valid URL');
		return false;
	}
	return true;
}