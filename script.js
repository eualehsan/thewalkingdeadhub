document.addEventListener('DOMContentLoaded', () => { //fecha aviso de direitos autorais
    const btnAgree = document.querySelector(".btn-agree");
    const modal = document.querySelector(".modal");

    btnAgree.addEventListener('click', () => {
        modal.style.display = "none";
    })
}); 

const modal = document.querySelector(".modal"); //grava em memoria se o usuario leu o aviso de direitos autorias, se sim nao aparecera mais o aviso para esse usuario
function btnAgree(){
    localStorage.avisoDeDireitosAutorais = "entendi"; // adiciona 'entendi' na memoria se o usuario clicar no botao 'entendi'

}

if(localStorage.avisoDeDireitosAutorais == "entendi"){ //ao abrir o site verifica se o usuario clicou anteriomente no botao 'entendi'
    modal.style.display = "none";
}


function showSection(sectionNumber) {
    // Seleciona todos os botões do cabeçalho
    const buttonsHeader = document.querySelectorAll(".btn-header");
    // Seleciona todas as sections que precisam ser exibidas ou ocultadas
    const sections = document.querySelectorAll("section");
    const videoContainer = document.querySelector(".midia-conteiner");
    const backgroundVideo = document.querySelector(".background-video");

    // Remove a classe 'active' de todos os botões
    buttonsHeader.forEach(button => {
        button.classList.remove("active");
    });

    // Adiciona a classe 'active' ao botão selecionado
    const selectedButton = document.querySelector(`.btn-header[data-section="${sectionNumber}"]`);
    selectedButton.classList.add("active");

    // Oculta todas as sections
    sections.forEach(section => {
        section.style.display = "none";
    });

    // Exibe apenas a seção correspondente ao botão clicado
    const selectedSection = document.getElementById(`tela-${sectionNumber}`);
    if (selectedSection) {
        selectedSection.style.display = "block";
        window.scrollTo({
            top: 0,
             // Para uma rolagem suave
        });
    }

    // Controle do vídeo
    if (sectionNumber === 2) {
        backgroundVideo.play();
        
        // Adiciona um evento de rolagem para pausar o vídeo e aplicar o desfoque
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                videoContainer.classList.add("blurred");
                if (!backgroundVideo.paused) {
                    backgroundVideo.pause();
                }
            } else {
                videoContainer.classList.remove("blurred");
                if (backgroundVideo.paused) {
                    backgroundVideo.play();
                }
            }
        });
    } else {
        backgroundVideo.pause();
    }
}


// window.addEventListener("scroll", function () { //pausa e da blur no video
//     const videoContainer = document.querySelector(".midia-conteiner");
//     const video = document.querySelector(".background-video");

//     if (window.scrollY > 400) { 
//         videoContainer.classList.add("blurred");
//         if (!video.paused) {
//             video.pause();
//         }
//     } else {
//         videoContainer.classList.remove("blurred");
//         if (video.paused) {
//             video.play();
//         }
//     }
// });

function enableSound() { //ativa o som do video
    const video = document.querySelector(".background-video");
    const volumeAtiva = document.querySelector(".ativa-som");
    const volumeDesativa = document.querySelector(".desativa-som");

    // Ativa o som do vídeo e troca entre o botão 'ativa som' e 'desativa som'
    if(video.muted){
        video.muted = false;
        volumeAtiva.style.display = "none"; // remove o botão após ativar o som
        volumeDesativa.style.display = "flex"; // mostra o botão 'desativar som'
    } else {
        video.muted = true;
        volumeAtiva.style.display = "flex"; // mostra o botão após ativar o som
        volumeDesativa.style.display = "none"; // remove o botão 'desativar som'
    }  
}

//api key da TMDb
const API_KEY = '51ad6c3920d2465c085c3ee151bca12b';
const BASE_URL = 'https://api.themoviedb.org/3';
const SERIES_ID = 1402; // ID de The Walking Dead no TMDb
const TWD_DARYL_DIXON_ID = 211684; //ID de TWD: Daryl Dixon

// Função para buscar episódios de uma poster específico
async function fetchEpisodes(seasonNumber) {
    const url = `${BASE_URL}/tv/${SERIES_ID}/season/${seasonNumber}?api_key=${API_KEY}&language=pt-BR`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayEpisodes(data.episodes);
    } catch (error) {
        console.error('Erro ao buscar episódios:', error);
    }
}

// Função para exibir episódios no HTML
function displayEpisodes(episodes) {
    const cardContainer = document.querySelector('.card-conteiner');
    cardContainer.innerHTML = ''; // Limpa os cards existentes

    episodes.forEach(episode => {
        const episodeCard = document.createElement('div');
        episodeCard.classList.add('card-episodio');

        episodeCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${episode.still_path}" alt="Imagem do episódio ${episode.episode_number}">
                <span>
                    <i class="fa-solid fa-play"></i>
                    <h6>${episode.runtime} min</h6>
                </span>
            <div>
                <h1>${episode.episode_number}. ${episode.name}</h1>
                <p>${episode.overview || 'Descrição não disponível.'}</p>
            </div>
        `;

        cardContainer.appendChild(episodeCard);
    });
}

// Evento para capturar o poster selecionado
document.getElementById('season-select').addEventListener('change', (event) => {
    const seasonNumber = event.target.value;
    fetchEpisodes(seasonNumber);
});

// Carregar episódios do primeiro poster ao iniciar
fetchEpisodes(1);




document.addEventListener('DOMContentLoaded', () => { //mostra janela do trailer
    const btnAbreTrailer = document.querySelector(".btn-abre-trailer");
    const modalConteiner = document.querySelector(".modal-conteiner");
    const video = document.querySelector(".background-video");
    const html = document.querySelector("html");

    btnAbreTrailer.addEventListener('click', () => {
        video.pause();
        modalConteiner.classList.add('mostra');
        html.classList.add('mostra');
    });
});

document.addEventListener('DOMContentLoaded', () => { //fecha janela do trailer
    const btnFechaModal = document.querySelector(".btn-fecha-modal");
    const modalConteiner = document.querySelector(".modal-conteiner");
    const video = document.querySelector(".video-modal");
    const videoInicial = document.querySelector(".background-video");
    const html = document.querySelector("html");

    btnFechaModal.addEventListener('click', () => {
        html.classList.remove('mostra')
        modalConteiner.classList.remove('mostra');
        video.pause();
        videoInicial.play();
        video.currentTime = 0;
    })
});







// Configurações da API
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// IDs das séries derivadas
const spinOffIds = [
    { id: 206586, name: "The Walking Dead: The Ones Who Live" },
    { id: 211684, name: "The Walking Dead: Daryl Dixon" },
    { id: 194583, name: "The Walking Dead: Dead City" },
    { id: 62286, name: "Fear the Walking Dead" },
    { id: 94305, name: "The Walking Dead: World Beyond" },
    { id: 136248, name: "Tales of The Walking Dead" },
];

// Função para buscar dados de uma série
async function fetchSeriesData(seriesId) {
    const url = `${BASE_URL}/tv/${seriesId}?api_key=${API_KEY}&language=pt-BR`;

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(`Erro ao buscar dados da série com ID ${seriesId}:`, error);
        return null;
    }
}

// Função para buscar provedores de streaming
async function fetchStreamingProviders(seriesId) {
    const url = `${BASE_URL}/tv/${seriesId}/watch/providers?api_key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Selecionar os provedores para o Brasil (ou outro país)
        const providers = data.results?.BR?.flatrate || []; // "flatrate" indica streaming
        return providers;
    } catch (error) {
        console.error(`Erro ao buscar provedores de streaming para a série ${seriesId}:`, error);
        return [];
    }
}

// Função para exibir as séries no HTML
async function displaySpinOffs() {
    const cardContainer = document.querySelector('.card-conteiner-spin-offs');
    cardContainer.innerHTML = ''; // Limpa os cards existentes

    for (const spinOff of spinOffIds) {
        const seriesData = await fetchSeriesData(spinOff.id);
        const providers = await fetchStreamingProviders(spinOff.id);

        if (seriesData) {
            const {
                poster_path,
                name,
                number_of_seasons,
                number_of_episodes,
                episode_run_time,
                first_air_date,
                overview,
                status,
            } = seriesData;

            const providerLogos = providers
                .map(provider => `<img class="streaming-providers" src="https://image.tmdb.org/t/p/w45${provider.logo_path}" alt="${provider.provider_name}" title="${provider.provider_name}">`)
                .join('');

            const card = document.createElement('div');
            card.classList.add('card-serie');

            // Formatar os dados
            const posterImage = poster_path ? `${IMAGE_BASE_URL}${poster_path}` : './placeholder.jpg';
            const averageRuntime = episode_run_time.length ? `${Math.round(episode_run_time[0])} min` : '50 min';
            const releaseYear = first_air_date ? first_air_date.split('-')[0] : 'N/A';
            const seriesStatus = status === 'Ended' ? 'Encerrada' : status === 'Returning Series' ? 'Continuando' : 'Cancelada';

            // Preencher o card
            card.innerHTML = `
                <img class="poster-serie" src="${posterImage}" alt="Poster da série ${name}">
                <h1>${name}</h1>
                <ul>
                    <span id="class-indicativa">16</span>
                    <li>${number_of_seasons} Temporada${number_of_seasons > 1 ? 's' : ''}</li>
                    <li>${number_of_episodes} Episódio${number_of_episodes > 1 ? 's' : ''}</li>
                    <li>${averageRuntime}</li>
                    <li>${releaseYear}</li>
                    <li>${seriesStatus}</li>
                </ul>
                ${providerLogos} 
                <p>${overview || 'Descrição não disponível.'}</p>
                <button>Ver detalhes <i class="fa-solid fa-circle-arrow-right"></i></button>
            `;

            // Adicionar o card ao container
            cardContainer.appendChild(card);
        }
    }
}

// Chamar a função ao carregar a página
displaySpinOffs();
