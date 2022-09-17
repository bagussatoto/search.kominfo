import Image from 'next/image';

export default function VideoResult({ videos }) {
  return (
    <div className="md:w-1/3 ">
      <h2 className="text-sm font-semibold mb-2">Related Videos</h2>
      <div className="flex flex-row md:flex-wrap max-h-screen md:border rounded-md md:border-slate-300 md:py-4 overflow-x-scroll md:overflow-y-scroll">
        {videos &&
          videos.map((a, i) => {
            return (
              <div key={i} className="w-2/3 md:w-1/2 px-1 md:p-2 md:h-48">
                <div className="card h-full w-full rounded-md bg-white shadow-md p-2 border border-slate-200">
                  <Image
                    src={a.thumbnails.url}
                    width={720}
                    height={410}
                    alt={a.title}
                  />
                  <h2
                    href={a.url}
                    className="font-semibold text-sm hover:text-gray-400 truncate"
                  >
                    <a href={a.url}> {a.title}</a>
                  </h2>
                  <p className="font-normal text-xs text-slate-500 truncate">
                    {a.channel.name}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
