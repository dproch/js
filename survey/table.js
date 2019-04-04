const questions = "http://aniksa.github.io/js/survey/data.json";
class QuestionAnswer{
    constructor(data, table, answer){
       // this.question = document.createElement("p");
        let tr = `<tr><td colspan="2">${data["question"]}</td></tr>`;
        table.innerHTML+=tr;

        this.answers=[];
        for (let i=0; i < data["answers"].length; i++){
            tr = `<tr><td>${data["answers"][i]}</td><td>${answer[i]}</td></tr>`;
            table.innerHTML += tr;
        }
    }
}

const app = {
    table : document.getElementById('results'),
    max: 4, //max number of options
    init(data){
        const table = document.getElementById('results');
        const ref = firebase.database().ref();
        ref.once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                //let childKey = childSnapshot.key;
                let childData = childSnapshot.val();
                table.innerHTML += `<tr><td colspan="2" class="project-name">${childData["name"]}</td></tr>`;
                table.innerHTML += `<tr><td colspan="2" class="project-product">${childData["product"]}</td></tr>`;
                for (let i=0; i<data["questions"].length; i++){
                    new QuestionAnswer(data["questions"][i], table, childData.answers[i]);
                }
            });
        });
    }
};

fetch(questions).then(response=> {return response.json();})
    .then(data => {app.init(data);})
    .catch(err => { console.log(err);});