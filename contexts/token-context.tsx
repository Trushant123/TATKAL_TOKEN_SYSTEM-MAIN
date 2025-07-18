"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface TokenContextType {
  registrationOpen: boolean
  tokenListGenerated: boolean
  toggleRegistration: () => void
  generateTokenList: () => void
}

const TokenContext = createContext<TokenContextType | undefined>(undefined)

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const [registrationOpen, setRegistrationOpen] = useState(true)
  const [tokenListGenerated, setTokenListGenerated] = useState(false)

  const toggleRegistration = () => {
    setRegistrationOpen(!registrationOpen)
  }

  const generateTokenList = () => {
    setTokenListGenerated(true)
  }

  const value = {
    registrationOpen,
    tokenListGenerated,
    toggleRegistration,
    generateTokenList,
  }

  return <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
}

export function useToken() {
  const context = useContext(TokenContext)
  if (context === undefined) {
    throw new Error("useToken must be used within a TokenProvider")
  }
  return context
}
