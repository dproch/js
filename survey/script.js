/*const questions = [
{"question": "Test 1", "name":"test1","answers": ["ans1", "ans2", "ans3"]},
{"question": "Test 1", "name":"test2","answers": ["ans1", "ans2", "ans3"]},
];*/
const questions = "http://aniksa.github.io/js/survey/data.json";
class DataRadio{
	constructor(data, form){
		this.form = form;
		this.question = document.createElement("p");
		this.question.textContent = data["question"]; 
		form.appendChild(this.question);
		this.answers=[];
		for (let i=0; i< data["answers"].length; i++){
			this.answers.push(this.addAnswer(data["answers"][i], data["name"], i));
			form.appendChild(this.answers[i].a);
			form.appendChild(this.answers[i].l)
		}
	}
	addAnswer(str, name, i){
		let ans = document.createElement('input');
		ans.setAttribute('type', 'radio');
		ans.setAttribute('value', i);
		ans.setAttribute('name', name);
		let id = name.toString() + i.toString();
		ans.id = id;
		let label = document.createElement('label');
		label.textContent = str;
		label.setAttribute('for', id);
		return {a: ans,l:label}; 
	}
}

const app = {
	form : document.forms.test,
	score : [],
	max: 4, //max number of options
	view: document.getElementById('result'),
	init(questions){
		for (let q of questions){
			new DataRadio(q, this.form );
		}
		this.form.onsubmit = this.calculate.bind(this);
	},
	calculate(e){
		e.preventDefault();
		for (let i=0; i<this.max; i++)
			this.score[i] = 0;
		for (let inp of this.form.elements){
			if (inp.type === "radio" && inp.checked){
				this.score[parseInt(inp.value)]++;
				console.log(this.score);
			}
		}
		this.show();
	},
	show(){
		this.view.innerHTML = '';
		for (let i = 0; i< this.score.length; i++){
			this.view.innerHTML += `${i+1}: ${this.score[i]}<br/>`;
		}		
	}
}

fetch(questions).then(response=> {return response.json();})
.then(data => {app.init(data);})
.catch(err => { console.log(err);});