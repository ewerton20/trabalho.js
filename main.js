function mostrarErro() {
    alert("Erro: imagem não encontrada!");
    console.error("!Erro: a imagem não foi carregada.!")
}
let todasAsRacas = [];

// Carrega todas as raças da API
async function carregarRacas() {
    const resposta = await fetch('https://api.thedogapi.com/v1/breeds');
    todasAsRacas = await resposta.json();
}

// Exibe a raça escolhida
function mostrarInfo(racaID) {
    const dog = todasAsRacas.find(r => r.id == racaID);

    const container = document.getElementById('dog-info');

    if (!dog) {
        container.innerHTML = "Raça não encontrada.";
        return;
    }

    const imagem = dog.reference_image_id ?
        `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg` :
        'https://via.placeholder.com/300x200?text=Sem+Imagem';

    container.innerHTML = `
        <h2>${dog.name}</h2>
        <p><strong>Temperamento:</strong> ${dog.temperament || 'Não informado'}</p>
        <p><strong>Expectativa de vida:</strong> ${dog.life_span || 'Não informada'}</p>
        <img src="${imagem}" alt="Imagem de ${dog.name}" onerror="mostrarErro()">
    `;


}

// Evento quando a pessoa muda a seleção
document.getElementById('breed-select').addEventListener('change', function() {
    const racaID = parseInt(this.value);
    if (racaID) {
        mostrarInfo(racaID);
    }
});

// Inicializa o site
carregarRacas();