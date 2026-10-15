const Header = () => {
    return ( 
         <header className="flex flex-col md:px-8 lg:flex-row lg:justify-between lg:items-center lg:px-16 lg:py-6 bg-sky-600">
  
        <div className="relative w-full lg:w-auto pb-2">

            <input type="text" placeholder="Buscar Produtos" className="w-full lg:w-120 h-10 rounded bg-white px-4 "/>

        </div>
        <div className="flex flex-col gap-2 sm:flex-col pb-2">

            <select className=" h-10 bg-white px-4 rounded">
                <option>Filtrar Produtos</option>
                <option >Todos</option>
                <option>Roupas Masculinas</option>
                <option>Roupas Femininas</option>
                <option>Eletronicos</option>
                <option>Jóias</option>
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