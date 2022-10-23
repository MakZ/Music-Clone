const users = [
  {
    email: "testuser@striveschool.com",
    password: "password123",
  },
  {
    email: "admin@striveschool.com",
    password: "password123",
  },
];

const changeBorderColor = () => {
  const inputs = document.getElementsByClassName("form-control");

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].style.borderColor = "red";
  }
};

function login() {
  const username = document.getElementById("Email1").value;
  const password = document.getElementById("InputPassword1").value;
  event.preventDefault();

  let userExists = 0;

  for (let i = 0; i < users.length; i++) {
    if (username === users[i].email && password === users[i].password) {
      userExists++;
    }
  }
  if (userExists > 0) {
    window.location.assign("index.html");
  }

  if (userExists === 0) {
    document.querySelector("#error-div").classList.remove("d-none");
    changeBorderColor();
  }
}

let mybtn = document.getElementById("submit");
mybtn.addEventListener("click", login);
