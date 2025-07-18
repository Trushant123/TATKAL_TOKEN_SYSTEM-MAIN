"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/ui/page-header"
import { PageFooter } from "@/components/ui/page-footer"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { useToken } from "@/contexts/token-context"
import { Clock, Users, FileText, LogOut, AlertTriangle } from "lucide-react"

export default function PassengerDashboard() {
  const router = useRouter()
  const { t } = useLanguage()
  const { user, logout } = useAuth()
  const { registrationOpen, tokenListGenerated } = useToken()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const isRegistrationTime = () => {
    const hour = currentTime.getHours()
    const minute = currentTime.getMinutes()
    return (hour === 0 && minute >= 30) || (hour > 0 && hour < 9)
  }

  const isTokenListTime = () => {
    const hour = currentTime.getHours()
    const minute = currentTime.getMinutes()
    return hour > 9 || (hour === 9 && minute >= 15)
  }

  const isAfter9AM = () => {
    const hour = currentTime.getHours()
    return hour >= 9
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-cyan-300 p-4">
      <div className="max-w-md mx-auto">
        <PageHeader
          title={t.dashboard}
          subtitle={`Welcome, ${user?.mobile || "Passenger"}`}
          actions={
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-600">
              <LogOut className="w-4 h-4" />
            </Button>
          }
        />

        {/* Registration Closed Message */}
        {isAfter9AM() && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-red-800 font-medium">Registration Closed for {formatDate(currentTime)}</p>
                  <p className="text-red-700 text-sm">Next registration opens at 12:30 AM tomorrow.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-medium">{t.currentTime}</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-mono">{currentTime.toLocaleTimeString()}</div>
                <div className="text-sm text-gray-600">{formatDate(currentTime)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {isRegistrationTime() && registrationOpen && !isAfter9AM() && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  {t.tokenRegistration}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Badge className="bg-green-100 text-green-800">{t.registrationOpen}</Badge>
                <p className="text-sm text-gray-600">{t.registrationWindow}: 12:30 AM - 9:00 AM</p>
                <div className="space-y-2">
                  <Button
                    onClick={() => router.push("/passenger/register/self")}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {t.selfRegistration}
                  </Button>
                  <Button
                    onClick={() => router.push("/passenger/register/representative")}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {t.representativeRegistration}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {!isRegistrationTime() && !isTokenListTime() && !isAfter9AM() && (
            <Card>
              <CardContent className="p-6 text-center">
                <Badge className="bg-yellow-100 text-yellow-800 mb-3">{t.registrationClosed}</Badge>
                <p className="text-sm text-gray-600">{t.tokenListWillBeGenerated}</p>
              </CardContent>
            </Card>
          )}

          {isTokenListTime() && tokenListGenerated && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {t.tokenList}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="bg-blue-100 text-blue-800 mb-3">{t.listGenerated}</Badge>
                <Button
                  onClick={() => router.push("/passenger/token-list")}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {t.viewTokenList}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <PageFooter />
      </div>
    </div>
  )
}
