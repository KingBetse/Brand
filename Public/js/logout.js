const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:2000/api/v1/user/logout",
    });

    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.assign("/home");
      });
    }
  } catch (err) {
    alert(err.response);
  }
};

logout();
