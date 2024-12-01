import axios, { type AxiosResponse } from 'axios'

export interface ISymbolPrice {
  symbol: string
  price: number
}

export const getPriceByTickers = async () :Promise<AxiosResponse<ISymbolPrice[]>> => {
  return await axios.get('https://api4.binance.com/api/v3/ticker/price?symbols=["BTCUSDT","USDTRUB","NOTUSDT","TONUSDT"]')
}