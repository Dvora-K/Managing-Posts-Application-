document.getElementById('logOut').addEventListener('click', onLoggedOut);
function onLoggedOut() {
   isLogIn = false;
   let data = JSON.parse(localStorage.getItem('current-user'));
   let email = data.email;
   data.isLogOut = true;
   localStorage.setItem('current-user', JSON.stringify(data));
   let userData = JSON.parse(localStorage.getItem(`${email}`));
   userData.lastPage = currPage;
   localStorage.setItem(`${email}`, JSON.stringify(userData));
   let div = document.querySelector(".dropdown");
   div.classList.remove('hide');
   document.getElementById("logOut").classList.add("hide");
   document.getElementById("Todos").classList.add("hide");
   showCurrentPage('Home');
}