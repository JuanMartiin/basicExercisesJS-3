let button = document.getElementById("login-btn");
const user = document.getElementById('user');
const password = document.getElementById('password');
var token;


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
        if(res.data == false){
            document.getElementById('error').style.display = 'block';
            document.getElementById('log').style.display = 'none';
        }
        token = res.data.token;
        console.log(token);
    }).catch(res => {
        console.log('Something went wrong');
    });

    authenticated("http://localhost:3000/authenticated")
    .then(res => {
        if( res.data == true ){
            document.getElementById('log').style.display = 'block';
            document.getElementById('error').style.display = 'none';
        }
    }).catch(res => console.log(res));
}