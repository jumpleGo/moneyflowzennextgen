import axios, { type AxiosResponse } from 'axios'
import type { ISymbolPrice } from '~/api/types'

export const getPriceByTickers = async () :Promise<AxiosResponse<ISymbolPrice[]>> => {
  return await axios.get('https://api4.binance.com/api/v3/ticker/price?symbols=["BTCUSDT","NOTUSDT","TONUSDT"]')
}