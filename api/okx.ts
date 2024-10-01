import axios from 'axios'

export const getPriceByTickers = async () => {
  return await axios.get('https://www.okx.com/api/v5/market/index-tickers?instId=NOT-USDT')
}