// variable for save data todo
let todo = [];
const data = JSON.parse(localStorage.getItem("TODO"));
if (data !== null) {
  for (const todoList of data) {
    console.log(todoList);
  }
}

const btn = document.querySelector(".Button-submit");
const input = document.querySelector("#todo");
const ul = document.querySelector(".todo");

btn.addEventListener("click", () => {
  addToLocalStorage();
});

const addToLocalStorage = () => {
  todo.push(input.value);
  localStorage.setItem("TODO", JSON.stringify(todo));
};

// membuat elemnt html untuk menampilkan todo
const addContent = () => {
  ul.innerHTML = todo.map((list) => {
    return `<li>${list}</li><hr>`;
  });
};
