"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageHeader } from "@/components/ui/page-header"
import { PageFooter } from "@/components/ui/page-footer"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { Search, RefreshCw, Clock, User, Activity, Shield } from "lucide-react"

// Mock admin activity data
const mockAdminActivity = [
  {
    id: 1,
    admin: "stationadmin",
    role: "Station Admin",
    action: "Opened Registration",
    timestamp: "2024-01-15 00:30:15",
    details: "Registration window opened for today",
    status: "success",
  },
  {
    id: 2,
    admin: "clerk",
    role: "Clerk",
    action: "Manual Token Issued",
    timestamp: "2024-01-15 01:45:22",
    details: "Manual token issued for elderly passenger - AC class",
    status: "success",
  },
  {
    id: 3,
    admin: "stationadmin",
    role: "Station Admin",
    action: "Generated Token List",
    timestamp: "2024-01-15 09:15:00",
    details: "Final token list generated with 156 tokens",
    status: "success",
  },
  {
    id: 4,
    admin: "clerk",
    role: "Clerk",
    action: "Failed Login Attempt",
    timestamp: "2024-01-15 08:30:45",
    details: "Invalid credentials entered",
    status: "warning",
  },
  {
    id: 5,
    admin: "stationadmin",
    role: "Station Admin",
    action: "Closed Registration",
    timestamp: "2024-01-15 09:00:00",
    details: "Registration window closed for token generation",
    status: "info",
  },
]

export default function AdminActivity() {
  const router = useRouter()
  const { t } = useLanguage()
  const { canViewAdminActivity } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [filteredActivity, setFilteredActivity] = useState(mockAdminActivity)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Redirect if not authorized
  useEffect(() => {
    if (!canViewAdminActivity) {
      router.push("/admin/dashboard")
    }
  }, [canViewAdminActivity, router])

  useEffect(() => {
    const filtered = mockAdminActivity.filter((activity) => {
      const matchesSearch =
        activity.admin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.details.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRole = roleFilter === "all" || activity.role === roleFilter
      const matchesStatus = statusFilter === "all" || activity.status === statusFilter

      return matchesSearch && matchesRole && matchesStatus
    })
    setFilteredActivity(filtered)
  }, [searchTerm, roleFilter, statusFilter])

  const handleRefresh = () => {
    setLastUpdated(new Date())
    // Simulate data refresh
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "info":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Station Admin":
        return <Shield className="w-4 h-4 text-blue-600" />
      case "Clerk":
        return <User className="w-4 h-4 text-green-600" />
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  if (!canViewAdminActivity) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-cyan-300 p-4">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="Admin Activity Monitor"
          subtitle="Real-time monitoring of all admin actions"
          onBack={() => router.back()}
          actions={
            <Button onClick={handleRefresh} size="sm" variant="outline" className="bg-transparent">
              <RefreshCw className="w-4 h-4" />
            </Button>
          }
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-blue-900">{filteredActivity.length}</div>
              <div className="text-xs text-gray-600">Total Actions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-green-600">
                {filteredActivity.filter((a) => a.status === "success").length}
              </div>
              <div className="text-xs text-gray-600">Successful</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-yellow-600">
                {filteredActivity.filter((a) => a.status === "warning").length}
              </div>
              <div className="text-xs text-gray-600">Warnings</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-blue-600">
                {filteredActivity.filter((a) => a.status === "info").length}
              </div>
              <div className="text-xs text-gray-600">Info</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by admin, action, or details..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Station Admin">Station Admin</SelectItem>
                  <SelectItem value="Clerk">Clerk</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Activity List */}
        <div className="space-y-3">
          {filteredActivity.map((activity) => (
            <Card key={activity.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start gap-3">
                    {getRoleIcon(activity.role)}
                    <div>
                      <h3 className="font-bold text-lg text-blue-900">{activity.action}</h3>
                      <div className="text-sm text-gray-600">
                        <p className="flex items-center gap-2">
                          <span className="font-medium">{activity.admin}</span>
                          <Badge variant="outline" className="text-xs">
                            {activity.role}
                          </Badge>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">{activity.details}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredActivity.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No admin activity found matching the filters</p>
            </CardContent>
          </Card>
        )}

        <PageFooter />
      </div>
    </div>
  )
}
