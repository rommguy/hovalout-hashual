import { onUpdateItem } from 'public/itemInteractions.js'

$w.onReady(function () {
  //TODO: write your page related code here...
})

export function container1_click(event) {
  //Add your code for this event here:
}

export function addButton_click(event) {
  const repeaterSelector = $w.at(event.context)
  const $input = repeaterSelector('#itemCounter')
  const currentAmount = parseInt($input.value, 10)
  const itemData = repeaterSelector('#categroriesItem').getCurrentItem()
  onUpdateItem(itemData._id, currentAmount + 1, itemData.title, itemData.category.displayName)
}

// itemId, newAmount, itemTitle, itemCateogry

export function removeButton_click(event) {
  const $input = $w.at(event.context)('#itemCounter')
  $input.value = parseInt($input.value, 10) - 1
}
