function Form(el){
    let elem = el;
    let resultEl = elem.getElementsByClassName('result')[0];
    let inputs = [];
    this.getInputs = function(){
        let inputElems = elem.getElementsByTagName('input');
        for (let i of inputElems) {
            let inp;
			let type = i.getAttribute("type");
            if ( type === "radio") {
                inp = new Radio(i);
            } else if (type === "checkbox") {
				inp = new Checkbox(i);
			}
			else {	
				inp = new Input(i);
			}
            inputs.push(inp);
        }
        inputElems = elem.getElementsByTagName('select');
        for (let i of inputElems) {
            let inp = new Input(i);
            inputs.push(inp);
        }
    };
    function total(){
        let sum = 0;
        for (let inp of inputs){
            sum += Number(inp.value());
        }
        return sum;
    };
	elem.onclick = function(event){
		let target = event.target;
		if (target.closest('input')|| target.closest('select'))
			//calculateTotal(target);
			resultEl.innerHTML = ""+total();
			console.log(target);
	};
	this.getInputValue = function(i){
		return inputs[i].value();
	};
}

let form = new Form(document.forms["cakeform"]);
form.getInputs();

function Input(el){
    let elem = el;
	function getValue(){
		return el.value;
	}
	this.value = getValue;
}

function Radio(el){
    Input.call(this);
    function getValue(){
		if (el.checked)
			return el.value;
		return 0;
    }
    this.value = getValue;
}

function Checkbox(el){
    Input.call(this);
    function getValue(){
		if (el.checked)
			return el.value;
		return 0;
    }
    this.value = getValue;
}