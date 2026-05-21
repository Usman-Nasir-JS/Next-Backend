import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import { useRouter } from "next/router";


export default function Product({ product }) {

    const router = useRouter();

    const addToCart = () => {

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const already = cart.find(item => item.id === product.id);

        if (already) {

            alert("Already Added In Cart");

            router.push("/store");

            return;
        }

        cart.push({ ...product, quantity: 1 });

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Added To Cart");

        router.push("/store");

    };

    const goBack = () => {
        router.push("/store");
    };

    return (
        <>
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 min-h-screen">

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

                    <img src={product.image} alt={product.title} className="rounded-3xl border border-[#3ecf8e] w-full max-h-125 object-cover" />

                    <div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#3ecf8e] leading-tight wrap-break-word">Title: {product.title}</h1>

                        <p className="text-gray-400 mt-6 sm:mt-8 text-base sm:text-lg leading-7 sm:leading-8 wrap-break-word">Description: {product.description}</p>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-6 sm:mt-8">Price: ${product.price}</h2>

                        <h3 className="text-gray-500 mt-4 sm:mt-5 text-base sm:text-lg">Warranty: {product.waranty}</h3>

                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-8 sm:mt-10">

                            <button onClick={addToCart} className="w-full sm:w-auto bg-[#3ecf8e] hover:bg-[#2c9465] text-black font-bold px-8 sm:px-10 py-4 rounded-2xl text-base sm:text-lg duration-300">
                                Add To Cart
                            </button>

                            <button onClick={goBack} className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-700 border border-[#3ecf8e] text-white font-bold px-8 sm:px-10 py-4 rounded-2xl text-base sm:text-lg duration-300">
                                Go Back
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            <Footer />
        </>
    );

}


export async function getServerSideProps(context) {

    const { id } = context.params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/medicens/${id}`);

    const product = await res.json();

    return {
        props: {
            product
        }
    };

}
