import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const query = req.query.query as string;

  if (!query) {
    return res.status(400).json({ message: '검색어 입력이 필요합니다.' });
  }

  const url = `https://openapi.naver.com/v1/search/local.json?display=5&query=${encodeURIComponent(query)}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'X-Naver-Client-Id': process.env.LOCATION_SEARCH_CLIENT_ID,
        'X-Naver-Client-Secret': process.env.LOCATION_SEARCH_CLIENT_SECRET,
      },
    });

    res.status(200).json(response.data.items);
  } catch (error) {
    res.status(500).json({ message: 'API 요청에 실패했습니다.', error });
  }
}
