const todoInput = document.getElementById("todo-input");
const input = document.getElementById("input");
const list = document.getElementById("todo-list");
const todo = document.getElementsByClassName("todo");


list.addEventListener('click', (e) => {
  if (e.target.className === "check") {
      e.target.className = "checked";
  }
  else if (e.target.parentNode.className === "checked") {
      e.target.parentNode.className = "check";
  }
  else if ( e.target.parentNode.className === "cross") {
      const crossButton = e.target.parentNode;
      const crossLi = crossButton.parentNode;
      const crossList = crossLi.parentNode;
      crossList.removeChild(crossLi);
  }
});

todoInput.addEventListener('submit', (e) =>{
    e.preventDefault();
    if(input.value) {
    createLi(input.value);
    }
    input.value = "";
})

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

