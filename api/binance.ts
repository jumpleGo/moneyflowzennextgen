import axios, { type AxiosResponse } from 'axios'

interface ISymbolPrice {
  symbol: string
  price: number
}

export const getPriceByTickers = async () :Promise<AxiosResponse<ISymbolPrice[]>> => {
  return await axios.get('https://api4.binance.com/api/v3/ticker/price?symbols=["BTCRUB","USDTRUB","NOTUSDT","TONUSDT"]')
}