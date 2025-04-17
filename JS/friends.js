document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    try {
      const resposta = await fetch("https://suaapi.com/amigos", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const amigos = await resposta.json();
  
      const lista = document.querySelector(".friends-list");
      lista.innerHTML = amigos.map(nome => `<li>${nome}</li>`).join("");
    } catch {
      alert("Erro ao carregar amigos.");
    }
  });
  