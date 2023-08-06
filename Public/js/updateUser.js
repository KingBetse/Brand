const updateME = async (firstname, lastname, email, city) => {
  try {
    const res = await axios({
      method: "patch",
      url: `http://127.0.0.1:2000/api/v1/user`,
      data: {
        firstname,
      },
    });

    if (res.data.status === "succsesful") {
      alert(res.data.message);
      window.setTimeout(() => {
        location.assign("/home");
      }, 500);
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
  const address = document.getElementById("address").value;
  updateME(firstname, lastname, email, address);
});
