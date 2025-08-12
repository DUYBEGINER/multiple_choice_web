
export default function NavBar() {
  return (
    <nav className="bg-[#2b3037]">
      <ul className="flex gap-2 px-6 py-3 max-w-screen-xl mx-auto">
        <li>
          <a className="block rounded-lg px-3 py-2 text-gray-100 bg-white/10">
            Home
          </a>
        </li>

        <li className="relative group">
          <a className="block rounded-lg px-3 py-2 text-gray-100">
            Take a Tour ▾
          </a>
          <div className="invisible group-hover:visible absolute left-0 mt-2 w-56 rounded-xl bg-white p-2 shadow-xl">
            <a className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100">
              Create tests
            </a>
            <a className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100">
              Assign & share
            </a>
            <a className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100">
              Auto-grade results
            </a>
          </div>
        </li>

        <li><a className="block rounded-lg px-3 py-2 text-gray-100 hover:bg-white/10">Pricing</a></li>
        <li><a className="block rounded-lg px-3 py-2 text-gray-100 hover:bg-white/10">FAQ</a></li>
        <li><a className="block rounded-lg px-3 py-2 text-gray-100 hover:bg-white/10">Contact us</a></li>
      </ul>
      
    </nav>
  );
}
