import Link from 'next/link';

export default function SearchResult({ search }) {
  return (
    <div className="flex flex-col md:w-2/3 gap-7 text-start">
      {search &&
        search.map((a, i) => {
          return (
            <div key={i} className="card">
              <p className="text-xs font-normal text-black mb-1 truncate">
                {a.url}
              </p>
              <Link href={a.url} passHref>
                <a className="text-xl font-normal text-blue-700 hover:underline">
                  {a.title}
                </a>
              </Link>
              <p className="text-xs font-normal text-slate-500 mt-1">
                {a.description}
              </p>
            </div>
          );
        })}
    </div>
  );
}
