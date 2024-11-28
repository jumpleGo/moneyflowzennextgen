import axios from 'axios'

export const getPriceByTickers = async () => {
  return await axios.get('https://api.currencyapi.com/v3/latest?apikey=cur_live_6VCadCcnTbgpl0OpMWeQa5J1nlCAvzgEyTo6XBPW&currencies=RUB')
}
