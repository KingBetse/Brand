// import axios from "axios";

const register = async (firstname, lastname, email, password, city) => {
  try {
    const res = await axios({
      method: "post",
      url: "http://127.0.0.1:2000/api/v1/user/signup",
      data: {
        // name: {
        firstname,
        lastname,
        // }
        email,
        password,
        // address: {
        city,
        // },
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
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const address = document.getElementById("address").value;
  register(firstname, lastname, email, password, address);
});
