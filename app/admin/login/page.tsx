"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { PageHeader } from "@/components/ui/page-header"
import { PageFooter } from "@/components/ui/page-footer"

export default function AdminLogin() {
  const router = useRouter()
  const { t } = useLanguage()
  const { login } = useAuth()
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })

  const handleLogin = () => {
    let role: "superadmin" | "stationadmin" | "clerk" | null = null

    if (credentials.username === "superadmin" && credentials.password === "super123") {
      role = "superadmin"
    } else if (credentials.username === "stationadmin" && credentials.password === "station123") {
      role = "stationadmin"
    } else if (credentials.username === "clerk" && credentials.password === "clerk123") {
      role = "clerk"
    }

    if (role) {
      login({ type: "admin", username: credentials.username, role })
      router.push("/admin/dashboard")
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-cyan-300 p-4">
      <div className="max-w-md mx-auto">
        <PageHeader title={t.adminLogin} onBack={() => router.back()} />

        <Card>
          <CardContent className="space-y-4 p-6">
            {/* Keep existing form content */}
            <div>
              <Label htmlFor="username">{t.username}</Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                placeholder="Enter username"
              />
            </div>

            <div>
              <Label htmlFor="password">{t.password}</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Enter password"
              />
            </div>

            <Button
              onClick={handleLogin}
              disabled={!credentials.username || !credentials.password}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {t.login}
            </Button>

            <div className="text-center text-sm text-gray-600 space-y-2">
              <p className="font-semibold">Demo Credentials:</p>
              <div className="bg-gray-50 p-3 rounded-lg space-y-1">
                <p>
                  <strong>{t.superAdmin}:</strong> superadmin / super123
                </p>
                <p>
                  <strong>{t.stationAdmin}:</strong> stationadmin / station123
                </p>
                <p>
                  <strong>{t.clerk}:</strong> clerk / clerk123
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <PageFooter />
      </div>
    </div>
  )
}
