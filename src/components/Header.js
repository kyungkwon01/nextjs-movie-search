import Link from "next/link";

function Header() {
  return (
    <header className="bg-gray-800 text-white py-4">
      <nav className="container mx-auto flex justify-between">
        <ul>
          <li>
            <Link href="/">
              <span className="text-lg hover:text-gray-400">Home</span>
            </Link>
          </li>
          <li>
            <Link href="/search">
              <span className="text-lg hover:text-gray-400">Search Movies</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
