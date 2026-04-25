// --- SISTEMA DE ENVIO CHACALE PRODUÇÕES ---

async function enviarCadastroOficial(event) {
    if (event) event.preventDefault();

    console.log("Iniciando processo de envio...");

    // 1. Pegar os dados
    const nome = document.getElementById('cad_nome')?.value;
    const unidade = document.getElementById('cad_unidade')?.value;

    // 2. Validação básica (Não deixa enviar vazio)
    if (!nome || nome.trim() === "") {
        alert("Comandante, insira o seu nome antes de finalizar!");
        return;
    }

    const dadosMembro = {
        nome: nome,
        unidade: unidade || "N/A",
        data: new Date().toLocaleDateString(),
        timestamp: new Date()
    };

    try {
        // 3. Envio para o Firebase (Admin)
        // Certifique-se que 'db' está definido no seu firebase-config.js
        await db.collection("inscricoes").add(dadosMembro);
        
        // 4. A sua mensagem personalizada
        alert("Já estás cadastrado no clube! Voltando ao index...");
        
        // 5. Redirecionar
        window.location.href = "index.html";

    } catch (error) {
        console.error("Erro no envio:", error);
        // Se o Firebase falhar, ele avisa aqui
        alert("Erro na conexão. Verifique se o Firebase está configurado.");
    }
}
// Lógica de Elite - Chacale Produções
async function enviarCadastroOficial(event) {
    if (event) event.preventDefault();
    console.log("🚀 Iniciando envio oficial...");

    try {
        // Captura o nome do campo correto (id="cad_nome")
        const nomeMembro = document.getElementById('cad_nome').value;

        if (!nomeMembro) {
            alert("Comandante, o nome é obrigatório!");
            return;
        }

        // Envia para a coleção 'inscricoes' no Firestore
        await db.collection("inscricoes").add({
            nome: nomeMembro,
            data: new Date().toLocaleDateString(),
            status: "Inscrito"
        });

        // A MENSAGEM QUE VOCÊ QUERIA
        alert("Já estás cadastrado no clube! Voltando ao index...");
        
        // Retorno à base
        window.location.href = "index.html";

    } catch (error) {
        console.error("❌ Falha na missão:", error);
        alert("Erro na conexão. Verifique se as regras do Firebase permitem gravação.");
    }
}
// No seu cadastro.js, mude de 'inscricoes' para 'membros'
await db.collection("membros").add({
    nome: nomeMembro,
    tipo: "Membro", // Adicionado para aparecer no filtro do Admin
    acesso: new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'}),
    data: new Date().toLocaleDateString()
});
async function enviarCadastroOficial(event) {
    if (event) event.preventDefault();

    try {
        const nomeMembro = document.getElementById('cad_nome').value;
        const unidadeMembro = document.getElementById('cad_unidade').value || "Sem Unidade";

        // Enviando os dados REAIS para a coleção que o Admin lê
        await db.collection("membros").add({
            nome: nomeMembro,
            unidade: unidadeMembro,
            tipo: "Membro", // Aparecerá na coluna 'Tipo'
            acesso: new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'}), // Coluna 'Acesso'
            data: new Date().toLocaleDateString('pt-BR'), // Coluna 'Data'
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert("Já estás cadastrado no clube! Voltando ao index...");
        window.location.href = "index.html";

    } catch (error) {
        console.error("Erro ao sincronizar com Admin:", error);
        alert("Erro na conexão com a central de membros.");
    }
}