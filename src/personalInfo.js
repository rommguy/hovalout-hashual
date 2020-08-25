import wixData from 'wix-data'
import wixLocation from 'wix-location'
import { getUserRecord, goToCategories } from 'public/utils.js'

$w.onReady(async () => {
  const userRecord = await getUserRecord()
  await $w('#orderConnection').setFilter(wixData.filter().eq('_id', userRecord._id))
})

const saveAndNavigate = path => {
  setTimeout(async () => {
    await $w('#orderConnection').save()
    wixLocation.to(path)
  }, 200)
}

export const goToAddress = () => {
  saveAndNavigate('/address')
}

export const backToCart = () => {
  saveAndNavigate('/confirmation')
}

export const backToCategories = goToCategories
