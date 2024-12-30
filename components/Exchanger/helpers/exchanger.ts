export const  calculateExpirationTime = (): Date => {
  const currentTime = new Date();
  currentTime.setMinutes(currentTime.getMinutes() + 15);
  return currentTime;
};