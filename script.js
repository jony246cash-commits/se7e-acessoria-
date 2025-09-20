// Obtém o elemento do ano atual e o atualiza
document.getElementById('ano-atual').textContent = new Date().getFullYear();

// GALERIA
let currentIndex = 0;
const galeriaImagens = document.querySelectorAll('.galeria-container img');

function abrirImagem(element) {
    const imgPopup = document.getElementById('imagem-popup');
    const popup = document.getElementById('popup-imagem');
    
    imgPopup.src = element.src;
    popup.style.display = 'flex';
    
    // Encontra o índice da imagem clicada
    galeriaImagens.forEach((img, index) => {
        if (img === element) {
            currentIndex = index;
        }
    });
}

function fecharImagem() {
    document.getElementById('popup-imagem').style.display = 'none';
}

function navegar(direction) {
    currentIndex += direction;
    
    if (currentIndex < 0) {
        currentIndex = galeriaImagens.length - 1;
    } else if (currentIndex >= galeriaImagens.length) {
        currentIndex = 0;
    }
    
    const newImageSrc = galeriaImagens[currentIndex].src;
    document.getElementById('imagem-popup').src = newImageSrc;
}

// FORMULÁRIO
function abrirFormulario() {
    document.getElementById('formulario-popup').style.display = 'flex';
}

function fecharFormulario() {
    document.getElementById('formulario-popup').style.display = 'none';
}

// Lógica de envio do formulário para o WhatsApp
document.getElementById('agendamentoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const servico = document.getElementById('servico').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;

    const mensagem = `Olá, gostaria de agendar uma ${servico} para o dia ${data} às ${hora}. Meu nome é ${nome}.`;
    const url = `https://wa.me/556993993568?text=${encodeURIComponent(mensagem)}`;

    window.open(url, '_blank');

    fecharFormulario();
});

// Fecha o popup ao clicar fora
window.onclick = function(event) {
    const popupImagem = document.getElementById('popup-imagem');
    const popupFormulario = document.getElementById('formulario-popup');
    
    if (event.target === popupImagem) {
        popupImagem.style.display = "none";
    }
    
    if (event.target === popupFormulario) {
        popupFormulario.style.display = "none";
    }
}
