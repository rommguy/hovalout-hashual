import { reducer, setItemAmountAction, getUserRecord } from 'public/utils.js'
import wixData from 'wix-data'
import { local } from 'wix-storage'

export const getCurrentItemAmount = async (itemId) => {
  const userId = local.getItem('userId')
  const userRecord = await wixData.get('orders', userId)
  const orderItems = userRecord.orderItems
  return orderItems[itemId] ? orderItems[itemId].amount : 0
}

export const onUpdateItem = async (itemId, newAmount, itemTitle, itemCateogry) => {
  const userRecord = await getUserRecord()
  const orderItems = userRecord.orderItems
  const action = setItemAmountAction(itemTitle, itemId, newAmount, itemCateogry)
  const updatedOrderItems = reducer(orderItems, action)
  userRecord.orderItems = updatedOrderItems
  await wixData.update('orders', userRecord)
}
