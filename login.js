document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('emailLogin').value;
    const senha = document.getElementById('senhaLogin').value;

    // Lista de Admins Autorizados
    const admins = [
        "merychacale@email.com", // Substitua pelo seu e-mail real
        "daltongabriel@email.com" // Substitua pelo e-mail do Dalton
    ];

    if (admins.includes(email) && senha === "123456") { // Defina uma senha forte aqui
        alert("Bem-vindo, Comandante!");
        window.location.href = "painel-admin.html"; // Vai para a área de controle total
    } else {
        // Se não for admin, tenta entrar como membro (lógica futura)
        alert("Acesso como Membro.");
        window.location.href = "painel-membro.html";
    }
});
window.fazerLogin = function() {
    const user = document.getElementById('login_user').value;
    const pass = document.getElementById('login_pass').value;
    
    let contas = JSON.parse(localStorage.getItem('usuarios_aguias')) || [];
    
    const contaValida = contas.find(c => c.user === user && c.pass === pass);
    
    if (contaValida) {
        alert("Acesso Autorizado! Bem-vindo, " + user);
        window.location.href = "perfil.html";
    } else {
        alert("Usuário ou Senha incorretos!");
    }
};
// login.js - Sistema de Autenticação Águia
console.log("Sistema de Segurança: Operacional");

window.fazerLogin = function() {
    // 1. Captura o que o utilizador escreveu
    const usuarioDigitado = document.getElementById('login_user').value.trim();
    const senhaDigitada = document.getElementById('login_pass').value.trim();

    // Validação básica de campos vazios
    if (!usuarioDigitado || !senhaDigitada) {
        alert("Comandante, preencha todos os campos!");
        return;
    }

    // 2. Procura na "Base de Dados" (LocalStorage)
    // Buscamos a lista de usuários que guardámos no momento do cadastro
    let contas = JSON.parse(localStorage.getItem('usuarios_aguias')) || [];

    // 3. Verifica se existe alguém com esse nome E essa senha
    const contaEncontrada = contas.find(conta => 
        conta.user.toLowerCase() === usuarioDigitado.toLowerCase() && 
        conta.pass === senhaDigitada
    );

    if (contaEncontrada) {
        // Sucesso! Guardamos quem está logado para o Perfil saber quem mostrar
        localStorage.setItem('usuario_logado', usuarioDigitado);
        
        alert(`Bem-vindo de volta, ${usuarioDigitado}! Acesso autorizado.`);
        
        // 4. Redireciona para o Perfil
        window.location.href = "sucesso.html"; 
    } else {
        // Erro de acesso
        alert("Erro: Usuário ou Senha incorretos. Tente novamente!");
    }
};