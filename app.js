//--------------------DOM ELEMENTS-------------------------//

const todoInput = document.getElementById("todo-input");
const input = document.getElementById("input");
const list = document.getElementById("todo-list");
const todo = document.getElementsByClassName("todo");
const endList = document.getElementById("end-of-list")
const html = document.querySelector("HTML");
const filter = document.getElementById("filter");
const allFilter = document.getElementById("all-filter");
const activeFilter = document.getElementById("active-filter");
const completedFilter = document.getElementById("completed-filter");

//------------------------------------------------------------//

//------------TESTING AREA-------------------//


//--------------------------------------------//


//--------------------EVENT LISTENER------------------------//

//Clear Completed

endList.addEventListener('click', (e) => {
    if ( e.target.id === "end-button" ) {
    //checked clear function running 5 times to clear everything 
    for (let i = 0; i < 5; i++) {
      clearCompleted();
      
    }
    }
});

//-------------------------------------------------------


//List items.

list.addEventListener('click', (e) => {
  if (e.target.className === "check") {
      e.target.className = "checked";

  }
  else if (e.target.parentNode.className === "checked") {
      e.target.parentNode.className = "check";
  }
  //when cross is clicked list item removed from ul
  else if ( e.target.parentNode.className === "cross") {
      const crossButton = e.target.parentNode;
      const crossLi = crossButton.parentNode;
      const crossList = crossLi.parentNode;
      crossList.removeChild(crossLi);
  }
});

//------------------------------------------------------


//when theres a submit or click event in window check items left function is activated

window.addEventListener('submit', () => {
    itemsLeft();
});

window.addEventListener('click', () => {
    itemsLeft();
});

//-----------------------------------------------------------------


//list creation Event Listener

todoInput.addEventListener('submit', (e) =>{
    e.preventDefault();

    if(input.value) {
    createLi(input.value);
    }
    input.value = "";
});

//---------------------------------------------------

//event Listener for filter section where you filter out by all, active or completed tasks

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
});

//--------------------------------------------------------------------------------


//------------------------------------------------------------//




//--------------------------FUNCTIONS----------------------- //

itemsLeft();

//Function that creates List items

function createLi(todo) {
    //create a list item and give it classname todo
    const li = document.createElement("LI");
    li.className = "todo";
    
    //creating the button that will store the check mark image
    const button = document.createElement("BUTTON");
    button.className = "check";
    const img = document.createElement("IMG");
    img.setAttribute("src", "images/icon-check.svg");
    button.appendChild(img);
    //adding checkbox to list
    li.appendChild(button)

    //the p tag that will have the input value stored in it
    const p = document.createElement("P");
    p.textContent = todo;
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

//-----------------------------------------------------------



//Function that check of many items are left in ul

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

//-------------------------------------------------------


//Function that clears checked list items

function clearCompleted() {
    const endClear = endList.children[1];
    const endP = endList.children[0];
 
    
    if (endClear) {
        for (let i = 0; i <= list.children.length - 1; i++) {
           const li = list.children[i];
 
           const liCheck = li.childNodes[0];
           if ( liCheck.className === "checked" ) {
             list.removeChild(liCheck.parentNode);
           
          }
        }
    }
}

//-------------------------------------------------------------




  //function that shows all todo tasks completed and active alike//

  function showAll() {
      for (let i = 0; i < list.children.length; i++) {
          if (list.children[i].style.display === "none") {
              list.children[i].style.display = "grid";
          }
      }
  }

  //----------------------------------------------------------------//


  //function to show all active todo tasks and filter out completed tasks

  function showActive() {
      for (let i = 0; i < list.children.length; i++) {
          if (list.children[i].childNodes[0].className === "checked") {
              list.children[i].style.display = "none";
          } else {
              list.children[i].style.display = "grid";
          }
      }
  }

  //------------------------------------------------------------------//

  filter.addEventListener('click', (e) => {
    if (e.target.id === "all-filter") {
        showAll();
    } else if (e.target.id === "active-filter") {
        showActive();
    } else if (e.target.id === "completed-filter") {
        showCompleted();
    }
});

  function showCompleted() {
      for (let i = 0; i < list.children.length; i++) {
          if (list.children[i].childNodes[0].className === "check") {
              list.children[i].style.display = "none";
          } else {
              list.children[i].style.display = "grid";
          }
      }
  }

//-------------------------------------------------------------------//



