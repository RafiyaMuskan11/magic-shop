const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

const signup_submit_btn = document.querySelector("#signup-submit-btn");
const signin_submit_btn = document.querySelector("#signin-submit-btn");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

signup_submit_btn.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("http://localhost:4000/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: document.querySelector("#username").value,
      password: document.querySelector("#password").value,
      email: document.querySelector("#email").value,
      phone: document.querySelector("#phone").value,
      address: document.querySelector("#address").value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if(!data.success && data.error && data.error.errors) {
        console.log(data.error.errors)
        return alert(data.error.errors.reduce((acc, curr) =>  curr.message + ' ' + acc , ''))
      }
      if (data.success) {
        window.location.href = "http://127.0.0.1:5501/html/login.html";
        alert(data.message);
        container.classList.remove("sign-up-mode");
      } else {
        alert(data.message);
      }
    });
});

signin_submit_btn.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("http://localhost:4000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: document.querySelector("#login-email").value,
      password: document.querySelector("#login-password").value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "http://127.0.0.1:5501/html/index.html";
      } else {
        alert(data.message);
      }
    });
});
