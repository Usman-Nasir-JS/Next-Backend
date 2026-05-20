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

            <div className="max-w-7xl mx-auto px-6 py-12">

                <div className="flex items-center justify-between mb-10">

                    <h1 className="text-5xl font-black text-[#3ecf8e]">Admin Panel</h1>

                    <Link href="/admin/add" className="bg-[#3ecf8e] hover:bg-[#2c9465] px-8 py-3 rounded-xl text-black font-bold">
                        Add Medicine
                    </Link>

                </div>

                <div className="grid md:grid-cols-3 gap-8">

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

    const res = await fetch("http://localhost:3000/api/medicens");

    const data = await res.json();

    return {
        props: {
            data
        }
    };

}
