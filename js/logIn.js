document.getElementById('btnLogin').addEventListener('click', checkIsUserExist);
//פונקציה שבודקת האם המשתמש קיים
function checkIsUserExist() {
    let email = document.getElementById("emailUser").value;
    let psw = document.getElementById("passwordUser").value;
    let dataFromTheStorage = JSON.parse(localStorage.getItem(`${email}`));
    checkExists(email);
    if (dataFromTheStorage != null && dataFromTheStorage.password == psw) {
        insertUserDetails(email);
    }
    //אם המשתמש אינו קיים בלוקל נשלח בקשה לבדיקה בשרת
    createGetRequest(`users?email=${email}`, onResponseLogIn);
}
//הפונקציה מופעלת כתגובה לשרת 
function onResponseLogIn(e) {
    if (e.target.status >= 200 && e.target.status < 300 && e.target.responseText != "[]") {
        let data = JSON.parse(e.target.responseText)[0];
        let psw = document.getElementById("passwordUser").value;
        let dataFromTheStorage = {
            password: psw,
            lastPage: 'Home',
            name: data.name,
            email: data.email,
            id: data.id
        };
        localStorage.setItem(`${data.email}`, JSON.stringify(dataFromTheStorage));
        insertUserDetails(email);

    } else
        alert('one or more from the details are wrongs')
}

function insertUserDetails(email, ) {
    let currUser = {
        email: email,
        isLogOut: false
    };
    isLogIn = true;
    localStorage.setItem('current-user', JSON.stringify(currUser));
    userData = JSON.parse(localStorage.getItem(`${email}`));
    showCurrentPage(userData.lastPage);
    changeIndexAfterLogIn();
}