import { getUserRecord, debounce, goToCategories, saveAndNavigate } from 'public/utils.js'
import wixData from 'wix-data'
import wixLocation from 'wix-location'
let pageReady = false

$w.onReady(async () => {
  const userRecord = await getUserRecord()
  $w('#cartRepeater').onItemReady(($item, itemData) => {
    $item('#categoryTitle').text = itemData.category
    $item('#categoryItems').text = itemData.itemsList
      .map((nameAndAmount) => {
        if (nameAndAmount.amount >= 2) {
          return `${nameAndAmount.amount} X ${nameAndAmount.name}`
        }
        return nameAndAmount.name
      })
      .join('\n')
  })
  const itemIds = Object.keys(userRecord.orderItems)
  const categoryIds = Object.values(userRecord.orderItems).map((orderItem) => orderItem.categoryId)
  const categoriesNames = {}
  for (const categoryId of categoryIds) {
    const categoryRecord = await wixData.get('categories', categoryId)
    categoriesNames[categoryId] = categoryRecord.displayName
  }
  const itemsPerCategoryMap = itemIds.reduce((itemsPerCategory, itemId) => {
    const itemRecord = userRecord.orderItems[itemId]
    const { categoryId, title, amount } = itemRecord
    if (!itemsPerCategory[categoryId]) {
      itemsPerCategory[categoryId] = {
        _id: categoryId,
        category: categoriesNames[categoryId],
        itemsList: [],
      }
    }
    const currentCategoryItems = itemsPerCategory[categoryId]
    const nameAndAmount = {
      name: title,
      amount: amount,
    }
    const updatedItemsPerCategory = Object.assign({}, currentCategoryItems, {
      itemsList: [...currentCategoryItems.itemsList, nameAndAmount],
    })
    return Object.assign({}, itemsPerCategory, {
      [categoryId]: updatedItemsPerCategory,
    })
  }, {})

  $w('#cartRepeater').data = Object.values(itemsPerCategoryMap)
  console.log(`Setting filter for _id to eq ${userRecord._id}`)
  await $w('#orderConnection').setFilter(wixData.filter().eq('_id', userRecord._id))

  $w('#orderConnection').onReady(async () => {
    await $w('#orderConnection').setCurrentItemIndex(0)
  })
  pageReady = true
})

export const backToCategories = goToCategories

export const goToPersonalInfo = () => {
  saveAndNavigate('/personal-info')
}

export const goToAddress = () => {
  saveAndNavigate('/address')
}
