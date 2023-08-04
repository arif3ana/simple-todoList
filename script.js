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
  input.value = "";
  btn.classList.add("clicked");
  setTimeout(() => {
    btn.classList.remove("clicked");
  }, 300);
});

window.addEventListener("load", function () {
  addContent();
  const li = ul.getElementsByTagName("li");
  checkIs_Finish(li);
});

// menambahkan data inputan ke localstorage
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
    const todoList = ul.getElementsByTagName("li");
    getIndex(todoList);
  });
};

// mengambil index data
function getIndex(todoList) {
  let dataList = Array.from(todoList);
  dataList.forEach((element, index) => {
    element.addEventListener("click", () => {
      element.classList.add("line");
      todo[index].is_finish = true;
      localStorage.setItem("TODO", JSON.stringify(todo));
    });
  });
}

// fungsi untuk mengechek apakah todo.is_finsih = true jika true maka elemen di garis
const checkIs_Finish = (prop) => {
  let lists = Array.from(prop);
  lists.forEach((e, index) => {
    if (todo[index].is_finish === true) {
      e.classList.add("line");
    }
  });
};
