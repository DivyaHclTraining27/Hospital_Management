import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Sidebar = () => {
    const router = useRouter();
    const handleLogout = () => {
        signOut();
        router.push('/');
    };

    return (
        <div className="w-64 min-h-screen bg-sky-500 text-white p-5">
            <h1 className="text-xl font-bold">Bayer Health</h1>
            <nav className="mt-5">
                <ul className="space-y-4">
                    <li>
                        <Link href="/users/dashboard" className="hover:text-gray-300">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/users/profile" className="hover:text-gray-300">
                            My Profile
                        </Link>
                    </li>
                    <li>
                        <Link href="/metrics" className="hover:text-gray-300">
                            Health Metrics
                        </Link>
                    </li>
                    <li>
                        <Link href="/messages" className="hover:text-gray-300">
                            Messages
                        </Link>
                    </li>
                    <li>
                        <Link onClick={handleLogout} href="/" className="hover:text-gray-300">
                            Logout
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;