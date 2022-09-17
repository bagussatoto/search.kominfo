/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FiSearch } from 'react-icons/fi';
import SearchResult from '../components/SearchResult';
import VideoResult from '../components/VideoResult';
import Pagination from '../components/Pagination';
import YNTKTS from '../components/YNTKTS';
import Footer from '../components/Footer';
import User from '../components/User';
import HeadMeta from '../components/Head';
import { event } from '../lib/ga';
import randomString from '../lib/randomString';

export function getServerSideProps(ctx) {
  const query = ctx.req;

  return { props: { a: 'a' } };
}

export default function search(props) {
  const router = useRouter();

  const { q, page } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [input, setInput] = useState(q || 'bagusok');

  const getSearch = async (q, page) => {
    let get = await fetch(`/api/search?q=${q}&page=${page || 0}`, {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'X-CSRF-TOKEN': randomString(32).toString(),
      },
    });
    let res = await get.json();
    return res.data;
  };

  useEffect(() => {
    if (!q) {
      router.push('/');
    }
    setIsLoading(true);
    getSearch(q, page).then((res, err) => {
      if (res.status === 'success') {
        setSearch(res);
        setIsLoading(false);
      } else {
        setSearch({ results: '' });
        setIsLoading(false);
      }
    });
  }, [router]);

  const handleSearch = (e) => {
    e.preventDefault();
    event({
      action: 'search2',
      params: {
        search_term: input,
      },
    });
    router.push({ query: { q: input, page: 1 } });
  };

  return (
    <>
      <HeadMeta title={q + ' | Gatotkaca Search'} />
      <div className="min-h-screen flex flex-col justify-between px-3 py-6 md:px-[2rem]">
        <div>
          <div className="flex flex-col md:flex-row justify-between gap-6 text-center items-center  w-full">
            <div className="form-group flex flex-col md:flex-row items-center gap-4 md:gap-12 relative w-full">
              <Link href="/" passHref>
                <a href="#" className="text-2xl font-semibold text-orange-400">
                  Gatot Kaca
                </a>
              </Link>
              <form
                onSubmit={(e) => handleSearch(e)}
                className="w-full md:w-2/3 relative"
              >
                <input
                  type="text"
                  className="h-12 w-full pl-5 pr-[3rem] py-2 bg-white rounded-full text-sm border border-slate-200 shadow-md focus:border focus:border-slate-500 focus:outline-none"
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                />
                <button
                  type="submit"
                  className="text-blue-700 absolute right-4 text-2xl b bottom-3 hover:text-blue-200"
                >
                  <FiSearch />
                </button>
              </form>
            </div>
            <User />
          </div>
          <div className="flex flex-row gap-6 text-sm mt-7 border-b border-slate-200">
            <a href="#" className="border-b-2 border-slate-500">
              Semua
            </a>
            <a href={`/images?q=${q}&page=1`} className="text-slate-400">
              Gambar
            </a>
          </div>
          {isLoading ? (
            <img
              src="/loading.gif"
              className="text-center absolute left-[40%] top-[45%] w-24 md:w-48"
              alt="loading"
            />
          ) : search.results.length !== 0 ? (
            <>
              <div className="flex flex-col-reverse md:flex-row gap-6 mt-8">
                <SearchResult search={search.results} />
                <VideoResult videos={search.videos} />
              </div>
              <div className="mt-5 md:mt-[5rem]">
                <Pagination />
              </div>
            </>
          ) : (
            <YNTKTS />
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}
