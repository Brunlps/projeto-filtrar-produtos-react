
import { useEffect, useState } from "react";
import Cards from "./components/Cards";
import Header from "./components/Header"


const App = () => {

    const [produtos, setProdutos] = useState([]);

    function buscarProdutos([]) {
        fetch("https://fakestoreapi.com/products")
            .then((response) => { return response.json() })
            .then((response) => {
                setProdutos(response)
            })
    }

    useEffect(() => {
        buscarProdutos();

    }, [])

    function filtrarProdutos(categoria) {

        if (categoria != "All") {

            let produtosFiltrados = produtos.filter((produto) => {
                return produto.category == categoria;
            });

            carregarProdutos(produtosFiltrados);
        } else {
            carregarProdutos(produtos);
        }
    }


    return (
        <>
            <Header />
            <main>
                <div id="cards" className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4 ">
                    {
                        produtos.map((produto) => (
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
