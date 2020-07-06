// Filename: public/utils.js
//
// Code written in public files is shared by your site's
// Backend, page code, and site code environments.
//
// Use public files to hold utility functions that can
// be called from multiple locations in your site's code.
const SET_ITEM_AMOUNT_TYPE = 'setItemAmount'

const ALPHA_NUMERIC_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export function add_item(param1, param2) {
  return param1 + param2
}

export const getRandomAlpahNumericString = length => {
  const numArray = [...Array(length).keys()]
  return numArray.map(() => ALPHA_NUMERIC_CHARS[Math.floor(Math.random() * ALPHA_NUMERIC_CHARS.length)]).join('')
}

export const setItemAmountAction = (title, id, amount, category) => ({
  type: SET_ITEM_AMOUNT_TYPE,
  title,
  id,
  amount,
  category,
})

const setItemAmount = (orderItems, id, title, amount, category) => {
  const itemState = orderItems[id] ? Object.assign({}, orderItems[id], { amount }) : { amount, title, category }
  if (amount > 0) {
    return Object.assign({}, orderItems, { [id]: itemState })
  }

  if (amount <= 0) {
    const updatedState = Object.assign({}, orderItems)
    delete updatedState[id]
    return updatedState
  }
}

export const reducer = (orderItems, action) => {
  switch (action.type) {
    case SET_ITEM_AMOUNT_TYPE:
      return setItemAmount(orderItems, action.id, action.title, action.amount, action.category)
    default:
      return orderItems
  }
}
