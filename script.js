// variable untuk menyimpan data todo
let todo = [];
// mengambil data dari local storage dan di masukan kembali ke variabel todo
const data = JSON.parse(localStorage.getItem("TODO"));
if (data !== null) {
  for (const todoList of data) {
    todo.push(todoList);
  }
}

// mengambil element dari html
const btn = document.querySelector(".Button-submit");
const input = document.querySelector("#todo");
const ul = document.querySelector(".todo");
const deleteBtn = document.querySelector(".button_clear");

// event klik untuk button submit
btn.addEventListener("click", () => {
  addToLocalStorage(); // menyimpan data inputan ke localstorage
  input.value = ""; // clear form input
  // animasi untuk btn ketika di klik
  btn.classList.add("clicked");
  setTimeout(() => {
    btn.classList.remove("clicked");
  }, 300);
});

// menjalankan fungsi yang harus di jalankan etika halaan di refresh
window.addEventListener("load", () => {
  addContent(); //membuat dan menambahkan content html
  const li = ul.getElementsByTagName("li");
  checkIs_Finish(li); //mengechek key is_finish
  checkAll_is_finish(); //mengecek semua key is_finish di variabel todo
});

// menambahkan data inputan ke localstorage
const addToLocalStorage = () => {
  // message ketika form input kosong tapi button submit di klik
  if (input.value == "") {
    return setTimeout(() => alert("kamu belum menuliskan task!!"), 300);
  }
  // menyimpan data dari input.value ke localstorage
  todo.push({ list: input.value, is_finish: false });
  localStorage.setItem("TODO", JSON.stringify(todo));
  addContent(); // menjalankan fungsi add konten agar terlihat data di tampilkan secara realtime
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
  // mengambill element li untuk di ambil indexnya
  const todoList = ul.getElementsByTagName("li");
  getIndex(todoList);
};

// mengambil index dan menjalankan fungsi chekAll_is_finish dan remover
function getIndex(todoList) {
  let dataList = Array.from(todoList);
  dataList.forEach((element, index) => {
    element.addEventListener("click", () => {
      element.classList.add("line");
      todo[index].is_finish = true;
      localStorage.setItem("TODO", JSON.stringify(todo));
      checkAll_is_finish();
      const removeButton = document.querySelector(".delete_btn");
      removerList(removeButton);
    });
  });
}

// fungsi untuk mengechek apakah todo.is_finsih = true jika true maka elemen di garis / selesai
const checkIs_Finish = (prop) => {
  let lists = Array.from(prop);
  lists.forEach((e, index) => {
    if (todo[index].is_finish === true) {
      e.classList.add("line");
    }
  });
};

// menampilkan button untuk menghapus todo ketika key is_finish value nya true semua
const checkAll_is_finish = () => {
  if (todo.length !== 0) {
    let allTrue = todo.every((list) => {
      return list.is_finish === true;
    });
    if (allTrue) {
      const removeBtn = document.createElement("button");
      removeBtn.classList.add("delete_btn");
      removeBtn.type = "button";
      removeBtn.textContent = "all task lists have been completed";
      deleteBtn.appendChild(removeBtn);
    }
  }
};

// fungsi untuk menghapus todo list
function removerList(clearTodos) {
  clearTodos.addEventListener("click", () => {
    todo.splice(0, todo.length);
    localStorage.setItem("TODO", JSON.stringify(todo));
    ul.innerHTML = "";
    setTimeout(() => {
      deleteBtn.innerHTML = "";
    }, 1300);
  });
}
