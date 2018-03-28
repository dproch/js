class Form{
    //вспомогательные (приватные) функции
    _pushElemsByTag(tag){ //добавляем элементы формы по тегу к inputs
        let inp;
        let inputElems = this._elem.getElementsByTagName(tag); //получим все элементы нужного типа
        for (let i of inputElems) {//в зависимости от типа элемента формы воспользуемся разными конструкторами
            switch(i.getAttribute("type")){
                case "radio": inp = new Radio(i); break;
                case "checkbox": inp = new Checkbox(i); break;
                default: inp = new Input(i);
            }
            this._inputs.push(inp); //добавляем элемент в массив
        }
    }
    _total(){ //складываем value всех элементов
        let sum = 0;
        for (let inp of this._inputs){
            sum += Number(inp.value());
        }
        return sum;
    };
    _showResult(){
        this._resultEl.innerHTML = ""+this._total();
    }


    constructor(el){
	    this._elem = el;
	    this._resultEl = el.getElementsByClassName('result')[0];
	    this._inputs = [];
        this._pushElemsByTag('input'); //получим все input(s)
        this._pushElemsByTag('select'); //получим все select(s)
        el.addEventListener("click",e=>this.onclick(e),false )
    }
    onclick (event){ //обработка клика по форме - слушаем клик по всей html-форме
        let target = event.target; //куда кликнули, если на input или select - выводим результат
        if (target.closest('input')|| target.closest('select'))
            this._showResult();
        console.log(target); //информация в консоль для отладки
    };
}

class Input {
    constructor(el){
        this.elem = el;
    }

    value(){
        return this.elem.value;
    }
}

class Radio extends Input {

    value() {
        if (this.elem.checked)//если элемент выбран, то берем его значение, если нет - возвращаем 0
            return super.value();
        return 0;
    }
}

class Checkbox extends Input{
    value() {
        if (this.elem.checked)//если элемент выбран, то берем его значение, если нет - возвращаем 0
            return super.value();
        return 0;
    }
}

const formEl = document.forms["cakeform"];
new Form(formEl);