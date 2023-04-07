import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeShape = typeof defaultTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeShape {}
}
