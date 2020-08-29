import { local } from 'wix-storage'
import wixData from 'wix-data'
import wixWindow from 'wix-window'
import { setOrderItems } from 'public/itemInteractions.js'
import { getRandomAlpahNumericString } from 'public/utils.js'

const getEmptyUserOrder = (userId) => {
  return {
    orderItems: {},
    email: '',
    userId,
    _id: userId,
  }
}

$w.onReady(async () => {
  if (wixWindow.rendering.env !== 'browser') {
    return
  }

  const existingUserId = local.getItem('userId')
  const userId = existingUserId || getRandomAlpahNumericString(20)
  if (!existingUserId) {
    local.setItem('userId', userId)
  }
  const userOrderDetails = await wixData.get('orders', userId)
  if (!userOrderDetails) {
    await wixData.insert('orders', getEmptyUserOrder(userId))
    setOrderItems({})
  } else {
    setOrderItems(userOrderDetails.orderItems)
  }
})
