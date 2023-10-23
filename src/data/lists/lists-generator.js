const fs = require('fs')
const uuid = require('uuid')

const defaultColors = [
  '#FF5733',
  '#6A0572',
  '#00A896',
  '#FFD700',
  '#4B0082',
  '#008000',
  '#E6E6FA',
  '#FF4500',
  '#CCCCFF',
  '#FFC300'
]

const listsArr = []
for (let i = 0; i < 5; i++) {
  listsArr[i] = {
    id: uuid.v4(),
    name: `List ${i + 1}`,
    items: []
  }
  const nestedElementsCount = getRandomInteger(4, 10)
  for (let j = 0; j < nestedElementsCount; j++) {
    listsArr[i].items.push({
      id: uuid.v4(),
      name: `Item ${j + 1}`,
      isChecked: Boolean(getRandomInteger(0, 1)),
      count: getRandomInteger(0, 50),
      color: defaultColors[getRandomInteger(0, defaultColors.length - 1)]
    })
  }

  let isChecked = false
  let allChecked = true
  listsArr[i].items.every((item) => {
    if (!isChecked && item.isChecked) {
      isChecked = true
    }
    if (allChecked && !item.isChecked) {
      allChecked = false
    }
    return true
  })
  if (allChecked) {
    listsArr[i].state = 'checked'
  } else if (isChecked) {
    listsArr[i].state = 'partially_checked'
  } else {
    listsArr[i].state = 'unchecked'
  }
}

fs.writeFileSync('src/data/lists/lists.ts', `export default ${JSON.stringify(listsArr)}`)

function getRandomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}
