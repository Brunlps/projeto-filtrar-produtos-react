
import { useEffect, useState } from "react";
import Cards from "./components/Cards";
import Header from "./components/Header"


const App = () => {

    const [produtos, setProdutos] = useState([]);
    const [produtosExibidos, setProdutosFiltrados] = useState([])
    // Foi criado uma constante com userState, o mesmo da memória a um componente
    // para que o valor sobreviva a cada renderização

    function buscarProdutos() {
        fetch("https://fakestoreapi.com/products")
            .then((response) => { return response.json() })
            .then((response) => {
                setProdutos(response);// produtos: lista original da API (nunca é filtrada)
                setProdutosFiltrados(response);// produtosExibidos: o que aparece na tela, usado no map()

            })
    };

    function filtrarProdutos(categoria) {

        if (categoria != "All") {

            let produtosFiltrados = produtos.filter((produto) => {
                return produto.category == categoria;
            });

            setProdutosFiltrados(produtosFiltrados);
        } else {
            setProdutosFiltrados(produtos);
        }
    }

    function ordenacaoProduto(ordem) {
        let produtoOrdenados = [];

        if (ordem == "preco") {
            produtoOrdenados = produtos.toSorted((prodA, prodB) => {
                return prodA.price - prodB.price;
            });
        } else {
            produtoOrdenados = produtos.toSorted((prodA, prodB) => {
                return prodA.rating.rate - prodB.rating.rate;
            });
        }
        setProdutosFiltrados(produtoOrdenados);
    }

    function pesquisarProdutos(texto) {
        if (texto.length == 0) {
            setProdutosFiltrados(produtos);
            return;
        }

        if (texto.length >= 3) {
            let produtosEncontrados = produtos.filter((produto) => {
                return produto.title.toLowerCase().includes(texto.toLowerCase());
            });
            setProdutosFiltrados(produtosEncontrados);
        }
    }

    useEffect(() => {
        buscarProdutos();
    }, []);


    return (
        <>
            <Header
                filtrarProdutos={filtrarProdutos}
                ordenacaoProduto={ordenacaoProduto}
                pesquisarProdutos={pesquisarProdutos} />
            <main className="p-15 bg-slate-200">
                <div className="grid lg:grid-cols-4 md:grid-cols-4 gap-4 ">
                    {
                        produtosExibidos.map((produto) => (
                            <Cards
                                // Props 
                                key={produto.id}
                                title={produto.title}
                                image={produto.image}
                                category={produto.category}
                                price={produto.price}
                                rate={produto.rating.rate}>
                            </Cards>
                        ))
                    }
                </div>
            </main>

        </>
    );
}

export default App;
