export default function TopBar() {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between px-6 py-4 bg-white max-w-screen-xl mx-auto">
      <div className="flex items-center gap-2 text-2xl font-bold">
        <span>ClassMarker</span>
        <span className="text-red-500">✔</span>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid w-full md:w-auto grid-cols-2 md:grid-cols-[1fr_1fr_auto] gap-3 items-center"
      >
        <input
          className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
          placeholder="Username"
          aria-label="Username"
        />
        <input
          type="password"
          className="h-10 rounded-lg border border-gray-200 px-3 text-sm"
          placeholder="Password"
          aria-label="Password"
        />
        <button className="h-10 rounded-lg bg-gray-800 px-4 text-white font-medium">
          Login
        </button>

        <div className="col-span-2 flex items-center justify-end gap-4 text-sm text-gray-500">
          <a href="#register" className="text-red-600 hover:underline">
            Register free
          </a>
          <a href="#forgot" className="text-red-600 hover:underline">
            Forgot password?
          </a>
          <label className="inline-flex items-center gap-2 select-none">
            <input type="checkbox" className="size-4" /> Stay logged in
          </label>
        </div>
      </form>
    </div>
  );
}
