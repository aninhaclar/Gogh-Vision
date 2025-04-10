'use strict'

const botaoRecuperar = document.querySelector("button")
const modal = document.querySelector("dialog")
const boataoModificar = document.querySelector("dialog button") 

const recuperarSenha = async () => {
    let email = document.getElementById('email').value
    let palavra = document.getElementById('palavraChave').value
    let url = "https://back-spider.vercel.app/user/RememberPassword"

    if( email            == '' || email            == null || email            == undefined || 
        palavra          == '' || palavra          == null || palavra          == undefined 
    )
    {
        alert('Dados não preenchidos corretamente!')

    }else{
        let data = {
            email: email,
            wordKey: palavra
        }
    
        let options = {
            method: 'Post',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    
        const response = await fetch(url, options)
        
        if(response.status == 200){
            //Cria uma função definindo o que acontecerá quando clicar no botão
            botaoRecuperar.onclick = function(){   
                modal.showModal()                      
            }     
            
            boataoModificar.onclick = async function(id){
                let senha = document.getElementById('senha')
                let confirmar = document.getElementById('confirmar')
                let url2 = `https://back-spider.vercel.app/user/newPassword/${id}`

                if(
                    senha     == '' || senha     == null || senha     == undefined ||
                    confirmar == '' || confirmar == null || confirmar == undefined
                ){
                    alert('Os dados não foram preenchidos corretamente!')
                }else{
                    let data = {
                        senha: senha,
                        senha: confirmar
                    }

                    let options = {
                        method: 'Post',
                        headers:{
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    }

                    const response = await fetch(url2, options)
                    
                    if(response.status == 200){
                        modal.close()
                    }else{
                       alert('Dados inválidos')
                    }
                }
                
                
            }
            
        }else{    
            alert('Dados inválidos')
        } 
    }
}


document.getElementById('recuperar').addEventListener('click', recuperarSenha)



//Rascunhos

/** Maneiras de mostrar um modal:
 * - show() -> Mostra o modal abaixo do botão
 * - showModal() -> Mostra o modal personalizado 
 *      *centralizado na tela com fundo
 *      *para sair é só apertar a tecla esc
 * - close() -> Fecha o modal
*/