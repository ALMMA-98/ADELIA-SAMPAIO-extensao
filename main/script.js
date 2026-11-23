// Base de dados estruturada (facilita atualização futura pela equipe)
const dadosProgramacao = [
  {
    categoria: "exibicao",
    tag: "Exibição • Sessão de Abertura",
    titulo: "Sessão Competitiva: Curtas de Brasília",
    data: "Dia 1 • 19h00",
    local: "Cine Brasília – Asa Sul",
    descricao: "Exibição comentada de curtas-metragens dirigidos por realizadores negros do Distrito Federal."
  },
  {
    categoria: "oficina",
    tag: "Oficina Formativa",
    titulo: "Direção de Fotografia e Iluminação para Peles Negras",
    data: "Dia 2 • 14h00",
    local: "Espaço Cultural Renato Russo",
    descricao: "Oficina prática voltada para estudantes e técnicos sobre estética, luz e colorimetria no cinema negro."
  },
  {
    categoria: "debate",
    tag: "Roda de Conversa",
    titulo: "O Legado de Adélia Sampaio e o Cinema Independente",
    data: "Dia 2 • 18h30",
    local: "Auditório UnB / Online",
    descricao: "Debate com pesquisadoras, cineastas e curadores sobre memória, distribuição e políticas afirmativas."
  },
  {
    categoria: "exibicao",
    tag: "Exibição • Mostra Nacional",
    titulo: "Panorama Nacional: Narrativas Ancestrais",
    data: "Dia 3 • 20h00",
    local: "Cine Brasília – Asa Sul",
    descricao: "Seleção de obras premiadas de diversas regiões do Brasil destacando identidade e território."
  }
];

const dadosFilmes = [
  {
    titulo: "Ecos da Memória",
    direcao: "Mariana Silva",
    uf: "DF",
    duracao: "18 min",
    ano: "2025",
    classificacao: "Livre",
    sinopse: "Um mergulho poético nas histórias orais das mulheres fundadoras das regiões administrativas de Brasília."
  },
  {
    titulo: "Travessia do Cerrado",
    direcao: "Carlos Eduardo Santos",
    uf: "GO",
    duracao: "22 min",
    ano: "2025",
    classificacao: "12 anos",
    sinopse: "Documentário que acompanha comunidades quilombolas e sua relação sustentável com a preservação do Cerrado."
  },
  {
    titulo: "Luz sobre o Asfalto",
    direcao: "Beatriz Oliveira",
    uf: "BA",
    duracao: "15 min",
    ano: "2025",
    classificacao: "10 anos",
    sinopse: "Ficção urbana sobre jovens artistas periféricos que transformam o espaço público através da música e do cinema."
  },
  {
    titulo: "Raízes em Movimento",
    direcao: "Rafael Costa",
    uf: "SP",
    duracao: "25 min",
    ano: "2025",
    classificacao: "Livre",
    sinopse: "Retrato íntimo de coletivos culturais negros que utilizam o audiovisual como ferramenta de educação comunitária."
  }
];

const dadosAcervo = [
  {
    edicao: "VII Mostra (2025)",
    destaque: "Mais de 40 obras exibidas, oficinas formativas e homenagem às cineastas negras contemporâneas."
  },
  {
    edicao: "VI Mostra (2024)",
    destaque: "Expansão das sessões descentralizadas e debates acadêmicos sobre representatividade no audiovisual."
  },
  {
    edicao: "V Mostra (2023)",
    destaque: "Consolidação da mostra competitiva nacional e fortalecimento das redes de realizadores independentes."
  },
  {
    edicao: "Edições Iniciais (2018–2022)",
    destaque: "Criação do festival em Brasília e resgate histórico da trajetória pioneira de Adélia Sampaio."
  }
];

// Referências DOM
const programacaoList = document.getElementById("programacaoList");
const filmesList = document.getElementById("filmesList");
const acervoList = document.getElementById("acervoList");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchFilmeInput = document.getElementById("searchFilme");

// Modal
const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

function abrirModal(titulo, conteudoHtml) {
  modalTitle.textContent = titulo;
  modalBody.innerHTML = conteudoHtml;
  modalOverlay.hidden = false;
}

modalClose.addEventListener("click", () => {
  modalOverlay.hidden = true;
});

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) modalOverlay.hidden = true;
});

// Renderizar Programação
function renderProgramacao(filtro = "todos") {
  const itens = filtro === "todos"
    ? dadosProgramacao
    : dadosProgramacao.filter(item => item.categoria === filtro);

  programacaoList.innerHTML = itens.map(item => `
    <article class="card">
      <div>
        <div class="card-tag">${item.tag}</div>
        <h3>${item.titulo}</h3>
        <div class="card-meta"><strong>${item.data}</strong> • ${item.local}</div>
        <p>${item.descricao}</p>
      </div>
    </article>
  `).join("");
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProgramacao(btn.dataset.filter);
  });
});

// Renderizar Filmes
function renderFilmes(termo = "") {
  const busca = termo.toLowerCase().trim();
  const filtrados = dadosFilmes.filter(f =>
    f.titulo.toLowerCase().includes(busca) ||
    f.direcao.toLowerCase().includes(busca) ||
    f.uf.toLowerCase().includes(busca)
  );

  if (filtrados.length === 0) {
    filmesList.innerHTML = `<p>Nenhum filme encontrado para "${termo}".</p>`;
    return;
  }

  filmesList.innerHTML = filtrados.map((filme, index) => `
    <article class="card">
      <div>
        <div class="card-tag">${filme.uf} • ${filme.duracao} • ${filme.classificacao}</div>
        <h3>${filme.titulo}</h3>
        <div class="card-meta">Direção: <strong>${filme.direcao}</strong> (${filme.ano})</div>
        <p>${filme.sinopse}</p>
      </div>
      <button class="card-btn" onclick="verFichaFilme(${index})">Ver Ficha Técnica</button>
    </article>
  `).join("");
}

window.verFichaFilme = function(index) {
  const f = dadosFilmes[index];
  abrirModal(f.titulo, `
    <p><strong>Direção:</strong> ${f.direcao}</p>
    <p><strong>Estado / Ano:</strong> ${f.uf} – ${f.ano}</p>
    <p><strong>Duração:</strong> ${f.duracao} | <strong>Classificação:</strong> ${f.classificacao}</p>
    <hr style="margin: 1rem 0; border: 0; border-top: 1px solid #ddd;">
    <p>${f.sinopse}</p>
  `);
};

searchFilmeInput.addEventListener("input", (e) => {
  renderFilmes(e.target.value);
});

// Renderizar Acervo
function renderAcervo() {
  acervoList.innerHTML = dadosAcervo.map(ed => `
    <article class="timeline-card">
      <div class="timeline-year">${ed.edicao}</div>
      <p>${ed.destaque}</p>
    </article>
  `).join("");
}

// Botão Diretrizes 2027
document.getElementById("btnRegulamento").addEventListener("click", () => {
  abrirModal("Diretrizes de Submissão — Edição 2027", `
    <p><strong>1. Elegibilidade:</strong> Obras audiovisuais dirigidas por pessoas negras (pretas ou pardas) brasileiras ou naturalizadas.</p>
    <p><strong>2. Categorias:</strong> Curtas-metragens (até 25 minutos) e longas-metragens nas categorias ficção, documentário e animação.</p>
    <p><strong>3. Cronograma:</strong> A implantação oficial deste portal no fluxo de inscrições do evento ocorrerá na edição de 2027.</p>
  `);
});

// Menu Mobile
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

// Formulário de Contato
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  document.getElementById("formFeedback").textContent =
    `Obrigado, ${nome}! Sua mensagem foi registrada pela produção da Mostra.`;
  e.target.reset();
});

// Inicialização
renderProgramacao();
renderFilmes();
renderAcervo();