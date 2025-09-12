
let currentImageIndex = 0;
let galleryImages = [];

// Função para abrir o formulário de agendamento
function abrirFormulario() {
    document.getElementById('formulario-popup').style.display = 'block';
}

// Função para fechar o formulário de agendamento
function fecharFormulario() {
    document.getElementById('formulario-popup').style.display = 'none';
    // Limpar o formulário ao fechar
    document.getElementById('agendamentoForm').reset();
}

// Fechar o popup quando clicar fora dele
window.onclick = function(event) {
    var popup = document.getElementById('formulario-popup');
    if (event.target == popup) {
        popup.style.display = 'none';
        document.getElementById('agendamentoForm').reset();
    }
}

// Função de throttle para melhorar performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Fechar popup com tecla ESC (com throttle)
document.addEventListener('keydown', throttle(function(event) {
    if (event.key === 'Escape') {
        fecharFormulario();
    }
}, 100));

// Sistema de agendamento via WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar imagens da galeria
    galleryImages = document.querySelectorAll('.galeria-container img');
    
    // Atualizar o ano atual no rodapé
    document.getElementById('ano-atual').textContent = new Date().getFullYear();
    
    // Configurar o formulário de agendamento
    document.getElementById("agendamentoForm").addEventListener("submit", function(e) {
        e.preventDefault();
        
        // Pega os dados do formulário
        let nome = document.getElementById("nome").value;
        let servico = document.getElementById("servico").value;
        let data = document.getElementById("data").value;
        let hora = document.getElementById("hora").value;
        
        // Validação básica
        if (!nome || !servico || !data || !hora) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        // Formatar a data para o padrão brasileiro
        let dataFormatada = new Date(data).toLocaleDateString('pt-BR');
        
        // Monta a mensagem
        let mensagem = `Olá, meu nome é ${nome}. Quero agendar o serviço: ${servico} para o dia ${dataFormatada} às ${hora}.`;
        
        // Número do WhatsApp
        let numero = "5569992720204"; // formato internacional sem +
        
        // Gera o link do WhatsApp
        let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
        
        // Abre o WhatsApp
        window.open(url, "_blank");
        
        // Fechar o formulário após enviar
        fecharFormulario();
        
        // Mostrar mensagem de sucesso
        alert('Redirecionando para o WhatsApp...');
    });
});

function abrirImagem(imgElement) {
    currentImageIndex = Array.from(galleryImages).indexOf(imgElement);
    document.getElementById("imagem-popup").src = imgElement.src;
    document.getElementById("popup-imagem").style.display = "block";
}
function fecharImagem() {
    document.getElementById("popup-imagem").style.display = "none";
}
function navegar(direcao) {
    currentImageIndex += direcao;
    if (currentImageIndex < 0) currentImageIndex = galleryImages.length - 1;
    if (currentImageIndex >= galleryImages.length) currentImageIndex = 0;
    document.getElementById("imagem-popup").src = galleryImages[currentImageIndex].src;
}
document.addEventListener("keydown", throttle(function(e) {
    if (document.getElementById("popup-imagem").style.display === "block") {
        if (e.key === "ArrowLeft") navegar(-1);
        if (e.key === "ArrowRight") navegar(1);
        if (e.key === "Escape") fecharImagem();
    }
}, 50));
