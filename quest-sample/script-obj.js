function getQueryVariable(variable) //get a variable from url
{
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i=0;i<vars.length;i++) {
        let pair = vars[i].split("=");
        if(pair[0] === variable){return pair[1];}
    }
    return(false);
}

//ссылка на базу данных
const db = firebase.database();

const page = {
    ref: db.ref(`quest/page${Math.max(1,getQueryVariable('p'))}`),
    task: document.getElementsByClassName('task')[0],
    show: function(item) {
        switch (item.key) {
            case "title":
            case "text":
                this.task.getElementsByClassName(item.key)[0].innerHTML = item.val();
                break;
            case "links":
                this.showLinks(item.val());
                break;
        }
    },
    showLinks: function(item){
        for (let link in item){
            this.task.getElementsByClassName("links")[0].innerHTML+= `<li><a href="index.html?p=${item[link]}">${link}</a></li>`;
        }
    }
};
//добавление "слушателей" событий
//если в бд что-то добавили или изменили
page.ref.on('child_added', function (data) {
    page.show(data);
});
page.ref.on('child_changed', function (data) {
    page.show(data);
});

