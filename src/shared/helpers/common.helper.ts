export function getMultiCheckboxState(entitiesArr: Array<any>): string {
  let isChecked = false
  let allChecked = true
  entitiesArr.every((item) => {
    if (!isChecked && item.isChecked) {
      isChecked = true
    }
    if (allChecked && !item.isChecked) {
      allChecked = false
    }
    return true
  })
  if (allChecked) {
    return 'checked'
  } else if (isChecked) {
    return 'partially_checked'
  } else {
    return 'unchecked'
  }
}

export function getRandomInteger(min: number, max: number): number {
  const rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}
