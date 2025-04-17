document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    try {
      const resposta = await fetch("https://back-spider.vercel.app/publicacoes/listarPublicacoes", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const usuario = await resposta.json();
  
      document.querySelector("h2").textContent = usuario.nome;

    } catch {
      alert("Erro ao carregar perfil.");
    }
  });