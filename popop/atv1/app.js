// Elementos do DOM
const tabela = document.getElementById('tabela-contatos');
const totalSpan = document.getElementById('total');
const filtroInput = document.getElementById('filtro');

// Dados iniciais com a Julia Ferreira
const contatoInicial = {
    nome: "Julia Ferreira",
    email: "julia.ferreira.santos30@escola.pr.gov.br",
    telefone: "+55 41 99234-5678" // Número inventado
};

// Carregar contatos do LocalStorage ou iniciar com a Julia
let contatos = JSON.parse(localStorage.getItem('contatos'));

if (!contatos || contatos.length === 0) {
    contatos = [contatoInicial];
}

// Função para renderizar a tabela na tela
function renderizarTabela(dados = contatos) {
    tabela.innerHTML = '';
   
    dados.forEach((contato, index) => {
        const row = tabela.insertRow();
        row.innerHTML = `
            <td>${contato.nome}</td>
            <td>${contato.email}</td>
            <td>${contato.telefone}</td>
            <td>
                <button class="btn-alterar" onclick="prepararEdicao(${index})">Alterar</button>
                <button class="btn-excluir" onclick="excluirContato(${index})">Excluir</button>
            </td>
        `;
    });
   
    totalSpan.innerText = dados.length;
    // Atualiza o "banco de dados" do navegador
    localStorage.setItem('contatos', JSON.stringify(contatos));
}

// Função para Cadastrar novo contato
function salvarContato() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;

    if (nome && email && telefone) {
        contatos.push({ nome, email, telefone });
        renderizarTabela();
        limparFormulario();
    } else {
        alert("Por favor, preencha todos os campos antes de cadastrar.");
    }
}

// Função para Excluir
function excluirContato(index) {
    if(confirm("Tem certeza que deseja excluir este contato?")) {
        contatos.splice(index, 1);
        renderizarTabela();
    }
}

// Função para carregar dados no form para Alterar
function prepararEdicao(index) {
    const c = contatos[index];
    document.getElementById('nome').value = c.nome;
    document.getElementById('email').value = c.email;
    document.getElementById('telefone').value = c.telefone;
   
    // Remove o item atual para que, ao clicar em cadastrar, ele seja "atualizado"
    contatos.splice(index, 1);
}

// Lógica do Filtro de Busca
filtroInput.addEventListener('input', (e) => {
    const busca = e.target.value.toLowerCase();
    const filtrados = contatos.filter(c =>
        c.nome.toLowerCase().includes(busca)
    );
    renderizarTabela(filtrados);
});

function limparFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefone').value = '';
}

// Iniciar a página com os dados
renderizarTabela();