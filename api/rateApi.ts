import axios from 'axios'

export const getPriceByTickers = async () => {
  return await axios.get('https://api.currencyapi.com/v3/latest?apikey=cur_live_inCOeFQdFupAZSbu9z2cM4dlHJfMSeBqCbabgNpu&currencies=RUB')
}
