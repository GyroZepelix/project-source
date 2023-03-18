import { IconType } from "react-icons"

export default interface IMenuButton {
  name: string
  onClick: () => void
  icon: React.ReactElement<IconType>
  color?: string,
  underline?: boolean
}