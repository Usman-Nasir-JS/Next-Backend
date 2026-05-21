import Link from "next/link";

export default function Hero() {

    return (
        <section className="min-h-[90vh] flex items-center justify-center bg-black px-4 sm:px-6">

            <div className="text-center max-w-4xl">

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#3ecf8e] leading-tight">Your Trusted <br /> Medicine Store</h1>

                <p className="text-gray-400 text-base sm:text-lg mt-6 sm:mt-8 px-2">Professional Medical E-Commerce Store with Admin Dashboard</p>

                <Link href="/store" className="inline-block mt-8 sm:mt-10 bg-[#3ecf8e] hover:bg-[#2c9465] text-black font-bold px-8 sm:px-10 py-3 sm:py-4 rounded-xl duration-300">
                    Explore Store
                </Link>

            </div>

        </section>
    );

}
