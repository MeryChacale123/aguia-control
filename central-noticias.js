import { db } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Funções para abrir e fechar a janela (Modal)
window.mostrarModal = () => {
    document.getElementById("modal-noticia").style.display = "flex";
};

window.fecharModal = () => {
    document.getElementById("modal-noticia").style.display = "none";
    // Limpar os campos ao fechar
    document.getElementById("titulo-noticia").value = "";
    document.getElementById("corpo-noticia").value = "";
    document.getElementById("check-urgente").checked = false;
};

// Função para Salvar no Firebase
window.salvarNoticia = async () => {
    const titulo = document.getElementById("titulo-noticia").value;
    const texto = document.getElementById("corpo-noticia").value;
    const ehUrgente = document.getElementById("check-urgente").checked;

    if (!titulo || !texto) {
        alert("Atenção: Preencha o Título e o Conteúdo da notícia!");
        return;
    }

    try {
        await addDoc(collection(db, "noticias"), {
            titulo: titulo,
            texto: texto,
            urgente: ehUrgente,
            autor: "Admin", // Como estamos na área admin
            data_criacao: serverTimestamp()
        });
        alert("Notícia transmitida com sucesso!");
        fecharModal();
    } catch (erro) {
        console.error("Falha na comunicação: ", erro);
        alert("Erro ao salvar. Verifique a consola.");
    }
};

// Ao carregar a página, podemos iniciar a função que lista as notícias aqui depois!
console.log("Módulo Central de Notícias - Online");
import { db } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ... (as funções de salvar e modal que já criamos permanecem iguais)

// --- FUNÇÃO PARA LISTAR E MONITORAR NOTÍCIAS ---
const listarNoticiasAdmin = () => {
    const q = query(collection(db, "noticias"), orderBy("data_criacao", "desc"));
    const container = document.getElementById("lista-noticias-admin");

    onSnapshot(q, (snapshot) => {
        container.innerHTML = ""; // Limpa para atualizar
        snapshot.forEach((documento) => {
            const n = documento.data();
            const id = documento.id;

            container.innerHTML += `
                <div class="noticia-card-premium ${n.urgente ? 'urgente' : ''}">
                    <div class="card-header">
                        ${n.urgente ? '<span class="urgente-badge">🚨 URGENTE</span>' : ''}
                        <small>${n.data_criacao?.toDate().toLocaleDateString() || 'Agora'}</small>
                    </div>
                    <h3>${n.titulo}</h3>
                    <p>${n.texto.substring(0, 150)}...</p>
                    <div class="acoes-admin">
                        <button class="btn-editar-mini" onclick="prepararEdicao('${id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-remover-mini" onclick="removerNoticia('${id}')">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            `;
        });
    });
};

// --- FUNÇÃO PARA REMOVER NOTÍCIA ---
window.removerNoticia = async (id) => {
    if (confirm("Comandante, confirma a exclusão definitiva desta notícia?")) {
        try {
            await deleteDoc(doc(db, "noticias", id));
            alert("Notícia removida do sistema.");
        } catch (erro) {
            console.error("Erro ao remover:", erro);
        }
    }
};

// Iniciar a listagem assim que abrir a página
listarNoticiasAdmin();