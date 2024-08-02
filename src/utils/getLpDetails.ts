import axios from 'axios';

const getLpDetails = async (tokenAddress: string) => {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.rugcheck.xyz/v1/tokens/${tokenAddress}/report`,
    headers: {},
  };

  const res = await axios.request(config);
  return res.data;
};

export default getLpDetails;
