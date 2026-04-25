document.getElementById('formLoginMembro').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const usuario = document.getElementById('userMembro').value;
    const pass = document.getElementById('passMembro').value;

    // Busca na base de membros cadastrados
    const membros = JSON.parse(localStorage.getItem('listMembros')) || [];
    const membroEncontrado = membros.find(m => m.nome.toLowerCase() === usuario.toLowerCase());

    if (membroEncontrado) {
        // Salva quem está logado para o perfil saber quem mostrar
        localStorage.setItem('membroLogado', JSON.stringify(membroEncontrado));
        window.location.href = "perfil-membro.html";
    } else {
        alert("❌ Desbravador não encontrado ou senha incorreta!");
    }
});
function realizarLogin() {
    const userDigitado = document.getElementById('userMembro').value.toLowerCase();
    const senhaDigitada = document.getElementById('passMembro').value;

    const membros = JSON.parse(localStorage.getItem('listMembros')) || [];
    
    // Procura o membro que tem o utilizador E a senha iguais aos digitados
    const membroValidado = membros.find(m => 
        m.usuario === userDigitado && m.senha === senhaDigitada
    );

    if (membroValidado) {
        if (membroValidado.status === "Pendente") {
            alert("⏳ O seu acesso ainda não foi aprovado pelo Diretor Mery!");
        } else {
            localStorage.setItem('membroLogado', JSON.stringify(membroValidado));
            window.location.href = "perfil-membro.html";
        }
    } else {
        alert("❌ Utilizador ou Senha incorretos!");
    }
}
// Dentro da sua função de cadastro, após salvar no Firestore:
alert("Cadastro realizado com sucesso! Bem-vindo ao Clube Águia.");
window.location.href = "perfil.html"; // Isso vai abrir o perfil que você criou