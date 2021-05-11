import wixData from 'wix-data'
import { reducer, setItemAmountAction, getUserRecord, debounce } from 'public/utils.js'
import { local, memory } from 'wix-storage'

const getLocalOrderItems = () => {
  const orderItemsString = memory.getItem('orderItems')
  if (orderItemsString) {
    return JSON.parse(orderItemsString)
  }
  return {}
}

export const getCurrentItemAmount = async (itemId) => {
  const orderItems = getLocalOrderItems()
  if (orderItems) {
    return orderItems[itemId] ? orderItems[itemId].amount : 0
  }
  const userRecord = await getUserRecord()
  const remoteOrderItems = userRecord.orderItems
  return remoteOrderItems[itemId] ? remoteOrderItems[itemId].amount : 0
}

export const setOrderItems = (remoteOrderItems) => {
  memory.setItem('orderItems', JSON.stringify(remoteOrderItems))
}

const updateOrderItemsInDB = debounce(async () => {
  const orderItems = getLocalOrderItems()
  const userRecord = await getUserRecord()
  userRecord.orderItems = orderItems
  await wixData.update('orders', userRecord)
}, 250)

export const onUpdateItem = (itemId, newAmount, itemTitle, itemCateogry) => {
  const orderItems = getLocalOrderItems()
  const action = setItemAmountAction(itemTitle, itemId, newAmount, itemCateogry)
  const updatedOrderItems = reducer(orderItems, action)
  setOrderItems(updatedOrderItems)
  updateOrderItemsInDB()
}
