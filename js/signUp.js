document.getElementById("btnSighUp").addEventListener('click', insertUserData)

function insertUserData() {
    let email = document.getElementById("email").value;
    let name = document.getElementById("name").value;
    let psw = document.getElementById("password").value;
    let gender = document.getElementById("gender").innerHTML;
    if (!checkExists(email)) {
        alert("Please enter a valid email address.");
    }
    let userData = {
        name: name,
        gender: gender,
        email: email,
        status: 'active'
    };
    userData = JSON.stringify(userData)
    createPostRequest('users', checkCreatingUser, userData);
    let storageData = {
        password: psw,
        lastPage: 'Home',
        name: name,
        email: email,
        id: 123
    };
    localStorage.setItem(`${email}`, JSON.stringify(storageData));
}

function checkCreatingUser(e) {
    if (e.target.status >= 200 && e.target.status < 300) {
        alert('You have successfully registered');
        let response = JSON.parse(e.target.response);
        let storageData = JSON.parse(localStorage.getItem(`${response.email}`));
        storageData.id = response.id;
        localStorage.setItem(response.email, JSON.stringify(storageData));
    } else {
        alert('something go wrong...')
    }

}