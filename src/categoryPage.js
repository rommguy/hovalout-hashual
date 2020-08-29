import { onUpdateItem, getCurrentItemAmount } from 'public/itemInteractions.js'
import wixLocation from 'wix-location'
import wixData from 'wix-data'

const updateCounters = () => {
  $w('#itemsRepeater').forEachItem(async ($item) => {
    const itemData = $item('#categoryItems').getCurrentItem()
    if (itemData) {
      const itemAmount = await getCurrentItemAmount(itemData._id)
      $item('#itemCounter').value = itemAmount
    }
  })
}

const setSearchResults = async (searchQuery) => {
  $w('#searchQuery').text = `תוצאות חיפוש עבור ״${searchQuery}״`
  return $w('#categoryItems').setFilter(wixData.filter().contains('title', searchQuery))
}

const isInSearch = () => wixLocation.path.includes('search')

const initSearch = async () => {
  const searchQueryElm = $w('#searchQuery')
  const searchQuery = wixLocation.query['query']
  if (isInSearch() && searchQuery) {
    await $w('#categoryTitle').collapse()
    await setSearchResults(searchQuery)
  } else {
    await searchQueryElm.collapse()
  }
}

$w.onReady(async () => {
  $w('#itemsRepeater').onItemReady(async ($item, itemData, index) => {
    const itemAmount = await getCurrentItemAmount(itemData._id)
    $item('#itemCounter').value = itemAmount
  })
  $w('#categoriesRepeater').onItemReady(($item, categoryData) => {
    const currentCategory = $w('#currentCategory').getCurrentItem()
    if (categoryData._id === currentCategory._id) {
      const itemContainer = $item('#container1')
      itemContainer.background.src =
        'wix:image://v1/0548d91df03c46a6b89f02f49ae8be98.jpg/Boat%20on%20a%20Lake.jpg#originWidth=3000&originHeight=2790'
    }
  })
  await initSearch()
  updateCounters()
})

const addOne = (x) => x + 1
const removeOne = (x) => x - 1

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

export const onSearchInputKey = (event) => {
  if (event.key === 'Enter') {
    showSearchResults()
  }
}

export const showSearchResults = async () => {
  const searchValue = $w('#searchInput').value
  if (!searchValue) {
    return
  }

  const currentlyInSearch = isInSearch()
  wixLocation.to(`/categories/search?query=${searchValue}`)
  if (currentlyInSearch) {
    await setSearchResults(searchValue)
  }
}
