export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return
  const {currentProductName} = storeToRefs(useDetailInfoStore())
  if (['/crypto', '/cryptodeep', '/introday', '/start_to_trading', '/practicum', '/baza'].includes(to.path)) {
    currentProductName.value = to.path.replace('/','')
    return navigateTo(`/description?page=${currentProductName.value}`)
  }
  if (to.path === '/description' && to.query.page) {
    currentProductName.value = to.query.page as string
  }

   navigateTo(to.path)
})
