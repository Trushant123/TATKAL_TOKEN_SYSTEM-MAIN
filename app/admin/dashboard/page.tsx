"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"
import { useToast } from "@/components/ui/toast"
import { PageHeader } from "@/components/ui/page-header"
import { PageFooter } from "@/components/ui/page-footer"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { useToken } from "@/contexts/token-context"
import {
  Lock,
  Unlock,
  Plus,
  FileText,
  Users,
  Clock,
  LogOut,
  Download,
  Eye,
  Shield,
  AlertTriangle,
  Activity,
  XCircle,
} from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const { t } = useLanguage()
  const { addToast } = useToast()
  const {
    user,
    logout,
    canManageRegistration,
    canIssueManualTokens,
    canGenerateTokenList,
    canViewReports,
    canViewAdminActivity,
    canViewLiveMonitoring,
    canViewCancelledTokens,
  } = useAuth()
  const { registrationOpen, toggleRegistration, tokenListGenerated, generateTokenList } = useToken()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {})
  const [stats, setStats] = useState({
    totalTokens: 45,
    acTokens: 18,
    sleeperTokens: 27,
    selfTokens: 32,
    repTokens: 10,
    manualTokens: 3,
  })

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleLogout = () => {
    setConfirmAction(() => () => {
      logout()
      router.push("/")
      addToast({
        type: "info",
        title: "Logged Out",
        message: "You have been successfully logged out",
      })
    })
    setShowConfirmDialog(true)
  }

  const handleToggleRegistration = () => {
    setConfirmAction(() => () => {
      toggleRegistration()
      addToast({
        type: registrationOpen ? "warning" : "success",
        title: registrationOpen ? "Registration Closed" : "Registration Opened",
        message: registrationOpen ? "New registrations are now closed" : "New registrations are now open",
      })
    })
    setShowConfirmDialog(true)
  }

  const handleGenerateList = () => {
    setConfirmAction(() => () => {
      generateTokenList()
      addToast({
        type: "success",
        title: "Token List Generated",
        message: "Final token list has been generated successfully",
      })
    })
    setShowConfirmDialog(true)
  }

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "superadmin":
        return t.superAdmin
      case "stationadmin":
        return t.stationAdmin
      case "clerk":
        return t.clerk
      default:
        return role
    }
  }

  const isRegistrationTime = () => {
    const hour = currentTime.getHours()
    const minute = currentTime.getMinutes()
    return (hour === 0 && minute >= 30) || (hour > 0 && hour < 9)
  }

  const isAfter9AM = () => {
    const hour = currentTime.getHours()
    return hour >= 9
  }

  const isAfter915AM = () => {
    const hour = currentTime.getHours()
    const minute = currentTime.getMinutes()
    return hour > 9 || (hour === 9 && minute >= 15)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-cyan-300 p-4">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          title={t.adminDashboard}
          subtitle={`Welcome, ${getRoleDisplayName(user?.role || "")}`}
          actions={
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                <Shield className="w-3 h-3 mr-1" />
                {getRoleDisplayName(user?.role || "")}
              </Badge>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-600">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
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
                  <p className="text-red-700 text-sm">
                    Registration window closed at 9:00 AM. Next registration opens at 12:30 AM tomorrow.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* System Status Alert */}
        {!isRegistrationTime() && !isAfter9AM() && (
          <Card className="mb-6 border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <p className="text-yellow-800 font-medium">
                  Registration window is currently closed. Registration opens at 12:30 AM.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Current Time */}
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

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-900">{stats.totalTokens}</div>
              <div className="text-sm text-gray-600">{t.totalTokens}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.acTokens}</div>
              <div className="text-sm text-gray-600">AC {t.tokens}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.sleeperTokens}</div>
              <div className="text-sm text-gray-600">Sleeper {t.tokens}</div>
            </CardContent>
          </Card>
        </div>

        {/* Control Panel */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {canManageRegistration && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {registrationOpen ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                  {t.registrationControl}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Badge className={registrationOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                  {registrationOpen ? t.registrationOpen : t.registrationClosed}
                </Badge>
                <Button
                  onClick={handleToggleRegistration}
                  disabled={isAfter9AM()}
                  className={`w-full ${registrationOpen ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                >
                  {registrationOpen ? t.closeRegistration : t.openRegistration}
                </Button>
              </CardContent>
            </Card>
          )}

          {canIssueManualTokens && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  {t.manualTokenIssue}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => router.push("/admin/manual-token")}
                  disabled={isAfter9AM()}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  {t.issueManualToken}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Token List Generation */}
        {canGenerateTokenList && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {t.tokenListGeneration}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tokenListGenerated && <Badge className="bg-blue-100 text-blue-800">{t.listGenerated}</Badge>}
              <div className="flex gap-2">
                <Button
                  onClick={handleGenerateList}
                  disabled={tokenListGenerated || !isAfter9AM()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  {t.generateFinalList}
                </Button>
                {tokenListGenerated && (
                  <>
                    <Button onClick={() => router.push("/admin/token-list")} variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => {
                        addToast({
                          type: "success",
                          title: "Download Started",
                          message: "Token list download has started",
                        })
                      }}
                      variant="outline"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              {t.quickActions}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {canViewLiveMonitoring && (
              <Button
                onClick={() => router.push("/admin/live-monitoring")}
                variant="outline"
                className="flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                {t.liveMonitoring}
              </Button>
            )}
            {canViewReports && (
              <Button
                onClick={() => router.push("/admin/reports")}
                variant="outline"
                className="flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                {t.reports}
              </Button>
            )}
            {canViewAdminActivity && (
              <Button
                onClick={() => router.push("/admin/admin-activity")}
                variant="outline"
                className="flex items-center justify-center gap-2"
              >
                <Activity className="w-4 h-4" />
                Admin Activity Monitor
              </Button>
            )}
            {canViewCancelledTokens && (
              <Button
                onClick={() => router.push("/admin/cancelled-tokens")}
                variant="outline"
                className="flex items-center justify-center gap-2 col-span-2"
              >
                <XCircle className="w-4 h-4" />
                Cancelled Tokens Monitor
              </Button>
            )}
          </CardContent>
        </Card>

        <PageFooter />
      </div>

      <ConfirmationDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={confirmAction}
        title="Confirm Action"
        message="Are you sure you want to proceed with this action?"
        type="warning"
      />
    </div>
  )
}
