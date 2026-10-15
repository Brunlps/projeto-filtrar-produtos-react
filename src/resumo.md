# Resumo: filtro de produtos por categoria em React

## O problema

Num app React que lista produtos da FakeStore API, ao escolher uma categoria no `<select>`, **todos os produtos sumiam da tela**.

## As causas

**1. Valores do `select` diferentes dos da API**
As `<option>` não tinham `value`, então enviavam o texto visível (`"Eletronicos"`, `"Roupas Masculinas"`). A API usa categorias em inglês (`"electronics"`, `"men's clothing"`). A comparação nunca dava `true` e o filtro devolvia uma lista vazia.

**2. Estado inexistente**
O código chamava `setProdutosFiltrados`, mas esse `useState` nunca tinha sido criado, o que gerava `ReferenceError`.

**3. Tela renderizando a lista errada**
O JSX fazia `produtos.map(...)`, sempre a lista completa, então o filtro nunca aparecia na tela.

**4. Risco de sobrescrever a lista original**
Se a lista filtrada for salva no mesmo estado da original, a partir da segunda filtragem os produtos de outras categorias se perdem e "Todos" não restaura nada.

**5. Tela vazia ao abrir a página**
Com dois estados, o fetch preenchia só `produtos`. Como a tela usa `produtosExibidos` (que começa `[]`), nenhum card aparecia até escolher uma categoria.

**6. Erros menores**
- `function buscarProdutos([])`: a desestruturação de um argumento `undefined` causava `TypeError`, e o fetch não rodava.
- `filtrarProdutos()` dentro do `useEffect`: rodava sem categoria e antes de os dados chegarem.
- Duas declarações de `filtrarProdutos` no mesmo arquivo: o Vite não compilava (`Identifier has already been declared`).
- Setter com nome enganoso (`setCategoria` guardando uma lista de produtos).

## A solução

### Header: separar o texto exibido do valor enviado

```jsx
<select onChange={(e) => filtrarProdutos(e.target.value)} defaultValue="">
  <option value="" disabled>Filtrar Produtos</option>
  <option value="All">Todos</option>
  <option value="men's clothing">Roupas Masculinas</option>
  <option value="women's clothing">Roupas Femininas</option>
  <option value="electronics">Eletrônicos</option>
  <option value="jewelery">Joias</option>
</select>
```

### App: dois estados (versão final usada no projeto)

```jsx
const [produtos, setProdutos] = useState([]);                 // gaveta 1: lista original da API
const [produtosExibidos, setProdutosExibidos] = useState([]); // gaveta 2: o que aparece na tela

function buscarProdutos() {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((response) => {
      setProdutos(response);         // lista original (nunca filtrada)
      setProdutosExibidos(response); // tela começa com todos
    });
}

function filtrarProdutos(categoria) {
  if (categoria !== "All") {
    const produtosFiltrados = produtos.filter(
      (produto) => produto.category === categoria
    );
    setProdutosExibidos(produtosFiltrados);
  } else {
    setProdutosExibidos(produtos);
  }
}

useEffect(() => {
  buscarProdutos();
}, []);

// no JSX: produtosExibidos.map(...)
```

### Alternativa: um estado + valor calculado

Em vez de guardar a lista filtrada, guardar só a categoria escolhida e calcular a lista a cada renderização. Evita ter que sincronizar dois estados.

```jsx
const [produtos, setProdutos] = useState([]);
const [categoria, setCategoria] = useState("All");

const produtosFiltrados =
  categoria === "All"
    ? produtos
    : produtos.filter((p) => p.category === categoria);
```

## Por que funciona

1. O usuário escolhe uma opção, e o `select` envia o `value` em inglês.
2. `filtrarProdutos` filtra **sempre a partir da lista original** (`produtos`).
3. `setProdutosExibidos` atualiza o estado e o React re-renderiza o componente.
4. A tela mostra só os produtos da categoria, e "Todos" volta a mostrar tudo.

## Conceitos estudados

### `useState`: a memória do componente

O componente é uma função que o React executa a cada renderização. Variáveis comuns são recriadas a cada execução e, ao mudar, não avisam o React. O `useState` guarda um valor que **sobrevive às renderizações** e que, quando muda, **atualiza a tela**.

```jsx
const [categoria, setCategoria] = useState("All");
```

- `"All"` é o **argumento**: o valor inicial.
- `categoria` e `setCategoria` **não são parâmetros**. São variáveis criadas por **desestruturação de array**: `useState` retorna `[valorAtual, funçãoQueAltera]` e os colchetes dão nome a cada posição. Os nomes são livres; a convenção é `[algo, setAlgo]`.

**Analogia da gaveta:** o React reserva uma gaveta num armário que só ele controla. `categoria` é uma **foto** do conteúdo; `setCategoria` é a **única chave** para trocá-lo. Mexer na foto não muda a gaveta.

**Analogia do restaurante:** `useState` é a reserva de uma mesa. `categoria` é o **comprovante** do pedido; `setCategoria` é o **garçom**. O restaurante reconhece as mesas pela **ordem das reservas**, por isso `useState` não pode ficar dentro de `if` ou loops.

**Regras:**
- Sempre mudar pelo setter (`categoria = "x"` não atualiza a tela).
- O novo valor só aparece na próxima renderização, não logo depois do `set`.
- Usar `useState` apenas no topo do componente.

### `useEffect`: ações fora da renderização

Executa código **depois que o componente aparece na tela**, para efeitos colaterais: buscar dados, timers, listeners. Colocar o fetch solto no componente causaria loop infinito (fetch, `set`, renderiza, fetch…).

| Forma | Quando roda |
|---|---|
| `useEffect(() => {...}, [])` | Só uma vez, após a primeira renderização |
| `useEffect(() => {...}, [categoria])` | Na primeira vez e sempre que `categoria` mudar |
| `useEffect(() => {...})` | Após toda renderização (raramente desejado) |

**Função de limpeza:** o `return` do efeito desliga o que ele deixou ligado (timers, listeners). Como uma mesa de restaurante: antes de receber o próximo cliente, o garçom limpa o que o anterior deixou. A ordem é sempre limpar o efeito anterior e depois rodar o novo.

```jsx
useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(id); // limpeza
}, []);
```

Filtrar **não** é efeito colateral (é cálculo a partir do estado), por isso não vai no `useEffect`.

## Lições

- **Texto da `<option>` ≠ `value`.** O usuário vê um, o código recebe o outro.
- **Nunca filtre em cima da lista original.** Mantenha os dados da API intactos.
- **Com dois estados, abasteça os dois.** Ou prefira calcular: se dá para calcular, não guarde em estado.
- **Nomes de setter devem dizer o que guardam** (`[produtosExibidos, setProdutosExibidos]`).
- **`const` por padrão**, `let` só quando a variável é reatribuída.
- **Use `===` e `!==`** em vez de `==` e `!=`.
- **Leia o console e o terminal.** Os erros (`ReferenceError`, `TypeError`, `already declared`) apontam a linha exata do problema.

## Próximo passo

Implementar a ordenação por preço/avaliação no segundo `select`, aplicando `[...lista].sort(...)` sobre a lista exibida (a cópia com `...` evita alterar o array original).