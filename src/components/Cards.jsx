const Cards = ({ title, image, rate, category, price }) => {
    return (
        <main>
            <div className="bg-white rounded p-4" title={title}>
                <div className="grid lg:grid-cols-4 md:grid-cols-4 gap-4 ">
                    <img
                        src={image}
                        alt="Imagem de produtos"
                        className="w-full h-55 object-contain" />

                    <div className="bg-sky-600 text-white font-bold absolute top-1 right-1 rounded">
                        <span className="text-white">{rate}</span>
                        <box-icon className=" fill-yellow-400" name='star' type='solid' ></box-icon>
                    </div>
                    <div className="pt-4">
                        <h2 className="font-semibold text-2xl line-clamp-1">
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
            </div>
        </main>
    );
}

export default Cards;