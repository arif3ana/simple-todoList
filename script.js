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
let li = ul.getElementsByTagName("li");

btn.addEventListener("click", () => {
  addToLocalStorage();
  input.value = "";
  btn.classList.add("clicked");
  setTimeout(() => {
    btn.classList.remove("clicked");
  }, 300);
});

window.addEventListener("load", function () {
  addContent();
});

const addToLocalStorage = () => {
  if (input.value == "") {
    return setTimeout(() => alert("kamu belum menuliskan task!!"), 300);
  }
  todo.push({ list: input.value, is_finish: false });
  localStorage.setItem("TODO", JSON.stringify(todo));
  addContent();
};

// membuat elemnt html untuk menampilkan todo
const addContent = () => {
  ul.innerHTML = "";
  todo.map((task) => {
    const li = document.createElement("li");
    li.textContent = task.list;
    ul.appendChild(li);
    const hr = document.createElement("hr");
    ul.appendChild(hr);
  });
};

// merubah is_finish menjadi true
