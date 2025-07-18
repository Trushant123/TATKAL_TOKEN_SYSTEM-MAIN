"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface User {
  type: "passenger" | "admin"
  mobile?: string
  username?: string
  role?: "superadmin" | "stationadmin" | "clerk"
}

interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
  isAuthenticated: boolean
  canManageRegistration: boolean
  canIssueManualTokens: boolean
  canGenerateTokenList: boolean
  canViewReports: boolean
  canViewAdminActivity: boolean
  canViewLiveMonitoring: boolean
  canViewCancelledTokens: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  // Role-based permissions
  const canManageRegistration = user?.role === "superadmin" || user?.role === "stationadmin"
  const canIssueManualTokens = user?.role === "superadmin" || user?.role === "stationadmin" || user?.role === "clerk"
  const canGenerateTokenList = user?.role === "superadmin" || user?.role === "stationadmin" || user?.role === "clerk"
  const canViewReports = user?.role === "superadmin" || user?.role === "stationadmin"
  const canViewAdminActivity = user?.role === "superadmin" // Only superadmin can view admin activity
  const canViewLiveMonitoring = user?.role === "superadmin" || user?.role === "stationadmin" || user?.role === "clerk"
  const canViewCancelledTokens = user?.role === "superadmin" // Only superadmin can view cancelled tokens

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    canManageRegistration,
    canIssueManualTokens,
    canGenerateTokenList,
    canViewReports,
    canViewAdminActivity,
    canViewLiveMonitoring,
    canViewCancelledTokens,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
