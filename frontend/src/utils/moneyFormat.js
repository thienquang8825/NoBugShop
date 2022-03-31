export const moneyFormat = (money) => {
  return money.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
}
