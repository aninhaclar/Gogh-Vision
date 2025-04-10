document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    try {
      const resposta = await fetch("https://suaapi.com/perfil", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const usuario = await resposta.json();
  
      document.querySelector("h2").textContent = usuario.nome;
      document.querySelector("p").textContent = `Email: ${usuario.email}`;
    } catch {
      alert("Erro ao carregar perfil.");
    }
  });