import { onUpdateItem, getCurrentItemAmount } from 'public/itemInteractions.js'
import wixLocation from 'wix-location'

const updateCounters = () => {
  $w('#itemsRepeater').forEachItem(async $item => {
    const itemData = $item('#categoryItems').getCurrentItem()
    if (itemData) {
      const itemAmount = await getCurrentItemAmount(itemData._id)
      $item('#itemCounter').value = itemAmount
    }
  })
}

$w.onReady(() => {
  $w('#itemsRepeater').onItemReady(async ($item, itemData, index) => {
    const itemAmount = await getCurrentItemAmount(itemData._id)
    console.log(`item: ${JSON.stringify(itemData)}, itemID: ${itemData._id}, amount: ${itemAmount}`)
    $item('#itemCounter').value = itemAmount
  })
  $w('#categoriesRepeater').onItemReady(($item, itemData) => {
    const currentCategory = $w('#currentCategory').getCurrentItem()
    if (itemData.categoryId === currentCategory._id) {
      const itemContainer = $item('#container1')
      itemContainer.background.src =
        'wix:image://v1/0548d91df03c46a6b89f02f49ae8be98.jpg/Boat%20on%20a%20Lake.jpg#originWidth=3000&originHeight=2790'
    }
  })
  updateCounters()
})

const addOne = x => x + 1
const removeOne = x => x - 1

const updateItemAmount = async (event, amountHandler) => {
  const repeaterSelector = $w.at(event.context)
  const $input = repeaterSelector('#itemCounter')
  const currentAmount = parseInt($input.value, 10)
  const itemData = repeaterSelector('#categoryItems').getCurrentItem()
  await onUpdateItem(itemData._id, amountHandler(currentAmount), itemData.title, itemData.category._id)
  updateCounters()
}

export function addButton_click(event) {
  updateItemAmount(event, addOne)
}

// itemId, newAmount, itemTitle, itemCateogry

export function removeButton_click(event) {
  updateItemAmount(event, removeOne)
}

export function onCategoryClick(event) {
  const repeaterSelector = $w.at(event.context)
  const categoryData = repeaterSelector('#categories').getCurrentItem()
  wixLocation.to(categoryData['link-categories-categoryName'])
}

export function onSearchClick(event) {
  //Add your code for this event here:
}
