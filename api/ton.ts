import axios from 'axios'

export const checkTonAddress = async (address: string) => {
  const result = await axios.get(`https://toncenter.com/api/v2/getAddressInformation?address=${address}`)
  return result.data.ok
}