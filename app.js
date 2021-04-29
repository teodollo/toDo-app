const input = document.getElementById("input");
const list = document.getElementById("todo-list");
const todo = document.getElementsByClassName("todo");

//li button
console.log(list.children[0].children[0])

list.addEventListener('click', (e) => {
  if (e.target.className === "check") {
      e.target.className = "checked";
  }
  else if (e.target.parentNode.className === "checked") {
      e.target.parentNode.className = "check";
  }
});


