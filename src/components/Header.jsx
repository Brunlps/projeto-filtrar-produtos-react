const Header = ({filtrarProdutos}) => {
    return (
        <header className="flex flex-col md:px-8 lg:flex-row lg:justify-between lg:items-center lg:px-16 lg:py-6 bg-sky-600">

            <div className="relative w-full lg:w-auto pb-2">
                <a href="">
                    <box-icon name='search-alt' className="absolute right-3 top-2.5 hover:fill-sky-600"></box-icon>
                </a>
                <input type="text" placeholder="Buscar Produtos" className="w-full lg:w-120 h-10 rounded bg-white px-4 " />

            </div>
            <div>

                <select 
                onChange={(event) => filtrarProdutos(event.target.value)} 
                defaultValue=""
                className="h-10 bg-white px-4 m-2 rounded">
                    <option value="" disabled>Filtrar Produtos</option>
                    <option value="All">Todos</option>
                    <option value="men's clothing">Roupas Masculinas</option>
                    <option value="women's clothing">Roupas Femininas</option>
                    <option value="electronics">Eletronicos</option>
                    <option value="jewelery">Jóias</option>
                </select>

                <select className="h-10 bg-white px-4 rounded">
                    <option>Ordenção Produtos</option>
                    <option>Ordenção por preços</option>
                    <option>Ordenação por Avaliação</option>
                </select>
            </div>
        </header>

    );
}

export default Header;