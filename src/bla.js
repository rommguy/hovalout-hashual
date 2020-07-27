const orderItems = {
  '9709b451-888a-4321-9232-0b3b5d0bb184': {
    amount: 3,
    title: 'מכונת כביסה',
    categoryId: '7f061877-3c0b-4a08-a697-5da8d3837a2a',
  },
  '88692e97-f4fb-4d71-b40a-cded953a01a2': {
    amount: 2,
    title: 'טוסטר אובן',
    categoryId: '7f061877-3c0b-4a08-a697-5da8d3837a2a',
  },
}

const itemIds = Object.keys(orderItems)
const categoryIds = Object.values(orderItems).map(orderItem => orderItem.categoryId)
console.log(categoryIds)
