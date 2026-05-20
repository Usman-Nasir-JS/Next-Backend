import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";


export default function Cart() {

    const router = useRouter();

    const [cart, setCart] = useState([]);
    const { isSignedIn } = useUser();

    useEffect(() => {

        const getCart = JSON.parse(localStorage.getItem("cart")) || [];

        const updatedCart = getCart.map(item => ({ ...item, quantity: item.quantity || 1 }));

        setCart(updatedCart);

        localStorage.setItem( "cart", JSON.stringify(updatedCart) );

    }, []);

    const removeItem = (id) => {

        const filtered = cart.filter(item => item.id !== id);

        setCart(filtered);

        localStorage.setItem( "cart", JSON.stringify(filtered) );

    };

    const increaseQuantity = (id) => {

        const updatedCart = cart.map(item => {

            if (item.id === id) {

                if (item.quantity >= 10) {
                    return item;
                }

                return { ...item, quantity: item.quantity + 1 };
            }

            return item;
        });

        setCart(updatedCart);

        localStorage.setItem( "cart", JSON.stringify(updatedCart) );
    
    };

    const decreaseQuantity = (id) => {

        const updatedCart = cart.map(item => {

            if (item.id === id) {

                if (item.quantity <= 1) {
                    return item;
                }

                return { ...item, quantity: item.quantity - 1 };
            }

            return item;
        });

        setCart(updatedCart);

        localStorage.setItem( "cart", JSON.stringify(updatedCart));

    };

    const totalPrice = cart.reduce((acc, item) => {

        return acc + (item.price * item.quantity);

    }, 0);

    const purchaseAll = () => {

        if (cart.length === 0) {

            alert("Cart Is Empty");

            return;
        }

        const confirmPurchase = confirm("Do you want to purchase all carts ?");

        if (!confirmPurchase) return;

        alert("Purchase Successful");

        localStorage.removeItem("cart");

        setCart([]);

        router.push("/");
    };

    return (
        <>
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-14 min-h-screen">

                <h1 className="text-5xl text-center font-black text-[#3ecf8e]">Shopping Carts</h1>

                {
                    cart.length === 0 ? (

                        <div className="flex items-center justify-center h-[60vh]">

                            <h1 className="text-4xl font-bold text-gray-500">There is No carts...!</h1>

                        </div>

                    ) : (

                        <>
                            <div className="mt-10 space-y-8">

                                {
                                    cart.map(item => (

                                        <div key={item.id} className="bg-zinc-900 border border-[#3ecf8e] rounded-3xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">

                                            <div className="flex items-center gap-5">

                                                <img src={item.image} alt={item.title} className="w-36 h-36 object-cover rounded-2xl" />

                                                <div>

                                                    <h1 className="text-3xl font-black text-[#3ecf8e]">{item.title}</h1>

                                                    <p className="text-gray-400 mt-3">{item.description}</p>

                                                    <h2 className="mt-4 text-2xl font-bold">${ item.price * item.quantity }</h2>

                                                </div>

                                            </div>

                                            <div className="flex flex-col items-end gap-5">

                                                <div className="flex items-center bg-black border border-[#3ecf8e] rounded-xl overflow-hidden">

                                                    <button onClick={() => decreaseQuantity(item.id) } className="px-5 py-3 text-2xl font-bold hover:bg-zinc-800">
                                                        -
                                                    </button>

                                                    <span className="px-6 text-xl font-bold">{item.quantity}</span>

                                                    <button onClick={() => increaseQuantity(item.id) } className="px-5 py-3 text-2xl font-bold hover:bg-zinc-800" >
                                                        +
                                                    </button>

                                                </div>

                                                <button onClick={() => removeItem(item.id) } className="bg-red-500 hover:bg-red-600 px-8 py-3 rounded-xl font-bold">
                                                    Remove
                                                </button>

                                            </div>

                                        </div>

                                    ))
                                }

                            </div>

                            <div className="mt-14 bg-zinc-900 border border-[#3ecf8e] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">

                                <h1 className="text-5xl font-black text-[#3ecf8e]">Total: ${totalPrice}</h1>

                                {
                                    !isSignedIn ? (

                                        <SignInButton mode="modal">

                                            <button className="bg-[#3ecf8e] hover:bg-[#2c9465] text-black font-black px-10 py-4 rounded-2xl text-xl duration-300">
                                                Purchase All
                                            </button>

                                        </SignInButton>

                                    ) : (

                                        <button onClick={purchaseAll} className="bg-[#3ecf8e] hover:bg-[#2c9465] text-black font-black px-10 py-4 rounded-2xl text-xl duration-300">
                                            {
                                                cart.length === 1
                                                    ? "Purchase"
                                                    : "Purchase All"
                                            }
                                        </button>

                                    )
                                }

                            </div>
                        </>
                    )
                }

            </div>

            <Footer />
        </>
    );
    
}
