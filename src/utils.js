import wixData from 'wix-data'
import { local } from 'wix-storage'

const SET_ITEM_AMOUNT_TYPE = 'setItemAmount'

const ALPHA_NUMERIC_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export const getUserRecord = async () => {
  const userId = local.getItem('userId')
  const userRecord = await wixData.get('orders', userId)
  return userRecord
}

export function add_item(param1, param2) {
  return param1 + param2
}

export const getRandomAlpahNumericString = length => {
  const numArray = [...Array(length).keys()]
  return numArray.map(() => ALPHA_NUMERIC_CHARS[Math.floor(Math.random() * ALPHA_NUMERIC_CHARS.length)]).join('')
}

export const setItemAmountAction = (title, id, amount, categoryId) => ({
  type: SET_ITEM_AMOUNT_TYPE,
  title,
  id,
  amount,
  categoryId,
})

const setItemAmount = (orderItems, id, title, amount, categoryId) => {
  const itemState = orderItems[id] ? Object.assign({}, orderItems[id], { amount }) : { amount, title, categoryId }
  if (amount > 0) {
    return Object.assign({}, orderItems, { [id]: itemState })
  }

  const updatedState = Object.assign({}, orderItems)
  delete updatedState[id]
  return updatedState
}

export const reducer = (orderItems, action) => {
  switch (action.type) {
    case SET_ITEM_AMOUNT_TYPE:
      return setItemAmount(orderItems, action.id, action.title, action.amount, action.categoryId)
    default:
      return orderItems
  }
}
