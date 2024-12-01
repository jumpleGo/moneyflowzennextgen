import axios from 'axios'

export const getPriceByTickers = async () => {
  return await axios.get('https://api.currencyapi.com/v3/latest?apikey=cur_live_SFXfJgqgnFCV9DF3YrGgcUgvpypd0BmN3V5S6uPq&currencies=RUB')
}
