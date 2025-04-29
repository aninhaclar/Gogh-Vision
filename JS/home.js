'use strict'

const galeria = document.getElementById('galeria')
const fotosMain = document.getElementById('fotos')
const modal = document.getElementById('modal')
const modalContent = document.getElementById('modal-content')
const fecharModal = document.getElementById('fecharModal')

// Buscar stories
async function pesquisarStories() {
    const url = 'https://back-spider.vercel.app/storys/listarStorys'
    const response = await fetch(url)
    const data = await response.json()
    return data
}

// Criar stories na galeria
function criarStories(story) {
    const novaImg = document.createElement('img')
    novaImg.src = story.imagem
    galeria.appendChild(novaImg)
}

// Buscar publicações
async function pesquisarFotos() {
    const url = 'https://back-spider.vercel.app/publicacoes/listarPublicacoes'
    const response = await fetch(url)
    const data = await response.json()
    return data
}

// Buscar usuário por ID
async function pesquisarUser(id) {
    const url = `https://back-spider.vercel.app/user/pesquisarUser/${id}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

// Criar post com nome do usuário
async function criarPosts(post) {
    const usuario = await pesquisarUser(post.idUsuario)

    const divPublicacao = document.createElement('div')
    divPublicacao.classList = 'divPublicacao'

    const card = document.createElement('div')
    card.classList = 'card'

    const novaImg = document.createElement('img')
    novaImg.src = post.imagem

    const divTextos = document.createElement('div')
    divTextos.classList = 'divTextos'

    const nome = document.createElement('h3')
    nome.textContent = usuario.nome

    const descricao = document.createElement('p')
    descricao.textContent = post.descricao

    // Botões de curtir e comentar
    const botoes = document.createElement('div')
    botoes.classList = 'botoes'

    const botaoCurtir = document.createElement('button')
    botaoCurtir.classList = 'botao'
    botaoCurtir.textContent = 'Curtir'
    botaoCurtir.addEventListener('click', () => {
        alert('Você curtiu a postagem!')
    })

    const botaoComentar = document.createElement('button')
    botaoComentar.classList = 'botao'
    botaoComentar.textContent = 'Comentar'
    botaoComentar.addEventListener('click', () => {
        abrirModal(post.id)
    })

    botoes.appendChild(botaoCurtir)
    botoes.appendChild(botaoComentar)

    divTextos.appendChild(nome)
    divTextos.appendChild(descricao)
    divTextos.appendChild(botoes)

    divPublicacao.appendChild(novaImg)
    divPublicacao.appendChild(divTextos)

    card.appendChild(divPublicacao)

    fotosMain.appendChild(card)
}

// Abrir o modal para comentar
function abrirModal(postId) {
    modal.style.display = 'flex'
    modalContent.innerHTML = `
        <h2>Comente sobre a postagem</h2>
        <textarea id="comentario" placeholder="Escreva seu comentário..."></textarea>
        <button class="fechar" id="fecharModal">Fechar</button>
        <button id="enviarComentario">Enviar</button>
    `
    const enviarComentario = document.getElementById('enviarComentario')
    enviarComentario.addEventListener('click', () => {
        const comentario = document.getElementById('comentario').value
        if (comentario) {
            alert(`Comentário enviado: ${comentario}`)
        } else {
            alert('Por favor, escreva um comentário.')
        }
    })

    fecharModal.addEventListener('click', () => {
        modal.style.display = 'none'
    })
}

// Carregar tudo
async function preencherFotos() {
    const storys = await pesquisarStories()
    const fotos = await pesquisarFotos()

    storys.forEach(criarStories)
    fotos.forEach(criarPosts)
}

preencherFotos()
