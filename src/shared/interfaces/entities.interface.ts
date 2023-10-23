export interface IEntity {
  id: string
  name: string
  state: string
  items: Array<IEntityChild>
}

export interface IEntityChild {
  id: string
  name: string
  isChecked: boolean
  count: number
  color: string
}
