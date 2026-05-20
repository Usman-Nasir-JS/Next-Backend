import Link from "next/link";
import { useRouter } from "next/router";

import { UserButton, SignInButton, useUser } from "@clerk/nextjs";


export default function Navbar() {

    const router = useRouter();

    const { isSignedIn } = useUser();

    const links = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "Store",
            path: "/store"
        },
        {
            name: "Admin",
            path: "/admin"
        },
        {
            name: "Cart",
            path: "/cart"
        },
    ];

    return (
        <nav className="bg-black border-b border-[#3ecf8e] sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                <Link href="/">
                    <h1 className="text-3xl font-black text-[#3ecf8e] cursor-pointer">MedicalStore</h1>
                </Link>

                <div className="flex items-center gap-10">

                    {
                        links.map((item, index) => (

                            <Link key={index} href={item.path}
                                className={`font-semibold hover:text-[#3ecf8e] duration-300 ${
                                    router.pathname === item.path
                                        ? "text-[#3ecf8e]"
                                        : "text-white"
                                }`}
                            >
                                {item.name}
                            </Link>

                        ))
                    }

                    {
                        !isSignedIn ? (

                            <SignInButton mode="modal">

                                <button className="bg-[#3ecf8e] hover:bg-green-500 text-black px-5 py-2 rounded-xl font-bold duration-300">
                                    Login
                                </button>

                            </SignInButton>

                        ) : (

                            <UserButton afterSignOutUrl="/" />

                        )
                    }

                </div>

            </div>

        </nav>
    );

}
