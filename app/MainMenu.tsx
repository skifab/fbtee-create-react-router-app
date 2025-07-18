import { Link } from "react-router";

export function MainMenu() {

    return (
        <nav className="flex items-center gap-4">
            <Link to="/" className="text-blue-500 hover:underline">Home</Link>
            <Link to="/about" className="text-blue-500 hover:underline">About</Link>
        </nav>
    )
}
