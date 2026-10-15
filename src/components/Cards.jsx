const Cards = ({title, image, price, rate}) => {
    return (
        <main>
            <div className="bg-white rounded p-4">
                <div className="relative">
                    <div className="bg-sky-600 p-0.5 font-bold  text-sm top-1 absolute right-3 rounded">
                        
                        <span className="text-white">
                            ${rate}
                        </span>
                    </div>
                </div>
                <div className="pt-4">
                    <h2 className="font-semibold text-2xl">
                        {title}
                    </h2>
                    <h6 className="font-bold">
                        {category}
                    </h6>
                    <h6 className="text-right text-2xl">
                        $ {price.toFixed(2)}
                    </h6>
                </div>
            </div>
        </main>
    );
}

export default Cards;