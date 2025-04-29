'use strict'

const galeria = document.getElementById('galeria')
const header = document.getElementById('barraCima')
const modal = document.querySelector('dialog')
const divModal = document.getElementById('divModal')


async function pesquisarFotos() {
    const url = `https://back-spider.vercel.app/publicacoes/listarPublicacoes` // url da api 

    const response = await fetch(url) // fetch -> faz requisições web (conversa com o back)
    const data = await response.json() // chamar apenas o json
    return data
}

async function pesquisarUser() {
    const url = `https://back-spider.vercel.app/user/listarUsers`

    const response = await fetch(url)
    const data = await response.json()
    return data
}

// Função para criar as imgs dentro da DIV 
function criarImagem(link) { // Recebe o link da imagem 
    const novaImg = document.createElement('img') // criando nova imagem 
    novaImg.src = link.imagem // Cria a nova image, com a link da foto do API
    novaImg.addEventListener('click', () => mostrarDetales(link))

    galeria.appendChild(novaImg)
}

function mostrarDetales(link) {

    modal.showModal()

    const icon = document.createElement('div')
    icon.className = 'icons'

    // Icon de X para fechar a página
    const x = document.createElement('img')
    x.className = 'closeDetalhe'
    x.src = 'https://icones.pro/wp-content/uploads/2021/08/icone-x-avec-cercle-noir.png'
    x.id = 'closeDetalhe'
    x.addEventListener('click', () => closeDetalhe())
    divModal.appendChild(x)

    const novaImg = document.createElement('img')
    novaImg.src = link.imagem
    novaImg.id = 'imgPrincipal'
    divModal.appendChild(novaImg)

    const descricao = document.createElement('span')
    descricao.textContent = link.descricao
    icon.appendChild(descricao)

    const comentario = document.createElement('img')
    comentario.src = 'https://cdn.iconscout.com/icon/free/png-256/free-comentario-3251596-2724645.png'
    icon.appendChild(comentario)

    const coracao = document.createElement('img')
    coracao.src = 'https://cdn-icons-png.flaticon.com/512/1330/1330225.png'
    coracao.id = 'coracao'
    icon.appendChild(coracao)

    divModal.appendChild(icon)

    modal.appendChild(divModal)
}

// fecha o modal ao clicar fora dele
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        divModal.textContent = ""
        modal.close()
    }
})

function criarUsuario(link) {
    const divUser = document.createElement('div')
    divUser.className = 'divUser'

    const userImg = document.createElement('img')
    userImg.src = link.imagemPerfil
    divUser.appendChild(userImg)

    const username = document.createElement('h3')
    username.textContent = link.nome
    divUser.appendChild(username)

    header.appendChild(divUser)
}

// Função para fechar a tela detalhes
const closeDetalhe = () => {
    divModal.textContent = ""
    modal.close()
}

async function preencherTela() {
    const fotos = await pesquisarFotos()
    const usuarios = await pesquisarUser()
    const idUser = localStorage.getItem('idUser')

    fotos.forEach(item => {
        console.log(item);
        console.log(idUser);

        if (item.idUsuario == idUser) {
            criarImagem(item)
        }
    })

    usuarios.forEach(user => {
        if (user.id == idUser) {
            console.log(user)
            criarUsuario(user)
        }
    })
}

preencherTela()