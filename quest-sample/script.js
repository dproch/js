function getQueryVariable(variable) //get a variable from url
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

//ссылка на базу данных
var db = firebase.database();
var page = getQueryVariable('p');
if (!page) page = 1;
//получим нужный нам список в бд (по его ключу)
var pageRef = db.ref(`quest/page${page}`);
var task = document.getElementsByClassName('task')[0];
var linkRef = pageRef.child('links');
//show();
function show(item){
	switch(item.key){
		case "title":
		case "text":
			task.getElementsByClassName(item.key)[0].innerHTML = item.val();
			break;	
		case "links": 
			showLinks(item.val()); 
			break;
	}
}

function showLinks(item){
	
	for (link in item){
		var elem =`<li><a href="index.html?p=${item[link]}">${link}</a></li>`;
		task.getElementsByClassName("links")[0].innerHTML+=elem;
		console.log(link+" "+item[link]);
	}
}

//добавление "слушателей" событий
//если в бд что-то добавили или изменили
pageRef.on('child_added', function (data) {
    show(data);
});
pageRef.on('child_changed', function (data) {
    show(data);
});

