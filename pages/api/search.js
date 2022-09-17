import randomString from '../../lib/randomString';

export default async function handler(req, res) {
  if (req.method !== 'GET')
    return res
      .status(405)
      .json({ status: 'failed', message: 'Metode tidak valid.' });

  if (!req.headers['x-csrf-token'] || req.headers['x-csrf-token'].length !== 32)
    return res
      .status(405)
      .json({ status: 'failed', message: 'Metode tidak valid.' });

  if (!req.query.q)
    return res
      .status(404)
      .json({ status: 'failed', message: 'Query tidak boleh kosong.' });

  const searchQuery = req.query.q || 'aaa';
  const page = req.query.page - 1 || 0;

  let headersList = {
    Accept: '*/*',
    'X-CSRF-TOKEN': randomString(32),
  };

  let response = await fetch(
    `https://gatotkaca-search.vercel.app/api/search2?q=${searchQuery}&page=${page}`,
    {
      method: 'GET',
      headers: headersList,
    }
  );

  let data = await response.json();
  return res.status(200).json({
    data,
  });
}
