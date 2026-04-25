// Função para garantir que os botões funcionem em todo o site
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Configurar o botão "CADASTRAR-ME" ou "QUERO SER DESBRAVADOR"
    const botoesCadastro = document.querySelectorAll('.btn-amarelo, #btn-cadastrar-topo');
    
    botoesCadastro.forEach(botao => {
        botao.addEventListener('click', (e) => {
            // Se for um link <a>, deixa o href funcionar, senão força a navegação
            if (!botao.href) {
                window.location.href = 'cadastro.html';
            }
        });
    });

    // 2. Configurar o botão de LOGIN (Membro ou Admin)
    const btnLogin = document.querySelector('.btn-login');
    if (btnLogin) {
        btnLogin.addEventListener('click', () => {
            window.location.href = 'login-membro.html';
        });
    }

    console.log("Sistema Clube Águia: Motor Principal Ativo! 🦅");
});
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.btn-missao');
    
    if (btn) {
        btn.addEventListener('click', function(e) {
            console.log("Botão clicado! Iniciando navegação...");
            window.location.href = 'cadastro.html';
        });
    }
});