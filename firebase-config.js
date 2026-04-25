// INJEÇÃO AUTOMÁTICA DE FAVICON - CHACALE PRODUÇÕES
(function() {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'shortcut icon';
    link.href = 'https://logodownload.org/wp-content/uploads/2021/04/desbravadores-logo-1.png';
    document.getElementsByTagName('head')[0].appendChild(link);
})();

// Configuração Estilo Compatível - Chacale Produções
const firebaseConfig = {
  apiKey: "AIzaSyCXCKo5WJG-MM_nG4xOwqE5gk6Knr-NRhE",
  authDomain: "aguia-control.firebaseapp.com",
  projectId: "aguia-control",
  storageBucket: "aguia-control.firebasestorage.app",
  messagingSenderId: "239669913167",
  appId: "1:239669913167:web:81cf8b36be58950b666c3a",
  measurementId: "G-MBFK6Y8L54"
};

// Inicializa sem 'import' para o 'db' ser reconhecido
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); 

console.log("✅ Conectado ao Banco de Dados do Clube Águia!");