
//<--Elements Selection-->
const Input = document.querySelector('.itemIn');
const Content = document.querySelector('.items-container');
const list = document.querySelector('.items-list');
const Counter = document.querySelector('.counterAndClear');
const clearBtn = document.querySelector('.ClearBtn');
const Container = document.querySelector('.container');
const SunImg = document.getElementById('dark_mode');
const Header = document.querySelector('.header');
const Options = document.querySelector('.options');
const filterbtn = document.querySelectorAll('.btn');
//<---------------------->

console.log(Counter);

//<--Content-->
const check = 'check';
const uncheck = 'circle';
const Line_Through = 'lineThrough';
const src1 = "image/icon-check.svg";
const src2 = "image/BR.png";

//<--Sotore the item in a local Storage-->
let item = 0;
let LIST,id;

let data = localStorage.getItem("Todo");

if(data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else {
    LIST = [];
    id = 0;
}

function loadList(array) {
    array.forEach((item) => {
        AddTodo(item.name,item.id,item.done,item.trash); 
    })
} 

localStorage.setItem('key','value');
let Store = localStorage.getItem('key');
//<-------------------------------------->

//<--Counte the Items from in the Enter and the delete-->
function countItems() {
    item++;
    Counter.innerHTML = `<span class="Items_Counter">${item} items left</span>`;
    Counter.style.display = 'block';
    clearBtn.style.display = 'block';
    console.log(Counter);
}

function DecreaseItems() {
    item--;
    Counter.innerHTML = `<span class="Items_Counter">${item} items left</span>`;


    if(item == 0) {
        Counter.style.display = 'none';
        clearBtn.style.display = 'none';
    }
}

function restoreItems() {
    item = 0;
    Counter.innerHTML = `<span class="Items_Counter">${item} items left</span>`;


    if(item == 0) {
        Counter.style.display = 'none';
        clearBtn.style.display = 'none';
    }
}
//<----------------------------------------------------->

function filter() {
    filterbtn.forEach(btn => {
        btn.addEventListener('click',(e) => {
            const id = e.currentTarget.dataset.id;
            console.log(id);
        })  

        
    })
}

/*function Filter() {
    for(let i = 0 ; i < filterbtn.length; i++) {
        filterbtn[i].addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            console.log(id);
            /*const items = document.querySelectorAll('.itemsNode');
    
            items.forEach((item) => {
                if(id === "all") {
                    item.style.display = 'block';
                }else if(item.classList.contains(id)) {
                    item.style.display = 'block';
                }else {
                    item.style.display = 'none';
                }
            })
        })
    }
}*/

//<--Load the content-->
function AddTodo(todo,id,done,trash) {
    if(trash) { return; }

    const DONE = done ? check : uncheck;
    const IMAGE = done ? src1 : src2;
    const LINE = done ? Line_Through : "";
    let DI;

    const item = `<ul class="items-list">
        <li class="itemsNode">
            <img src="${IMAGE}" class="${DONE}" id="${id}" job="complete">
            <span class="text ${LINE} ${DI}">${todo}</span> 
            <img src="image/icon-cross.svg" class="deleteBtn" id="${id}" job="delete">                  
        </li>  
    </ul>`

    const position = "beforeend";

    list.insertAdjacentHTML(position,item);

    countItems();
}
//<-------------------->

//<--input the items-->
Input.addEventListener('keyup',addItems) 
function addItems(event) {
    const Todo = Input.value;
    if(event.keyCode == 13) {
        console.log(Todo);
        if(Todo) {
            AddTodo(Todo,id,false,false);
            LIST.push({
                name:Todo,
                id:id,
                done:false,
                trash:false,
            });
            localStorage.setItem("Todo",JSON.stringify(LIST));

            id++;

            console.log(LIST);
        }
        Input.value = "";
    }
}
//<------------------->

//AddTodo("Complete my english homework",1,true,false);

//<--Controlling the items-->

//checking items
function CompleteTodo(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(Line_Through);
    
    if(element.classList.contains(check)) {
        element.src = src1;
        element.classList.add(check);
        DecreaseItems();
        
    }else {
        element.src = src2;
        element.classList.add(uncheck);
        countItems();
    }

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//Delete Items
function RemoveTodo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;

    DecreaseItems(); 
}
//<------------------------->

//<--Controlling the List-->
list.addEventListener('click',(event) => {
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete") {
        CompleteTodo(element)
    }else if(elementJob == "delete") {
        RemoveTodo(element)
    }

    localStorage.setItem("Todo",JSON.stringify(LIST));
})
//<------------------------>

//<--Modes-->
function LightMode() {
    Container.classList.remove('dark');
    SunImg.src = "image/icon-moon.svg";
    document.body.style.background = 'hsl(0, 0%, 98%)';
    Header.style.backgroundImage = 'url("image/bg-mobile-light.jpg")';
    Input.classList.remove('itemIn');
    Input.classList.add('lightInput');
    Options.style.background = 'hsl(0, 0%, 98%)';
    Content.classList.remove('items-container');
    Content.classList.add('lightList');
}

function DarkMode() {
    Container.classList.add('dark');
    SunImg.src = "image/icon-sun.svg";
    document.body.style.background = 'hsl(235, 21%, 11%)';
    Header.style.backgroundImage = "url('image/bg-mobile-dark.jpg')";
    Input.classList.add('itemIn');
    Input.classList.remove('lightInput');
    Options.style.background = 'hsl(235, 24%, 19%)';
    Content.classList.add('items-container');
    Content.classList.remove('lightList');
}
//<--------->

//<--Modes Switcher-->
SunImg.addEventListener('click',() => {
    const On = Container.classList.contains('dark');

    if(On) {
        LightMode();
    }else {
        DarkMode();
    }
})
//<----------------->

//<--Clear the list and the local storage-->
clearBtn.addEventListener('click', () => { 
    localStorage.clear();
    location.reload();

    Counter.style.display = 'none';
    clearBtn.style.display = 'none';

    restoreItems();
})
//<------------------>