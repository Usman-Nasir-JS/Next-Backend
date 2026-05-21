import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MedicineCard from "@/components/MedicineCard";

import { useRouter } from "next/router";

export default function Admin({ data }) {

    const router = useRouter();

    const deleteHandler = async (id) => {

        const confirmDelete = confirm("Delete this medicine?");

        if (!confirmDelete) return;

        await fetch("/api/medicens", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        });

        router.reload();

    };

    return (
        <>
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#3ecf8e] text-center md:text-left">Admin Panel</h1>

                    <Link href="/admin/add" className="bg-[#3ecf8e] hover:bg-[#2c9465] px-6 sm:px-8 py-3 rounded-xl text-black font-bold text-center duration-300">
                        Add Medicine
                    </Link>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">

                    {
                        data.map(item => (

                            <MedicineCard key={item.id} item={item} admin={true} deleteHandler={deleteHandler} />

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
