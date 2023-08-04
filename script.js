// variable for save data todo
let todo = [];
const data = JSON.parse(localStorage.getItem("TODO"));
if (data !== null) {
  for (const todoList of data) {
    todo.push(todoList);
  }
}

const btn = document.querySelector(".Button-submit");
const input = document.querySelector("#todo");
const ul = document.querySelector(".todo");

btn.addEventListener("click", () => {
  addToLocalStorage();
  addContent();
  input.value = "";
  btn.classList.add("clicked");
  setTimeout(() => {
    btn.classList.remove("clicked");
  }, 300);
});

const addToLocalStorage = () => {
  if (input.value == "") {
    return setTimeout(() => alert("kamu belum menuliskan task!!"), 300);
  }
  todo.push(input.value);
  localStorage.setItem("TODO", JSON.stringify(todo));
};

window.addEventListener("load", function () {
  addContent();
});

// membuat elemnt html untuk menampilkan todo
const addContent = () => {
  ul.innerHTML = todo.map((list) => {
    return `<li>${list}</li><hr>`;
  });
};
