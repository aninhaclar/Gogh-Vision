'use strict'

const botaoRecuperar = document.querySelector("button")  //Busca pelo botão
const modal = document.querySelector("dialog") //Busca pelo dialog e adiciona ele na variável
const botaoModificar = document.querySelector("dialog button") //Busca pelo botão que está dentro do dialog

const recuperarSenha = async () => {
    let email = document.getElementById('email').value
    let palavra = document.getElementById('palavraChave').value
    let url = "https://back-spider.vercel.app/user/RememberPassword"

    if( email            == '' || email            == null || email            == undefined || 
        palavra          == '' || palavra          == null || palavra          == undefined 
    )
    {
        alert('Dados não preenchidos corretamente!') //até aqui está ok

    }else{
        let data = {
            email: email,
            wordKey: palavra
        }

        console.log(data);
        
    
        let options = {
            method: 'Post',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    
        const response = await fetch(url, options)


        const responseData = await response.json();
        
        localStorage.setItem('idUser', responseData.id)
        
        if(response.ok){
            botaoRecuperar.onclick = function(){
                modal.showModal()
            } 
        }else{    
            alert('Dados inválidos')
        } 
    }
}

const modificarSenha = async function(id) {
    let novaSenha = document.getElementById('senha').value
    let confirmarSenha = document.getElementById('confirmar').value
    let url = `https://back-spider.vercel.app/user/newPassword/${id}`

    if(
        novaSenha      == '' || novaSenha      == null || novaSenha      == undefined ||
        confirmarSenha == '' || confirmarSenha == null || confirmarSenha == undefined
    ){
        alert('Dados não preenchidos corretamente!')
    }else{
   
        let data = {
            senha: novaSenha
        }
        let options = {
            method: 'PUT',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)

        console.log( await response);

        if(response.ok){
            alert("Senha Alterada com Sucesso !")
            return true
        }else{
            alert('Não foi possível modificar a senha')
        }
    }
}


botaoModificar.onclick = async function(){

    let idUser = localStorage.getItem("idUser")

    const validaPassword = await modificarSenha(idUser)
    
    if (validaPassword){
        modal.close()   
        window.location.href = "../../index.html"
    }



}


document.getElementById('recuperar').addEventListener('click', recuperarSenha)



