document.querySelector("button").addEventListener("click", async () => {
  const email = document.querySelector("input[type='email']").value;
  const pergunta = document.querySelector("input[type='text']").value;

  if (!email || !pergunta) {
    alert("Preencha todos os campos.");
    return;
  }

  try {
    const resposta = await fetch("https://back-spider.vercel.app/user/VerificaWordKey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, pergunta })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      // Se usuário e wordkey estão corretos, abre o modal
      document.getElementById("modalSenha").style.display = "block";
    } else {
      alert(dados.mensagem || "Usuário ou wordkey incorretos.");
    }
  } catch (erro) {
    alert("Erro na conexão com a API.");
  }
});

async function confirmarNovaSenha() {
  const email = document.querySelector("input[type='email']").value;
  const pergunta = document.querySelector("input[type='text']").value;
  const novaSenha = document.getElementById("novaSenha").value;
  const confirmar = document.getElementById("confirmarSenha").value;

  if (!novaSenha || novaSenha !== confirmar) {
    alert("As senhas não coincidem ou estão vazias.");
    return;
  }

  try {
    const resposta = await fetch("https://back-spider.vercel.app/user/RememberPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, pergunta, novaSenha })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alert("Senha redefinida com sucesso!");
      window.location.href = "login.html";
    } else {
      alert(dados.mensagem || "Erro ao redefinir senha.");
    }
  } catch (erro) {
    alert("Erro na conexão com a API.");
  }
}
