import wixData from 'wix-data'
import { getUserRecord, goToCategories, saveAndNavigate } from 'public/utils.js'

$w.onReady(async () => {
  const userRecord = await getUserRecord()
  await $w('#orderConnection').setFilter(wixData.filter().eq('_id', userRecord._id))
})

export const goToPersonalInfo = () => {
  saveAndNavigate('/personal-info')
}

export const backToCart = () => {
  saveAndNavigate('/confirmation')
}

export const backToCategories = goToCategories
