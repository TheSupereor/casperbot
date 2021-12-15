const form = document.getElementById('log-form')
form.addEventListener('submit', Login)

async function Login(e){
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const result = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then((res) => res.json())

    if(result.status === 'ok'){
        console.log('token: '+ result.data);
        //salvando o token
        sessionStorage.setItem('token', result.data);
        alert('Usuário logado!');
	    // -------------------- rodando em um live server local ----------------
		location.href = 'http://localhost:5500/casperbot/pages/News/news.html'
    }else{
        alert(result.error)
    }
}