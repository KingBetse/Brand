// import axios from "axios";
// import axios from "axios";
const login = async (email, password) => {
  try {
    const res = await axios({
      method: "post",
      url: "http://127.0.0.1:2000/api/v1/user/signin",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.assign("/home");
      });
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};
document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
});
