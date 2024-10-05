import { Getter } from '~/helpers/getter'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.server) return
  const { $databaseRef } = useNuxtApp()
  const {currentProductName, tariffs, products} = storeToRefs(useDetailInfoStore())
  if (!products.value?.length) {
    products.value = await Getter.getFromDB('products/')
  }

  if (!tariffs.value?.length) {
    tariffs.value = await Getter.getFromDB( 'tariffs/')
  }

  if (['/crypto', '/cryptodeep', '/introday', '/start_to_trading', '/practicum', '/baza'].includes(to.path)) {
    currentProductName.value = to.path.replace('/','')
    return navigateTo(`/description?page=${currentProductName.value}`)
  }
  if (to.path === '/description' && to.query.page) {
    currentProductName.value = to.query.page as string
  }

   navigateTo(to.path)
})
