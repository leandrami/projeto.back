// ----------------------
// Classe Produto
// ----------------------
class Produto {
  // O construtor define os atributos de cada produto
  constructor(nome, preco, quantidade = 1) {
    this.nome = nome;            // Nome do produto (ex.: Pizza, Suco)
    this.preco = preco;          // Preço unitário do produto
    this.quantidade = quantidade; // Quantidade comprada (padrão = 1)
  }

  // Método que calcula o subtotal = preço * quantidade
  subtotal() {
    return this.preco * this.quantidade;
  }
}

// ----------------------
// Classe Carrinho
// ----------------------
class Carrinho {
  constructor() {
    this.produtos = []; // Lista (array) que vai armazenar todos os produtos do carrinho
  }

  // Método para adicionar um produto ao carrinho
  adicionarProduto(novoProduto) {
    // Verifica se o produto já existe no carrinho
    const existente = this.produtos.find(p => p.nome === novoProduto.nome);
    if (existente) {
      existente.quantidade += novoProduto.quantidade; // Se já existir, só aumenta a quantidade
    } else {
      this.produtos.push(novoProduto); // Se não existir, adiciona o produto no array
    }
    this.mostrarNoHTML(); // Atualiza a interface do carrinho
  }

  // Método para remover um produto (ou diminuir a quantidade)
  removerProduto(nome) {
    const produto = this.produtos.find(p => p.nome === nome);
    if (produto) {
      produto.quantidade--; // Diminui 1 unidade
      if (produto.quantidade <= 0) {
        // Se a quantidade chegar a zero, remove o produto da lista
        this.produtos = this.produtos.filter(p => p.nome !== nome);
      }
    }
    this.mostrarNoHTML(); // Atualiza a interface do carrinho
  }

  // Método que calcula o valor total da compra
  calcularTotal() {
    // Soma todos os subtotais dos produtos
    return this.produtos.reduce((soma, produto) => soma + produto.subtotal(), 0);
  }

  // Método para mostrar os produtos no HTML
  mostrarNoHTML() {
    const lista = document.getElementById("lista-produtos"); // UL onde os itens serão exibidos
    const totalElem = document.getElementById("total");      // Elemento que mostra o valor total

    lista.innerHTML = ""; // Limpa a lista antes de recriar

    // Para cada produto do carrinho, cria um <li> no HTML
    this.produtos.forEach(produto => {
      const li = document.createElement("li");
      li.classList.add("food-list__item");    // Classe para estilização

      // Estrutura do item do carrinho
      li.innerHTML = `
        <div class="food-buy-amount">
          <button class="btn-menos botao-carr" data-nome="${produto.nome}">-</button>
          ${produto.quantidade}x
          <button class="btn-mais botao-carr" data-nome="${produto.nome}">+</button>
        </div>
        <div class="food-name">${produto.nome}</div>
        <div class="food-price">R$ ${produto.subtotal().toFixed(2)}</div>
      `;

      lista.appendChild(li);    // Adiciona o <li> na lista do carrinho
    });

    // Mostra o total formatado no HTML
    totalElem.textContent = "TOTAL: R$ " + this.calcularTotal().toFixed(2);

    // ----------------------
    // Eventos dos botões + e -
    // ----------------------

    // Botão "+" para aumentar quantidade
    document.querySelectorAll(".btn-mais").forEach(botao => {
      botao.addEventListener("click", () => {
        const nome = botao.getAttribute("data-nome");    // Pega o nome do produto clicado
        this.adicionarProduto(new Produto(nome, this.getPreco(nome), 1));    // Adiciona mais 1
      });
    });

    // Botão "-" para diminuir quantidade
    document.querySelectorAll(".btn-menos").forEach(botao => {
      botao.addEventListener("click", () => {
        const nome = botao.getAttribute("data-nome"); // Pega o nome do produto clicado
        this.removerProduto(nome); // Remove 1 unidade
      });
    });
  }

  // Método auxiliar: retorna o preço de um produto pelo nome
  getPreco(nome) {
    const produto = this.produtos.find(p => p.nome === nome);
    return produto ? produto.preco : 0;
  }
}

// ----------------------
// Criar carrinho
// ----------------------
const carrinho = new Carrinho(); // Cria um objeto carrinho vazio

// ----------------------
// Captura dos cliques nos botões "COMPRAR"
// ----------------------
document.querySelectorAll(".btn-comprar").forEach(botao => {
  botao.addEventListener("click", () => {
    const nome = botao.getAttribute("data-nome");   // Pega o nome do produto do botão
    const preco = parseFloat(botao.getAttribute("data-preco")); // Pega o preço do produto
    const produto = new Produto(nome, preco, 1); // Cria um novo objeto Produto
    carrinho.adicionarProduto(produto);          // Adiciona o produto ao carrinho
  });
});


// ----------------------
// Cálculo do tempo de entrega
// ----------------------

// Função que calcula tempo estimado em minutos baseado na distância
function calcularTempoEntrega(distanciaKm) {
  const velocidadeMediaKmH = 30; // Velocidade média do entregador (30 km/h)
  const minutos = (distanciaKm / velocidadeMediaKmH) * 60; // Regra de 3 simples
  return Math.ceil(minutos); // Arredonda para cima
}

// Evento do botão "Calcular tempo"
document.getElementById("calcular-tempo").addEventListener("click", () => {
  const endereco = document.getElementById("endereco-cliente").value; // Pega o valor do input

  if (endereco.trim() === "") {
    alert("Por favor, digite um endereço!"); // Caso não digite nada
    return;
  }

  // Simulação: sempre considera 8 km por enquanto
  const distanciaKm = 8;  
  const tempo = calcularTempoEntrega(distanciaKm); // Calcula tempo baseado na distância

  // Mostra no HTML o resultado
  document.getElementById("tempo-previsto").innerText =
    `Tempo estimado para ${endereco}: ${tempo} min`;
});
