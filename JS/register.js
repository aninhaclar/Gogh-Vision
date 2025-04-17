document.querySelector("button").addEventListener("click", async () => {
  const nome = document.querySelector("#nome").value;
  const email = document.querySelector("#email").value;
  const senha = document.querySelector("#senha").value;
  const premium = document.querySelector("#premium").value;
  const pergunta = document.querySelector("#pergunta").value;
  const profileImage = document.querySelector("#profileImage").files[0];

  // Primeiro fazemos o upload da imagem (se existir)
  let imagemPerfilUrl = ""; // URL padrão vazia ou uma imagem padrão
  
  if (profileImage) {
    try {
      // Substitua esta função pelo seu serviço de upload real
      imagemPerfilUrl = await uploadImage(profileImage); 
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      alert("Erro ao enviar a imagem de perfil");
      return;
    }
  }

  // Depois enviamos os dados para sua API
  try {
    const resposta = await fetch("https://back-spider.vercel.app/user/cadastrarUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        nome, 
        email, 
        senha, 
        premium,
        imagemPerfil: imagemPerfilUrl, // Usamos a URL obtida
        senhaRecuperacao: pergunta 
      })
    });

    const dados = await resposta.json();
    
    if (resposta.ok) {
      alert("Cadastro realizado com sucesso!");
      window.location.href = "index.html";
    } else {
      alert(dados.mensagem || "Erro ao cadastrar.");
    }
  } catch (erro) {
    console.error("Erro:", erro);
    alert("Erro na conexão com a API.");
  }
});

// Função exemplo para upload de imagem (substitua pelo seu serviço real)
async function uploadImage(imageFile) {
  // Exemplo usando ImgBB (você precisará de uma API key)
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
  
  return data.data.url; // Retorna a URL da imagem
}