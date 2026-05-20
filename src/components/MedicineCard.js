import Link from "next/link";

export default function MedicineCard({ item, admin, deleteHandler }) {

    const addToCart = () => {

        const cart = JSON.parse(
            localStorage.getItem("cart")
        ) || [];

        const alreadyExist = cart.find(
            single => single.id === item.id
        );

        if (alreadyExist) {
            alert("Already Added In Cart");
            return;
        }

        cart.push(item);

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        alert("Added To Cart");
    };

    return (
        <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-[#3ecf8e] hover:scale-105 duration-300">

            <img src={item.image} alt={item.title} className="w-full h-100 object-cover" />

            <div className="p-5">

                <h1 className="text-2xl font-bold text-[#3ecf8e]">Title: {item.title}</h1>

                <p className="text-gray-400 mt-3">
                    Description: {
                        item.description
                            .split(" ")
                            .slice(0, 2)
                            .join(" ")
                    }......
                </p>

                <div className="flex items-center justify-between mt-5">

                    <h2 className="text-2xl font-black text-white">Price: ${item.price}</h2>

                    <span className="text-sm text-gray-400">Waranty: {item.waranty}</span>

                </div>

                {
                    !admin && (
                        <div className="flex flex-col gap-3 mt-6">

                            <Link 
                                href={`/product/${item.id}`} 
                                onClick={() => {
                                    sessionStorage.setItem(
                                        "storeScrollPosition",
                                        window.scrollY
                                    );
                                }}
                                className="w-full bg-[#2c9465] hover:bg-[#2c9465] text-center py-3 rounded-xl text-black font-bold"
                            >
                                View
                            </Link>

                            <button onClick={addToCart} className="w-full bg-white hover:bg-zinc-200 text-black py-3 rounded-xl font-bold duration-300">
                                Add To Cart
                            </button>

                        </div>
                    )
                }

                {
                    admin && (
                        <div className="flex gap-3 mt-6">

                            <Link href={`/admin/update/${item.id}`} className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-center py-3 rounded-xl text-black font-bold">
                                Edit
                            </Link>

                            <button onClick={() => deleteHandler(item.id)} className="flex-1 bg-red-500 hover:bg-red-600 py-3 rounded-xl font-bold">
                                Delete
                            </button>

                        </div>
                    )
                }

            </div>

        </div>
    );
}
