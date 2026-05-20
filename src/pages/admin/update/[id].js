import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import { useRouter } from "next/router";
import { useState } from "react";


export default function Update({ product }) {

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({ title: product.title, image: product.image, description: product.description, waranty: product.waranty, price: product.price });

    const changeHandler = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    
    };

    const submitHandler = async (e) => {

        e.preventDefault();

        const { image, title, description, waranty, price } = formData;

        if ( image.trim() === "" || title.trim() === "" || description.trim() === "" || waranty.trim() === "" || price === "" ) {

            alert("All Fields Are Required");

            return;
        }

        if (title.trim().length < 3) {

            alert("Title Must Be At Least 4 Characters");

            return;
        }

        if (description.trim().length < 30) {

            alert("Description Must Be At Least 30 Characters");

            return;
        }

        if (Number(price) <= 0) {

            alert("Price Must Be Greater Than 0");

            return;
        }

        try {

            setLoading(true);

            const response = await fetch("/api/medicens", {

                method: "PATCH",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    id: product.id,
                    ...formData
                })

            });

            const data = await response.json();

            if (!response.ok) {

                alert(data.message);

                return;
            }

            alert("Medicine Updated Successfully");

            router.push("/admin");

        }

        catch (error) {

            console.log(error);

            alert("Something Went Wrong");
        }

        finally {
            setLoading(false);
        }
    
    };

    return (
        <>
            <Navbar />

            <div className="max-w-3xl mx-auto px-6 py-16">

                <div className="bg-zinc-900 border border-[#3ecf8e] rounded-3xl p-10">

                    <h1 className="text-5xl text-center font-black text-[#3ecf8e] mb-10">Update Medicine</h1>

                    <form onSubmit={submitHandler} className="space-y-6">

                        <input type="text" name="image" value={formData.image} onChange={changeHandler} placeholder="Enter Image URL" className="w-full bg-black border border-[#3ecf8e] px-5 py-4 rounded-xl outline-none" />

                        <input type="text" name="title" value={formData.title} onChange={changeHandler} placeholder="Enter Medicine Title" className="w-full bg-black border border-[#3ecf8e] px-5 py-4 rounded-xl outline-none" />

                        <textarea name="description" value={formData.description} onChange={changeHandler} placeholder="Enter Description" className="w-full bg-black border border-[#3ecf8e] px-5 py-4 rounded-xl outline-none h-40 resize-none" />

                        <input type="text" name="waranty" value={formData.waranty} onChange={changeHandler} placeholder="Enter Warranty" className="w-full bg-black border border-[#3ecf8e] px-5 py-4 rounded-xl outline-none" />

                        <input type="number" name="price" value={formData.price} onChange={changeHandler} placeholder="Enter Price" className="w-full bg-black border border-[#3ecf8e] px-5 py-4 rounded-xl outline-none" />

                        <div className="flex flex-col gap-4">

                            <button disabled={loading} className="w-full bg-[#3ecf8e] hover:bg-[#2c9465] text-black font-bold py-4 rounded-xl duration-300">
                                {
                                    loading
                                        ? "Updating..."
                                        : "Update Medicine"
                                }
                            </button>

                            <button type="button" onClick={() => router.push("/admin")} className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 rounded-xl duration-300">
                                Cancel
                            </button>

                        </div>

                    </form>

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
