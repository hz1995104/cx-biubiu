import { createContext, Dispatch, SetStateAction } from 'react'

interface User {
  name?: string
  id?: number
  employeeNo?: string
  entryDay?: number
  authority?: Record<string, boolean>
}

export const UserContext = createContext<{ user: User; setUser: Dispatch<SetStateAction<{}>> }>({
  user: {},
  setUser: () => {},
})