const logos = ['Google', 'YAHOO!', 'Microsoft', 'LinkedIn', 'facebook', 'amazon', 'NETFLIX'];

export default function TrustLogos() {
  return (
    <section className="px-6 py-10 text-center">
      <p className="text-gray-600">
        The premium solution trusted by the world’s top organizations since <b>2006</b>
      </p>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-5 items-center">
        {logos.map((l) => (
          <div key={l} className="font-bold tracking-wide text-gray-700 opacity-90 grayscale">
            {l}
          </div>
        ))}
      </div>
    </section>
  );
}
