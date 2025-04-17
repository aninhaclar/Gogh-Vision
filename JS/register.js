document.querySelector("button").addEventListener("click", async () => {
  const nome = document.querySelector("#nome").value;
  const email = document.querySelector("#email").value;
  const senha = document.querySelector("#senha").value;
  const premium = document.querySelector("#premium").value;
  const pergunta = document.querySelector("#pergunta").value;
  const profileImage = document.querySelector("#profileImage").files[0];


  let imagemPerfilUrl = ""; 
  
  if (profileImage) {
    try {
      imagemPerfilUrl = await uploadImage(profileImage); 
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      alert("Erro ao enviar a imagem de perfil");
      return;
    }
  }

  try {
    const resposta = await fetch("https://back-spider.vercel.app/user/cadastrarUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        nome, 
        email, 
        senha, 
        premium,
        imagemPerfil: imagemPerfilUrl, 
        senhaRecuperacao: pergunta 
      })
    });

    const dados = await resposta.json();
    
    if (resposta.ok) {
      alert("Cadastro realizado com sucesso!");
      window.location.href = "login.html";
    } else {
      alert(dados.mensagem || "Erro ao cadastrar.");
    }
  } catch (erro) {
    console.error("Erro:", erro);
    alert("Erro na conexão com a API.");
  }
});

async function uploadImage(imageFile) {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const response = await fetch('https://api.imgbb.com/1/upload?key=33e84e9ce7a8aed481bd0a36516a0e38', {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error.message || "Falha no upload da imagem");
  }
  
  return data.data.url; 
}