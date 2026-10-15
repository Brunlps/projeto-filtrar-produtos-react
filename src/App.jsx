
import { useEffect, useState } from "react";
import Cards from "./components/Cards";
import Header from "./components/Header"


const App = () => {

    const [produtos, setProdutos] = useState([]);
    const [produtosExibidos, setProdutosExibidos] = useState([])
    // Foi criado uma constante com userState, o mesmo da memória a um componente
    // para que o valor sobreviva a cada renderização

    function buscarProdutos() {
        fetch("https://fakestoreapi.com/products")
            .then((response) => { return response.json() })
            .then((response) => {
                setProdutos(response);// produtos: lista original da API (nunca é filtrada)

                setProdutosExibidos(response);// produtosExibidos: o que aparece na tela, usado no map()

            })
    };

    function filtrarProdutos(categoria) {

        if (categoria !== "All") {

            let produtosFiltrados = produtos.filter((produto) => {
                return produto.category === categoria;
            });

            setProdutosExibidos(produtosFiltrados);
        } else {
            setProdutosExibidos(produtos);
        }
    }

    useEffect(() => {
        buscarProdutos();
    }, []);


    return (
        <>
            <Header filtrarProdutos={filtrarProdutos} />
            <main className="p-15 bg-slate-200">
                <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4 ">
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
