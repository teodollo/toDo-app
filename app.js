
//--------------------DOM ELEMENTS-------------------------//
const body = document.querySelector("BODY");
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const todoInput = document.getElementById("todo-input");
const input = document.getElementById("input");
const button = document.getElementsByClassName("check")
const list = document.getElementById("todo-list");
const table = document.querySelector(".todo-table");
const todo = document.getElementsByClassName("todo");
const todoP = document.getElementsByClassName("white");
const endList = document.getElementById("end-of-list")
const endListButton = document.querySelector("#end-of-list button")
const html = document.querySelector("HTML");
const filter = document.getElementById("filter");
const filterButtons = document.querySelectorAll("#filter button");
const allFilter = document.getElementById("all-filter");
const activeFilter = document.getElementById("active-filter");
const completedFilter = document.getElementById("completed-filter");

const ghost = document.getElementsByClassName('todo sortable-chosen sortable-drag')
//------------------------------------------------------------//


//--------------------LOCAL STORAGE----------------------------//

//---------------------List Storage

let itemsArray = localStorage.getItem('items')
  ? JSON.parse(localStorage.getItem('items'))
  : [];

localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

data.forEach((item) => {
    createLi(item[0], item[1]);
  });


//------------------Light And Dark Mode Storage

let moonArray = localStorage.getItem('moon')
  ? JSON.parse(localStorage.getItem('moon'))
  : [];
localStorage.setItem('moon', JSON.stringify(moonArray));

let moonData = JSON.parse(localStorage.getItem("moon"));

localStorage.setItem('moon', JSON.stringify(moonArray) );

//the function is ran with local storage data that is either sun or moon
lightAndDarkMode(moonData);


//---------------------------------------------------------------//




//--------------------EVENT LISTENER------------------------//


//-----------Toggle Light And Dark Mode

document.addEventListener('click', (e) =>{
    if(e.target.id === "sun") {
        moonArray = "sun";
        localStorage.setItem('moon', JSON.stringify(moonArray));
        lightAndDarkMode("sun");
    } if (e.target.id === "moon") {
        moonArray = "moon";
        localStorage.setItem('moon', JSON.stringify(moonArray));
        lightAndDarkMode("moon");
    }
})



//-------Window Submit Or Click Event Listener

window.addEventListener('submit', () => {
    itemsLeft();
    lightAndDarkMode(moonArray);
    lineThroughText();
});

window.addEventListener('click', () => {
    itemsLeft();
    lineThroughText();
});



//---------------LIST CREATE Event Listener

todoInput.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    for (let list of itemsArray){
        if ( input.value === list[0]) {
            window.alert("task is already added")
            input.value = "";
            e.stopPropagation();
        }
    }

    if(input.value) {
      itemsArray.push([input.value, "check"]);
      localStorage.setItem('items', JSON.stringify(itemsArray));
      createLi(input.value);
    }

    input.value = "";
});



//------------Checking AND Removal Event Listener

list.addEventListener('click', (e) => {
    if (e.target.className === "check") {
        e.target.className = "checked";
        saveCheck(e.target.nextElementSibling.textContent);
    }
    else if (e.target.parentNode.className === "checked") {
        e.target.parentNode.className = "check";
        removeCheck(e.target.parentNode.nextElementSibling.textContent);
    }
    //when cross is clicked list item removed from ul
    else if ( e.target.parentNode.className === "cross") {
        const crossButton = e.target.parentNode;
        const crossLi = crossButton.parentNode;
        const crossList = crossLi.parentNode;
        crossList.removeChild(crossLi);
        removeItemLocalStorage(crossLi);
    }
    //lineThroughText();
});
  


//-----------------List Reordering Event Listener

list.addEventListener('dragstart', function(e)  {
    itemsArray = []; //clearing array, before reordering of list
});
list.addEventListener('dragend', () => {
    reorderList(); //function that reorders list in LocalStorage after drag and drop event
    localStorage.setItem('items', JSON.stringify(itemsArray)); //pushing itemsArray into LocalStorage
});

//drag and drop reorder listener for touch screen
list.addEventListener('touchmove', () => {
    itemsArray = [];
    reorderList();
    itemsArray.pop();
    localStorage.setItem('items', JSON.stringify(itemsArray));
});



//------------------------Clear Completed

endList.addEventListener('click', (e) => {
    if ( e.target.id === "end-button" ) {
    //checked clear function running 5 times to clear everything 
      for (let i = 0; i < 5; i++) {
        clearCompleted();
      }
    }
});


    

//------------------Filter Event Listener

filter.addEventListener('click', (e) => {
    if (e.target.id === "all-filter") {
        showAll();
    } 
    else if (e.target.id === "active-filter") {
        showActive();
    }
    else if (e.target.id === "completed-filter") {
        showCompleted();
    }
    filterColor(e.target);
});

//--------------------------------------------------------------------------------



//--------------------------FUNCTIONS----------------------------//

itemsLeft();
lineThroughText();

//----------------CREATE LIST ELEMENT

function createLi(todo, check = "check") {
    //create a list item and give it classname todo
    const li = document.createElement("LI");
    li.className = "todo";
    
    //creating the button that will store the check mark image
    const button = document.createElement("BUTTON");
    button.className = check;
    const img = document.createElement("IMG");
    img.setAttribute("src", "images/icon-check.svg");
    button.appendChild(img);
    //adding checkbox to list
    li.appendChild(button)

    //the p tag that will have the input value stored in it
    const p = document.createElement("P");
    p.textContent = todo;
    p.className = "white";
    //adding input value to list
    li.appendChild(p);
    
    //button with cross picture in it
    const cross = document.createElement("BUTTON");
    cross.className = "cross";
    const crossImg = document.createElement("IMG");
    crossImg.setAttribute("src", "images/icon-cross.svg");
    cross.appendChild(crossImg);
    //adding cross to list item
    li.appendChild(cross);
    
    //adding list item to the unordered list
    list.appendChild(li);
}




//---------------ITEMS LEFT IN LIST

function itemsLeft() {
    const endP = endList.children[0];
    const li = list.children;

    if (li.length === 0) {
        endP.textContent = "No items left";
    } else if (li.length === 1) {
        endP.textContent = `1 item left`;
    } else {
        endP.textContent = `${li.length} items left`;
    }
}



//------------------REORDER LIST

function reorderList() {
    for (let order of list.children) {
       const inputValue = order.childNodes[1].textContent;
       const checkValue = order.childNodes[0].className;
       itemsArray.push([inputValue, checkValue]);

    }
}



//--------------CLEAR CHECKED ITEMS

function clearCompleted() {
    const endClear = endList.children[1];
    const endP = endList.children[0];
 
    
    if (endClear) {
        for (let completed of list.children) {
            const li = completed;
            const liCheck = li.childNodes[0];
        if ( liCheck.className === "checked" ) {
            list.removeChild(liCheck.parentNode);
            removeItemLocalStorage(liCheck.parentNode);
        }
    }
}
}


//--------------SHOW ALL TASKS

function showAll() {
    for (let check of list.children) {
        if (check.style.display === "none") {
            check.style.display = "grid";
        }
    }
}


//--------------SHOW ACTIVE TASKS

function showActive() {
    for (let check of list.children) {
        if (check.childNodes[0].className === "checked") {
            check.style.display = "none";
        } else {
            check.style.display = "grid";
        }
    }
}


//---------------SHOW COMPLETED TASKS

function showCompleted() {
    for (let check of list.children) {
        if (check.childNodes[0].className === "check") {
            check.style.display = "none";
        } else {
            check.style.display = "grid";
        }
    }
}


//------------REMOVE LIST ITEMS FROM LOCAL STORAGE
  
function removeItemLocalStorage(string) {
    for (let i = 0; i < itemsArray.length; i++) {
        if (itemsArray[i][0] === string.textContent ) {
            itemsArray.splice(i, 1);
            localStorage.setItem('items', JSON.stringify(itemsArray));
           break
        }
    }
}


//---------SAVE OR REMOVE CHECKMARK FROM LOCAL STORAGE

function saveCheck(string) {
    for (let i = 0; i < itemsArray.length; i++) {
        if (itemsArray[i][0] === string ) {
            itemsArray[i].splice(1,1, "checked");
            localStorage.setItem('items', JSON.stringify(itemsArray));
            break
        }
    }
}

function removeCheck(string) {
    for (let i = 0; i < itemsArray.length; i++) {
        if (itemsArray[i][0] === string ) {
            itemsArray[i].splice(1,1, "check");
            localStorage.setItem('items', JSON.stringify(itemsArray));
        }
    }
}


//-------------ASSIGN FILTER BUTTON COLOR

function filterColor(target) {
    if (target.id === "all-filter") {
        target.style.color = "hsl(220, 98%, 61%)";
        activeFilter.style.color = "hsl(234, 11%, 52%)";
        completedFilter.style.color = "hsl(234, 11%, 52%)";
    } else if (target.id === "active-filter") {
        target.style.color = "hsl(220, 98%, 61%)";
        allFilter.style.color = "hsl(234, 11%, 52%)";
        completedFilter.style.color = "hsl(234, 11%, 52%)";
    } else if (target.id === "completed-filter") {
        target.style.color = "hsl(220, 98%, 61%)";
        allFilter.style.color = "hsl(234, 11%, 52%)";
        activeFilter.style.color = "hsl(234, 11%, 52%)";
    }
};



//----------TOGGLE BETWEEN LIGHT AND DARK MODE

 function lightAndDarkMode(mode) {
    if (mode === "sun") {
        sun.style.display = "none";
        moon.style.display = "block";
        body.style.backgroundImage = "url(images/bg-mobile-light.jpg)";
        todoInput.style.backgroundColor = "white";
        input.style.color = "black";
        input.style.backgroundColor = "white";
        table.style.backgroundColor = "white";
        allFilter.style.backgroundColor = "white";
        activeFilter.style.backgroundColor = "white";
        completedFilter.style.backgroundColor = "white";
        body.style.backgroundColor = "white";
        endListButton.style.backgroundColor = "white";
        for (let i = 0; i < list.children.length; i++) {
            if (todo[i].childNodes[0].className === "ckecked") {
                todoP[i].style.color = "grey";
                todoP[i].style.setProperty('text-decoration', 'line-through')
            }
            todoP[i].style.color = "black";
            todo[i].style.borderBottomColor = "hsl(233, 13%, 87%)";
            todo[i].childNodes[0].style.borderColor = "hsl(233, 13%, 87%)";
        }
    
    } else if (mode === "moon") {
        moon.style.display = "none";
        sun.style.display = "block";
        body.style.backgroundImage = "url(images/bg-mobile-dark.jpg)";
        todoInput.style.backgroundColor = "hsl(237, 14%, 26%)";
        input.style.color = "white";
        input.style.backgroundColor = "hsl(237, 14%, 26%)";
        table.style.backgroundColor = "hsl(237, 14%, 26%)";
        allFilter.style.backgroundColor = "hsl(237, 14%, 26%)";
        activeFilter.style.backgroundColor = "hsl(237, 14%, 26%)";
        completedFilter.style.backgroundColor = "hsl(237, 14%, 26%)";
        body.style.backgroundColor = "hsl(235, 24%, 19%)";
        endListButton.style.backgroundColor = "hsl(237, 14%, 26%)";
        for (let i = 0; i < list.children.length; i++) {

            todoP[i].style.color = "white";
            todo[i].style.borderBottomColor = "hsl(233, 14%, 35%)";
            todo[i].childNodes[0].style.borderColor = "hsl(233, 14%, 35%)";
        }
    }
  }

    
  //---------------Line Through Text 

  function lineThroughText() {
      for (let i = 0; i < list.children.length; i++) {
        if (todo[i].childNodes[0].className === "checked") {
            todoP[i].style.color = "grey";
            todoP[i].style.setProperty('text-decoration', 'line-through')
        } else if (todo[i].childNodes[0].className === "check" && moon.style.display === "block") {
            todoP[i].style.color = "black";
            todoP[i].style.setProperty('text-decoration', 'none')
        } else if (todo[i].childNodes[0].className === "check" && sun.style.display === "block") {
            todoP[i].style.color = "white";
            todoP[i].style.setProperty('text-decoration', 'none')
        }
      }
  }