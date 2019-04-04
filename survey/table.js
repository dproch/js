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
    //score : [],
    max: 4, //max number of options
    //view: document.getElementById('result'),
    init(data){
       /* this.email = data["email"];
        document.body.children[0].textContent = data["title"];
        document.body.children[1].innerHTML = data["description"];*/
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
                //table.children[0].innerHTML+=`<tr><td>${childData.name}</td><td>${childData.email}</td></tr>`;
            });
        });

        //this.form.onsubmit = this.calculate.bind(this);
    },
    show(){
        this.view.innerHTML = '';
        for (let i = 0; i< this.score.length; i++){
            this.view.innerHTML += `${i+1}: ${this.score[i]}<br/>`;
        }
    },
    pushToDB() {
        // Firebase ref
        const ref = firebase.database().ref();
        let name = this.form.elements["project-name"].value;
        let product = this.form.elements["project-product"].value;
        let answers = [];
        let answersQ = [];
        for (let inp of this.form.elements){
            //let numAns = inp.dataset.idAnswer;//parseInt(inp.name.slice(-1,1));
            if (inp.hasAttribute('data-id-answer')) {
                let inc = 0;
                if (inp.type === "radio")
                    inc = (inp.checked)? 1 : 0;
                if (inp.type === 'text')
                    inc = parseFloat(inp.value)||0;
                answersQ.push(inc);
                if (inp.dataset.idAnswer == (this.max-1)){
                    answers.push(answersQ);
                    answersQ = [];
                }
                //console.log(this.score);
            }
        }
        ref.push({
            name: name,
            product: product,
            answers: answers
        });
        //document.querySelector("#signup-form").classList.add("hidden");
        // document.getElementById("status").innerHTML = "Дякуємо " + name + "! Чекайте на наші новини на " + email + ".";
    }
};

fetch(questions).then(response=> {return response.json();})
    .then(data => {app.init(data);})
    .catch(err => { console.log(err);});