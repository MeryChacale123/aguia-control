import { db, storage } from "./firebase-config.js";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const fileInput = document.getElementById('file-input');

// --- UPLOAD DE FOTO ---
fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `galeria/${Date.now()}_${file.name}`);
    
    try {
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        
        await addDoc(collection(db, "galeria_geral"), {
            imageUrl: url,
            storagePath: storageRef.fullPath,
            data_upload: new Date()
        });
        alert("Foto enviada para a Galeria Geral!");
    } catch (erro) {
        console.error("Erro no upload:", erro);
    }
});

// --- LISTAGEM EM TEMPO REAL ---
const listarGaleria = () => {
    const q = query(collection(db, "galeria_geral"), orderBy("data_upload", "desc"));
    onSnapshot(q, (snapshot) => {
        const container = document.getElementById("grid-galeria-admin");
        container.innerHTML = "";
        snapshot.forEach((doc) => {
            const data = doc.data();
            container.innerHTML += `
                <div class="foto-item-admin">
                    <img src="${data.imageUrl}">
                    <button class="btn-apagar-foto" onclick="removerFoto('${doc.id}', '${data.storagePath}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        });
    });
};

window.removerFoto = async (id, path) => {
    if(confirm("Deseja apagar esta imagem da Galeria?")) {
        await deleteDoc(doc(db, "galeria_geral", id));
        const fileRef = ref(storage, path);
        await deleteObject(fileRef);
    }
};

listarGaleria();