const leftDiv = document.getElementsByClassName("leftDiv");
const rightDiv = document.getElementsByClassName("rightDiv");
let users = [];

document.body.onload = async () => {
  createAndDisplayData(await fetchUsers());
};

const fetchUsers = async () => {
  const resp = await fetch("https://jsonplaceholder.typicode.com/users");
  if (resp.ok) {
    const users = await resp.json();
    return users;
  }
};

const fetchUserTodos = async (userId) => {
  const resp = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/todos`
  );
  if (resp.ok) {
    const todos = await resp.json();
    return todos;
  }
};
const fetchUserPosts = async (userId) => {
  const resp = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`
  );
  if (resp.ok) {
    const posts = await resp.json();
    return posts;
  }
};

const createAndDisplayData = async (getUsers) => {
  users = getUsers;
  createInfoDiv(getUsers);
  addEventListeners();
};

const searchInput = document.getElementById("userSearch");
searchInput.onchange = filterWithSearch = async () => {
  users = await fetchUsers();
  const filter = searchInput.value;
  const newArr = users.filter(
    (user) =>
      user.name.toLowerCase().includes(filter) == true ||
      user.email.toLowerCase().includes(filter) == true
  );
  if (newArr.length > 0) {
    users = newArr;
    const allInfoDiv = document.getElementsByClassName("allInfoDiv");
    leftDiv[0].removeChild(allInfoDiv[0]);
    createAndDisplayData(users);
  } else if (newArr.length === 0) {
    const allInfoDiv = document.getElementsByClassName("allInfoDiv");
    allInfoDiv[0].style.display = "none";
    window.alert("No user found");
  }
};

const addEventListeners = () => {
  const buttons = [...document.getElementsByClassName("otherDataButtons")];
  const ids = [...document.getElementsByClassName("ids")];
  buttons.forEach((button, index) => {
    button.addEventListener("mouseover", () => {
      const otherDataDivs = [
        ...document.getElementsByClassName("otherDataDivs"),
      ];
      otherDataDivs.forEach((div) => {
        div.style.display = "none";
      });
      otherDataDivs[index].style.display = "block";
    });
    button.addEventListener("click", () => {
      const otherDataDiv =
        document.getElementsByClassName("otherDataDivs")[index];
      otherDataDiv.style.display = "none";
    });
  });
  ids.forEach((id, index) => {
    id.addEventListener("click", () => {
      idOnClick(index);
    });
  });
};

const idOnClick = (index) => {
  const inputBoxs = [...document.getElementsByClassName("inputBoxs")];
  if (inputBoxs[index].style.backgroundColor !== "orange") {
    inputBoxs.forEach((inputBox) => {
      inputBox.style.backgroundColor = "rgb(159, 164, 126)";
    });
    inputBoxs[index].style.backgroundColor = "orange";
    showTodosAndPosts(index);
  } else {
    inputBoxs.forEach((inputBox) => {
      inputBox.style.backgroundColor = "rgb(159, 164, 126)";
    });
  }
};

const showTodosAndPosts = async (index) => {
  rightDiv[0].innerHTML = "";
  const todos = await fetchUserTodos(index + 1);
  const posts = await fetchUserPosts(index + 1);
  createTodos(todos, index);
  createPosts(posts, index);
};

const createInfoDiv = (users) => {
  const allInfoDiv = document.createElement("div");
  allInfoDiv.className = "allInfoDiv";
  users.forEach((user, index) => {
    const inputBoxDiv = document.createElement("div");
    inputBoxDiv.className = "inputBoxs";
    const idDiv = document.createElement("div");
    idDiv.className = "ids";
    idDiv.textContent = `ID ${user.id}`;
    inputBoxDiv.appendChild(idDiv);
    const nameDiv = document.createElement("div");
    nameDiv.className = "names";
    nameDiv.textContent = `Name: `;
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.className = "nameInputs";
    nameInput.value = user.name;
    nameDiv.appendChild(nameInput);
    inputBoxDiv.appendChild(nameDiv);
    const emailDiv = document.createElement("div");
    emailDiv.className = "emailDivs";
    emailDiv.textContent = `Email: `;
    const emailInput = document.createElement("input");
    emailInput.type = "text";
    emailInput.className = "emailInputEls";
    emailInput.value = user.email;
    emailDiv.appendChild(emailInput);
    inputBoxDiv.appendChild(emailDiv);
    const inputButtonsDiv = document.createElement("div");
    inputButtonsDiv.className = "inputButtonsDivs";
    const otherDataSpan = document.createElement("span");
    otherDataSpan.className = "otherDataSpans";
    const otherDataButton = document.createElement("button");
    otherDataButton.textContent = "Other Data";
    otherDataButton.className = "otherDataButtons";
    otherDataSpan.appendChild(otherDataButton);
    inputButtonsDiv.appendChild(otherDataSpan);
    const updateSpan = document.createElement("span");
    updateSpan.className = "updateSpans";
    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.onclick = updateUserData();
    updateSpan.appendChild(updateButton);
    inputButtonsDiv.appendChild(updateSpan);
    const deleteSpan = document.createElement("span");
    deleteSpan.className = "deleteSpans";
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.onclick = deleteUser();
    deleteSpan.appendChild(deleteButton);
    inputButtonsDiv.appendChild(deleteSpan);
    inputBoxDiv.appendChild(inputButtonsDiv);
    allInfoDiv.appendChild(inputBoxDiv);
    leftDiv[0].appendChild(allInfoDiv);
    createOtherData(user, index);
  });
};

const createOtherData = (user, index) => {
  const inputBox = document.getElementsByClassName("inputBoxs")[index];
  const otherDataDiv = document.createElement("div");
  otherDataDiv.className = "otherDataDivs";
  const divInOtherDataDiv1 = document.createElement("div");
  divInOtherDataDiv1.className = "divInOtherDataDivs";
  divInOtherDataDiv1.textContent = "Street: ";
  const otherDataInput1 = document.createElement("input");
  otherDataInput1.type = "text";
  otherDataInput1.value = user.address.street;
  otherDataInput1.className = "otherDataInputs";
  divInOtherDataDiv1.appendChild(otherDataInput1);
  otherDataDiv.appendChild(divInOtherDataDiv1);
  const divInOtherDataDiv2 = document.createElement("div");
  divInOtherDataDiv2.className = "divInOtherDataDivs";
  divInOtherDataDiv2.textContent = "City: ";
  const otherDataInput2 = document.createElement("input");
  otherDataInput2.type = "text";
  otherDataInput2.value = user.address.city;
  otherDataInput2.className = "otherDataInputs";
  divInOtherDataDiv2.appendChild(otherDataInput2);
  otherDataDiv.appendChild(divInOtherDataDiv2);
  const divInOtherDataDiv3 = document.createElement("div");
  divInOtherDataDiv3.className = "divInOtherDataDivs";
  divInOtherDataDiv3.textContent = "Zipcode: ";
  const otherDataInput3 = document.createElement("input");
  otherDataInput3.type = "text";
  otherDataInput3.value = user.address.zipcode;
  otherDataInput3.className = "otherDataInputs";
  divInOtherDataDiv3.appendChild(otherDataInput3);
  otherDataDiv.appendChild(divInOtherDataDiv3);
  otherDataDiv.style.display = "none";
  inputBox.appendChild(otherDataDiv);
};

const createTodos = (todos, index) => {
  const userTodosDivs = document.createElement("div");
  userTodosDivs.className = "userTodosDivs";
  const userTodosFirstLine = document.createElement("div");
  userTodosFirstLine.className = "userTodosFirstLine";
  userTodosFirstLine.textContent = `User ${index + 1}`;
  const todoAddButton = document.createElement("button");
  todoAddButton.className = "todoAddButton";
  todoAddButton.textContent = "Add";
  userTodosFirstLine.appendChild(todoAddButton);
  userTodosDivs.appendChild(userTodosFirstLine);
  const userTodosInfo = document.createElement("div");
  userTodosInfo.className = "userTodosInfo";
  todos.forEach((todo) => {
    const userTodos = document.createElement("div");
    userTodos.className = "userTodos";
    const userTodosTitle = document.createElement("div");
    userTodosTitle.className = "userTodosTitle";
    userTodosTitle.textContent = `Title: ${todo.title}`;
    userTodos.appendChild(userTodosTitle);
    const userTodosCompleted = document.createElement("div");
    userTodosCompleted.className = "userTodosCompleted";
    userTodosCompleted.textContent = `Completed: ${todo.completed}`;
    if (todo.completed) {
      const markCompletedButton = document.createElement("button");
      markCompletedButton.className = "markCompletedButton";
      markCompletedButton.textContent = "Mark Complete";
      userTodosCompleted.appendChild(markCompletedButton);
    }
    userTodos.appendChild(userTodosCompleted);
    userTodosInfo.appendChild(userTodos);
  });
  userTodosDivs.appendChild(userTodosInfo);
  rightDiv[0].appendChild(userTodosDivs);
};

const createPosts = (posts, index) => {};

const updateUserData = () => {};
const deleteUser = () => {};
