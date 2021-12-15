const form = document.getElementById('reg-form')
form.addEventListener('submit', registerUser)

async function registerUser(e){
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const result = await fetch('http://localhost:3000/api/v1/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then((res) => res.json())

    if(result.status == 'Usuário criado com sucesso'){
        alert(result.status)
    }else{
        alert('Erro: '+result.error)
    }
}