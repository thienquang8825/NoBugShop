export const moneyFormat = (money = 0) => {
  return money.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
}
