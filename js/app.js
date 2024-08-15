let main = document.querySelector('main');
let currPostId;
const baseURL = "https://gorest.co.in/public/v2";
let current = JSON.parse(localStorage.getItem('current-user'));
let userData;
let isLogIn;
let prevPage;
let currPage;
let emailRegex = /\+@\S+\.\S+/;
//  עידכון האתר למצב looged 
(function() {
    currPage = 'Home';
    showCurrentPage(currPage);
    if (current != null) {
        userData = JSON.parse(localStorage.getItem(`${current.email}`))
        isLogIn = !(JSON.parse(localStorage.getItem('current-user')).isLogOut);
        if (current.isLogOut) {} else {
            changeIndexAfterLogIn();
        }
    } else
        isLogIn = false;
})()
document.querySelectorAll('nav button').forEach(link => link.addEventListener('click', whichPageToShow));
window.addEventListener('popstate', onHistoryButtonClick);
document.getElementById("LogIn").addEventListener('click', showLoginPage);
document.getElementById("SignUp").addEventListener('click', showSignUpPage);
//פונקציה כללית לשליחת בקשות get
function createGetRequest(endLink, loadFunction) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${baseURL}/${endLink}`);
    xhr.setRequestHeader('Authorization', 'Bearer e616dc1b37550426eca9574c1f6f9b2183b62a4aa22882fa3153338e0036fa24');
    xhr.addEventListener('load', loadFunction);
    xhr.send();
}
//פונקציה כללית לשליחת בקשות post
function createPostRequest(endLink, loadFunction, objectToSend) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${baseURL}/${endLink}`);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer e616dc1b37550426eca9574c1f6f9b2183b62a4aa22882fa3153338e0036fa24');
    xhr.addEventListener('load', loadFunction);
    xhr.send(objectToSend);
}

//פונקציה להפעלת דף הlogin
function showLoginPage(e) {
    e.preventDefault();
    main.innerHTML = '';
    var temp = document.querySelector("#LogInT");
    var clonedTemplate = temp.content.cloneNode(true);
    document.querySelector('main').appendChild(clonedTemplate);
    history.pushState({}, "LogIn", '#' + "LogIn");

}
//signupפונקציה שמפעילה את דף 
function showSignUpPage(e) {
    e.preventDefault();
    main.innerHTML = '';
    var temp = document.querySelector("#SignUpT");
    var clonedTemplate = temp.content.cloneNode(true);
    document.querySelector('main').appendChild(clonedTemplate);
    history.pushState({}, "SignUp", '#' + "SignUp");
}

function whichPageToShow(e) {
    let currentPageToShow = e.target.id;
    if (currentPageToShow != 'logOut') { showCurrentPage(currentPageToShow); }
}

function showCurrentPage(currentPageToShow) {
    prevPage = currPage;
    currPage = currentPageToShow;
    if (prevPage != currPage || prevPage == "Home" && currPage == "Home") {
        main.innerHTML = '';
        var temp = document.querySelector(`#${currentPageToShow}T`);
        var clonedTemplate = temp.content.cloneNode(true);
        main.appendChild(clonedTemplate);
        history.pushState({}, currPage, '#' + currPage);
    }
}

function onHistoryButtonClick() {
    showCurrentPage(location.hash.replace('#', ''));
}

function changeIndexAfterLogIn() {
    let div = document.querySelector(".dropdown");
    div.classList.add('hide');
    document.querySelector("#logOut").classList.remove("hide");
    document.getElementById("Todos").classList.remove("hide");
}
//בדיקת תקינות
function checkExists(email) {
    if (emailRegex.test(email))
        return false;
    else
        return true;
}