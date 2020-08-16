import wixData from 'wix-data'
import { getUserRecord } from 'public/utils.js'

$w.onReady(async () => {
  const userRecord = await getUserRecord()
  await $w('#orderConnection').setFilter(wixData.filter().eq('_id', userRecord._id))
})
