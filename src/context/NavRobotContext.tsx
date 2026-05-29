import React, { createContext, useContext, useState } from 'react'

interface NavRobotContextType {
  hoveredNav: string | null
  setHoveredNav: (id: string | null) => void
}

const NavRobotContext = createContext<NavRobotContextType>({
  hoveredNav: null,
  setHoveredNav: () => {},
})

export function NavRobotProvider({ children }: { children: React.ReactNode }) {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
  return (
    <NavRobotContext.Provider value={{ hoveredNav, setHoveredNav }}>
      {children}
    </NavRobotContext.Provider>
  )
}

export const useNavRobot = () => useContext(NavRobotContext)
