// Importa o banco de dados configurado
import { db } from "./firebase-config.js"; 
import { collection, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Função principal para dar vida aos botões de filtro por Unidade
export function inicializarFiltrosUnidades() {
    const seletorUnidade = document.getElementById("filtro-unidade-gestao");
    
    if (seletorUnidade) {
        seletorUnidade.addEventListener("change", (e) => {
            const unidadeSelecionada = e.target.value;
            console.log("Navegando para a unidade: " + unidadeSelecionada);
            carregarMembros(unidadeSelecionada);
        });
    }
}

// Função que puxa os dados reais do Firestore
function carregarMembros(unidade) {
    const listaHtml = document.getElementById("lista-membros-firebase");
    let consulta = collection(db, "membros");

    // Aplica o filtro se não for "todas"
    if (unidade !== "todas") {
        consulta = query(collection(db, "membros"), where("unidade", "==", unidade));
    }

    // Escuta mudanças em tempo real (onSnapshot)
    onSnapshot(consulta, (snapshot) => {
        listaHtml.innerHTML = ""; // Limpa para atualizar
        
        snapshot.forEach((doc) => {
            const m = doc.data();
            listaHtml.innerHTML += `
                <div class="membro-item">
                    <p><strong>${m.nome}</strong> - ${m.classe_atual}</p>
                    <span class="badge ${m.alergias !== 'Nenhuma' ? 'alerta' : 'ok'}">
                        Saúde: ${m.alergias}
                    </span>
                </div>
            `;
        });
    });
}

// Inicia a função ao carregar o módulo
inicializarFiltrosUnidades();
import { db } from "./firebase-config.js";
import { collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

let todosUsuarios = []; // Cache para pesquisa rápida sem gastar dados do Firebase

export function monitorarUsuariosAZ() {
    const listaHtml = document.getElementById("lista-usuarios-alphabetic");
    
    // Query que já traz do Firebase em ordem de A-Z pelo campo "nome"
    const q = query(collection(db, "membros"), orderBy("nome", "asc"));

    onSnapshot(q, (snapshot) => {
        todosUsuarios = []; 
        listaHtml.innerHTML = "";

        snapshot.forEach((doc) => {
            const user = doc.data();
            todosUsuarios.push({ id: doc.id, ...user });
            renderizarCard(user, doc.id);
        });
    });
}

function renderizarCard(user, id) {
    const container = document.getElementById("lista-usuarios-alphabetic");
    container.innerHTML += `
        <div class="user-card-premium" data-nome="${user.nome.toLowerCase()}">
            <div class="info">
                <strong>${user.nome}</strong><br>
                <small>${user.unidade} | ${user.cargo || 'Membro'}</small>
            </div>
            <div class="acoes">
                <button class="btn-perfil" onclick="verPerfil('${id}')">Ver Perfil</button>
            </div>
        </div>
    `;
}

// Função de Pesquisa (Filtra na tela sem recarregar)
window.filtrarUsuarios = function() {
    const termo = document.getElementById("input-pesquisa").value.toLowerCase();
    const cards = document.querySelectorAll(".user-card-premium");

    cards.forEach(card => {
        const nome = card.getAttribute("data-nome");
        card.style.display = nome.includes(termo) ? "flex" : "none";
    });
}
function renderizarCard(user, id) {
    const container = document.getElementById("lista-usuarios-alphabetic");
    container.innerHTML += `
        <div class="user-card-premium" data-nome="${user.nome.toLowerCase()}">
            <div class="info">
                <small>${user.unidade || 'Sem Unidade'}</small>
                <strong>${user.nome}</strong>
                <p style="font-size: 0.8rem; color: #ccc;">${user.cargo || 'Membro'}</p>
            </div>
            <hr style="border: 0.5px solid #333; margin: 15px 0;">
            <button class="btn-perfil-ouro" onclick="verPerfil('${id}')">ACESSAR PERFIL</button>
        </div>
    `;
}
// Função para renderizar os nomes com o novo estilo premium
function renderizarCardUsuario(membro, id) {
    const listaHtml = document.getElementById("lista-usuarios-alphabetic");
    
    // Criamos o card com a borda dourada e fundo escuro que você definiu
    listaHtml.innerHTML += `
        <div class="user-card-premium" data-nome="${membro.nome.toLowerCase()}">
            <div class="card-detalhes">
                <span class="unidade-tag">${membro.unidade || 'Sem Unidade'}</span>
                <h3 class="nome-membro">${membro.nome}</h3>
                <p class="cargo-membro">${membro.cargo || 'Desbravador'}</p>
            </div>
            <button class="btn-acesso-ouro" onclick="abrirPerfil('${id}')">
                DETALHES <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    `;
}
import { storage, db } from "./firebase-config.js";
import { ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const btnPublicar = document.getElementById("btn-publicar");

btnPublicar.addEventListener("click", () => {
    const file = document.getElementById("file-input").files[0];
    const legenda = document.getElementById("legenda-foto").value;

    if (!file) return alert("Soldado, selecione uma imagem primeiro!");

    // 1. Criar referência no Storage
    const storageRef = ref(storage, `galeria/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
        (snapshot) => {
            // Atualiza a barra de progresso
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            document.getElementById("upload-progress").style.width = progress + "%";
        }, 
        (error) => console.error("Falha no envio:", error), 
        () => {
            // 2. Upload concluído, pegar URL e salvar no Firestore
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                addDoc(collection(db, "galeria_geral"), {
                    url: downloadURL,
                    legenda: legenda,
                    data_postagem: serverTimestamp(),
                    autor: "Admin Águia"
                });
                alert("Foto publicada com sucesso na Galeria Geral!");
            });
        }
    );
});
// Função para carregar as páginas dentro do painel sem dar F5
document.querySelectorAll('.menu-item').forEach(botao => {
    botao.addEventListener('click', (e) => {
        const alvo = e.currentTarget.getAttribute('data-page');
        console.log("Navegando para: " + alvo);
        
        if(alvo) {
            window.location.href = alvo + ".html"; // Redireciona para a página correspondente
        }
    });
});
// Aguarda o HTML carregar totalmente
document.addEventListener("DOMContentLoaded", () => {
    console.log("Sistema Águia Control: Online e Operacional");

    const botoesMenu = {
        'usuarios-btn': 'usuarios.html',
        'membros-btn': 'lista-membros.html',
        'galeria-btn': 'editar-galeria.html',
        'noticias-btn': 'noticias.html'
    };

    Object.keys(botoesMenu).forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.style.cursor = "pointer"; // Garante que o mouse muda
            elemento.onclick = () => {
                console.log("Mudando para: " + botoesMenu[id]);
                window.location.href = botoesMenu[id];
            };
        }
    });
});
// Função para renderizar a lista de membros com animação
function atualizarTabela() {
    const lista = JSON.parse(localStorage.getItem('membros_aguia')) || [];
    const corpoTabela = document.getElementById('corpo-tabela-membros');
    
    corpoTabela.innerHTML = lista.map((m, index) => `
        <tr class="fade-in-row">
            <td>
                <div class="membro-perfil">
                    <strong>${m.nome}</strong>
                    <span>${m.cargo}</span>
                </div>
            </td>
            <td><span class="badge">${m.unidade}</span></td>
            <td>${m.classe}</td>
            <td><i class="fas fa-heartbeat ${m.saude === 'OK' ? 'green-text' : 'red-text'}"></i> ${m.saude}</td>
            <td>
                <button onclick="removerMembro(${index})" class="btn-acao delete"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}