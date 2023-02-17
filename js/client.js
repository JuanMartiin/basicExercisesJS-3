let button = document.getElementById("login-btn");
const user = document.getElementById('user');
const password = document.getElementById('password');



async function login(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
  }

  button.addEventListener('click', () =>{
    init();
  })

async function authenticated(url) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}

async function init() {
    await login("http://localhost:3000/login", {
        user: user.value,
        password: password.value,
    }).then(res => {
        token = res.data.token;
    }).catch(res => {
        console.log('Something went wrong');
    });
    console.log("Token: " + token);

    authenticated("http://localhost:3000/authenticated")
    .then(res => {
        console.log(res.message);
    }).catch(res => console.log(res));
}