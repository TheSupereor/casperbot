//verificação simples se usuário está autenticado
let token = sessionStorage.getItem('token')
//console.log(token)
if(!token){
	alert('Usuário não autenticado, redirecionando')
	location.href = 'http://localhost:5500/casperbot/pages/Auth/login.html'
}


// modal para adicionar documento
var modalAdd = document.getElementById("modalAdd")
var modalButton = document.getElementById("adNoticia")
var closeButtonAdd = document.getElementById("close-button-add")

modalButton.onclick = () => {
	modalAdd.style.display = "block"
};

closeButtonAdd.onclick = () => {
	modalAdd.style.display = "none"
};

window.onclick = (e) => {
	if (e.target == modalAdd) {
		modalAdd.style.display = "none"
	}
}

// restante

	// carregar noticias

	var listaNoticias = [];

	const tabelaNoticias = document.querySelector('#listaNoticias')

	const PegarListaNoticias = () => {
			fetch('http://localhost:3000/api/v1/noticias').then((res) =>{
					return res.json()
			}).then((data) => {
					data.items.forEach(noticia => {
						//criando os elementos no front
							let tr = document.createElement('tr');

							let imagem = document.createElement('td')
							let imgLink = document.createElement('a')

							let titulo = document.createElement('td')
							let descricao = document.createElement('td')
							let tema = document.createElement('td')

							let link = document.createElement('td')
							let newsLink = document.createElement('a')

							let acoes = document.createElement('td')

							let botaoEditar = document.createElement('button')
							botaoEditar.classList.add('SimpleButton')
							botaoEditar.setAttribute('id', 'editar')
							botaoEditar.setAttribute('data-id', noticia._id)
							botaoEditar.textContent = 'Editar';
							botaoEditar.onclick = () => EditarNoticia(noticia._id);

							let botaoExcluir = document.createElement('button')
							botaoExcluir.classList.add('SimpleButton')
							botaoExcluir.setAttribute('id', 'excluir')
							botaoExcluir.setAttribute('data-id', noticia._id)
							botaoExcluir.textContent = 'Excluir'
							botaoExcluir.onclick = () => ExcluirNoticia(noticia._id);

							acoes.appendChild(botaoEditar)
							acoes.appendChild(botaoExcluir)

							imgLink.setAttribute('href', noticia.imagem)
							imgLink.setAttribute('target', '_blank')
							imgLink.textContent = noticia.imagem;
							imagem.appendChild(imgLink)

							newsLink.setAttribute('href', noticia.link)
							newsLink.setAttribute('target', '_blank')
							newsLink.textContent = noticia.link;
							link.appendChild(newsLink)

							titulo.textContent = noticia.titulo;
							descricao.textContent = noticia.descricao;
							tema.textContent = noticia.tema;

							tr.appendChild(imagem);
							tr.appendChild(titulo);
							tr.appendChild(descricao);
							tr.appendChild(tema);
							tr.appendChild(link);
							tr.appendChild(acoes);
							tabelaNoticias.appendChild(tr)
					})
			})
	}

	//pegando as noticias ao carregar a página
	document.onload = PegarListaNoticias();

// Enviar nova noticia

var AdicionarNoticia = document.getElementById("NovaNoticia")

AdicionarNoticia.onclick = e => {
	e.preventDefault();

	var LinkImagemNoticia = document.getElementById('news-image').value;
	var TituloNoticia = document.getElementById('news-title').value;
	var DescNoticia = document.getElementById('news-desc').value;
	var TemaNoticia = document.getElementById('news-theme').value;
	var LinkNoticia = document.getElementById('news-link').value;

	//validação simples
	if(LinkImagemNoticia == ''|| TituloNoticia == '' || DescNoticia == ''
	|| TemaNoticia == '' || LinkNoticia ==''){
		alert("Preencha todos os campos!")
		return false
	}

	const noticia = {
		imagem: LinkImagemNoticia,
		titulo: TituloNoticia,
		descricao: DescNoticia,
		tema: TemaNoticia,
		link: LinkNoticia
	}

	const response = fetch('http://localhost:3000/api/v1/noticias', {
		method: 'POST',
		body: JSON.stringify(noticia),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((res) => {
		if (res.ok){
			alert("Noticia adicionada com sucesso!")
			modalAdd.style.display = "none"
		}
		//recarregar para mostrar nova noticia
	}).then(setTimeout(() => { window.location.reload() }, 3000))
}

//editar noticia

function EditarNoticia(id) {
	//abrir modal
	var modalEdit = document.getElementById("modalEdit")
	modalEdit.style.display = "block"

	var closeButtonEdit = document.getElementById("close-button-edit")

	closeButtonEdit.onclick = () => {
		modalEdit.style.display = "none";
	};

	window.onclick = (e) => {
		if (e.target == modalEdit) {
			modalEdit.style.display = "none";
		}
	}

	//preencher campos
	var LinkImagemNoticiaEdit = document.getElementById('news-image-edit');
	var TituloNoticiaEdit = document.getElementById('news-title-edit');
	var DescNoticiaEdit = document.getElementById('news-desc-edit');
	var TemaNoticiaEdit = document.getElementById('news-theme-edit');
	var LinkNoticiaEdit = document.getElementById('news-link-edit');
	var BotaoEnviarNoticiaAtualizada = document.getElementById('EditarNoticia');

	fetch(`http://localhost:3000/api/v1/noticias/${id}`).then((res) =>{
		return res.json()
	}).then((data) => {
		LinkImagemNoticiaEdit.value = data.item.imagem;
		TituloNoticiaEdit.value = data.item.titulo;
		DescNoticiaEdit.value = data.item.descricao;
		TemaNoticiaEdit.value = data.item.tema;
		TemaNoticiaEdit.text = data.item.tema;
		LinkNoticiaEdit.value = data.item.link;
		BotaoEnviarNoticiaAtualizada.setAttribute('data-id', data.item._id)
	})

	//atualizando dados
	BotaoEnviarNoticiaAtualizada.onclick = (e) => {
		const id = BotaoEnviarNoticiaAtualizada.dataset.id;
		e.preventDefault();

		//validação simples
		if(LinkImagemNoticiaEdit == ''|| 
				TituloNoticiaEdit == '' || 
				DescNoticiaEdit == ''|| 
				TemaNoticiaEdit == '' || 
				LinkNoticiaEdit ==''){
			alert("Preencha todos os campos!")
			return false
		}

		const response = fetch(`http://localhost:3000/api/v1/noticias/${id}`, {
			method: 'PUT',
			body: JSON.stringify({
				imagem: LinkImagemNoticiaEdit.value,
				titulo: TituloNoticiaEdit.value,
				descricao: DescNoticiaEdit.value,
				tema: TemaNoticiaEdit.value,
				link: LinkNoticiaEdit.value
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			if (res.ok){
				alert("Noticia Atualizada com sucesso!")
				modalEdit.style.display = "none"
			}else{
				console.log(res)
			}
			//recarregar para mostrar nova noticia
		}).then(setTimeout(() => { window.location.reload() }, 3000))
	}
}

//excluir noticia
function ExcluirNoticia(id){
	fetch(`http://localhost:3000/api/v1/noticias/${id}`,{
		method: 'DELETE'
	}).then(alert("Noticia Deletada com sucesso!"))
		.then(setTimeout(() => { window.location.reload() }, 3000))
}