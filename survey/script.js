/*const questions = [
{"question": "Test 1", "name":"test1","answers": ["ans1", "ans2", "ans3"]},
{"question": "Test 1", "name":"test2","answers": ["ans1", "ans2", "ans3"]},
];*/
const questions = "";
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
		ans.setAttribute('value', str);
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
	init(){
		for (let q of questions){
			new DataRadio(q, document.forms.test);
		}
	}
}

app.init();