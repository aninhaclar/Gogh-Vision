'use strict'

const buttonCadastrar = document.getElementById('cadastrar')

// Criar função como arrow function
const cadastrarUser = async () => {
    const user = document.getElementById('user').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha1').value
    const confirmarSenha = document.getElementById('senha2').value
    const palavra = document.getElementById('palavra').value
    const imagem = document.getElementById('imagem').value
    const check = document.getElementById('inputCheck').value

    if (user == '' || user == null || user == undefined ||
        email == '' || email == null || email == undefined ||
        senha == '' || senha == null || senha == undefined ||
        confirmarSenha == '' || confirmarSenha == null || confirmarSenha == undefined ||
        palavra == '' || palavra == null || palavra == undefined ||
        imagem == '' || imagem == null || imagem == undefined ||
        check == '' || check == null || check == undefined
    ) {
        alert('Dados não preenchidos!')
    } else {

        if (senha == confirmarSenha) {
            const data = {
                nome: user,
                email: email,
                senha: senha,
                premium: check,
                imagemPerfil: imagem,
                senhaRecuperacao: palavra
            }

            const url = "https://back-spider.vercel.app/user/cadastrarUser"

            const options = {
                method: 'Post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data) // Stingify -> serve para mudar o formato do que tem dentro da data para o formato de Json 
            }

            const response = await fetch(url, options)

            if (response.status == 201) {
                window.location.href = "../../index.html" // Navegaer para outra tela 
            }

        } else {
            alert('Senha e confirmar senha não estão corretas')
        }
    }
}

// Mudar visibilidade da senha 
// Imagens de olhos 
const imgOlhoAberto1 = "https://cdn-icons-png.flaticon.com/512/11502/11502607.png";
const imgOlhoFechado1 = "https://cdn-icons-png.flaticon.com/512/9726/9726597.png";

const senhaInput = document.getElementById("senha1");
const escondido1 = document.getElementById("senhaEscondida")
const confirmarSenhaInput = document.getElementById("senha2");
const escondido = document.getElementById("senhaEscondida1");

// senha
const changeVisiblePassword = () => {

    if (senhaInput.type === "password") {
        senhaInput.type = "text";
        escondido1.src = imgOlhoAberto1;
    } else {
        senhaInput.type = "password";
        escondido1.src = imgOlhoFechado1;
    }
}

// confirmar senha
const changeVisibleConfirmPassword = () => {

    if (confirmarSenhaInput.type === "password") {
        confirmarSenhaInput.type = "text";
        escondido.src = imgOlhoAberto1;
    } else {
        confirmarSenhaInput.type = "password";
        escondido.src = imgOlhoFechado1;
    }
}


buttonCadastrar.addEventListener('click', cadastrarUser)