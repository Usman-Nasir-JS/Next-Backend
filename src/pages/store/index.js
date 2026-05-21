import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MedicineCard from "@/components/MedicineCard";

import { useState } from "react";


export default function Store({ data }) {

    const [search, setSearch] = useState("");

    const filteredData = data.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#3ecb8c] text-center lg:text-left">Medicines Store</h1>

                    <input type="text" placeholder="Search Medicine...!" className="bg-zinc-900 border border-[#2c9465] px-5 py-3 rounded-xl outline-none w-full lg:w-80" value={search} onChange={(e) => setSearch(e.target.value)} />

                </div>

                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">

                    {
                        filteredData.map(item => (
                            <MedicineCard key={item.id} item={item} />
                        ))
                    }

                </div>

            </div>

            <Footer />
        </>
    );

}


export async function getServerSideProps() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/medicens`);

    const data = await res.json();

    return {
        props: {
            data
        }
    };

}
