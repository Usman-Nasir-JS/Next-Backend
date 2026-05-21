import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import { useRouter } from "next/router";
import { useState } from "react";


export default function AddMedicine() {

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({ image: "", title: "", description: "", waranty: "", price: "" });

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

                method: "POST",
                
                headers: {
                    "Content-Type": "application/json"
                },
                
                body: JSON.stringify({ image, title, description, waranty, price: Number(price) })

            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            alert("Medicine Added Successfully");

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

            <div className="min-h-screen bg-black py-10 sm:py-16 px-4 sm:px-6">

                <div className="max-w-3xl mx-auto bg-zinc-900 border border-[#3ecf8e] rounded-2xl sm:rounded-3xl p-5 sm:p-10">

                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-black text-[#3ecf8e] mb-8 sm:mb-10">Add Medicine</h1>

                    <form onSubmit={submitHandler} className="space-y-5 sm:space-y-6">

                        <div>

                            <label className="block mb-2 sm:mb-3 text-base sm:text-lg font-semibold">Image URL</label>

                            <input type="text" name="image" value={formData.image} onChange={changeHandler} placeholder="Enter Image URL" className="w-full bg-black border border-[#3ecf8e] rounded-xl px-4 sm:px-5 py-3 sm:py-4 outline-none text-sm sm:text-base" />

                        </div>

                        <div>

                            <label className="block mb-2 sm:mb-3 text-base sm:text-lg font-semibold">Medicine Title</label>

                            <input type="text" name="title" value={formData.title} onChange={changeHandler} placeholder="Enter Medicine Name" className="w-full bg-black border border-[#3ecf8e] rounded-xl px-4 sm:px-5 py-3 sm:py-4 outline-none text-sm sm:text-base" />

                        </div>

                        <div>

                            <label className="block mb-2 sm:mb-3 text-base sm:text-lg font-semibold">Description</label>

                            <textarea name="description" value={formData.description} onChange={changeHandler} placeholder="Enter Description" className="w-full h-32 sm:h-40 bg-black border border-[#3ecf8e] rounded-xl px-4 sm:px-5 py-3 sm:py-4 outline-none resize-none text-sm sm:text-base" />

                        </div>

                        <div>

                            <label className="block mb-2 sm:mb-3 text-base sm:text-lg font-semibold">Warranty</label>

                            <input type="text" name="waranty" value={formData.waranty} onChange={changeHandler} placeholder="Enter Warranty" className="w-full bg-black border border-[#3ecf8e] rounded-xl px-4 sm:px-5 py-3 sm:py-4 outline-none text-sm sm:text-base" />

                        </div>

                        <div>

                            <label className="block mb-2 sm:mb-3 text-base sm:text-lg font-semibold">Price</label>

                            <input type="number" name="price" value={formData.price} onChange={changeHandler} placeholder="Enter Price" className="w-full bg-black border border-[#3ecf8e] rounded-xl px-4 sm:px-5 py-3 sm:py-4 outline-none text-sm sm:text-base" />

                        </div>

                        <button disabled={loading} className="w-full bg-[#3ecf8e] hover:bg-[#2c9465] text-black font-bold py-3 sm:py-4 rounded-xl text-base sm:text-lg duration-300">
                            {
                                loading ? "Adding..." : "Add Medicine"
                            }
                        </button>

                    </form>

                </div>

            </div>

            <Footer />
        </>
    );

}
