"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TokenDetailsModal } from "@/components/ui/token-details-modal"
import { PageHeader } from "@/components/ui/page-header"
import { PageFooter } from "@/components/ui/page-footer"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { Search, RefreshCw, Eye, Clock, Users, AlertTriangle, Shield } from "lucide-react"

// Mock cancelled tokens data with admin details
const mockCancelledTokens = [
  {
    id: 1,
    number: "AC004",
    class: "AC",
    type: "Self",
    passengers: 2,
    status: "Cancelled",
    registrationTime: "01:45",
    cancellationTime: "08:30",
    cancellationDate: "2024-01-15",
    name: "Rajesh Kumar",
    aadhaar: "****-****-1234",
    cancelledBy: "stationadmin",
    cancelledByRole: "Station Admin",
    cancellationReason: "Passenger Request",
    customReason: null,
  },
  {
    id: 2,
    number: "SL003",
    class: "Sleeper",
    type: "Representative",
    passengers: 3,
    status: "Cancelled",
    registrationTime: "02:15",
    cancellationTime: "07:45",
    cancellationDate: "2024-01-15",
    passengerName: "Priya Sharma",
    repName: "Amit Sharma",
    aadhaar: "****-****-5678",
    cancelledBy: "clerk",
    cancelledByRole: "Clerk",
    cancellationReason: "Invalid Documents",
    customReason: null,
  },
  {
    id: 3,
    number: "M003",
    class: "AC",
    type: "Manual",
    passengers: 1,
    status: "Cancelled",
    registrationTime: "03:00",
    cancellationTime: "08:15",
    cancellationDate: "2024-01-15",
    name: "Elderly Person",
    reason: "No Aadhaar",
    cancelledBy: "stationadmin",
    cancelledByRole: "Station Admin",
    cancellationReason: "Other",
    customReason: "Passenger changed mind about travel",
  },
  {
    id: 4,
    number: "AC005",
    class: "AC",
    type: "Self",
    passengers: 4,
    status: "Cancelled",
    registrationTime: "01:30",
    cancellationTime: "06:20",
    cancellationDate: "2024-01-15",
    name: "Mohammed Ali",
    aadhaar: "****-****-9012",
    cancelledBy: "clerk",
    cancelledByRole: "Clerk",
    cancellationReason: "Duplicate Entry",
    customReason: null,
  },
  {
    id: 5,
    number: "SL004",
    class: "Sleeper",
    type: "Self",
    passengers: 2,
    status: "Cancelled",
    registrationTime: "04:15",
    cancellationTime: "08:45",
    cancellationDate: "2024-01-15",
    name: "Sunita Patel",
    aadhaar: "****-****-3456",
    cancelledBy: "superadmin",
    cancelledByRole: "Super Admin",
    cancellationReason: "System Error",
    customReason: null,
  },
  {
    id: 6,
    number: "AC006",
    class: "AC",
    type: "Representative",
    passengers: 1,
    status: "Cancelled",
    registrationTime: "02:45",
    cancellationTime: "07:10",
    cancellationDate: "2024-01-14",
    passengerName: "Ravi Kumar",
    repName: "Sita Kumar",
    aadhaar: "****-****-7890",
    cancelledBy: "clerk",
    cancelledByRole: "Clerk",
    cancellationReason: "No Show",
    customReason: null,
  },
]

export default function CancelledTokens() {
  const router = useRouter()
  const { t } = useLanguage()
  const { canViewCancelledTokens } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [adminFilter, setAdminFilter] = useState("all")
  const [reasonFilter, setReasonFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [filteredTokens, setFilteredTokens] = useState(mockCancelledTokens)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [selectedToken, setSelectedToken] = useState<(typeof mockCancelledTokens)[0] | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  // Redirect if not authorized
  useEffect(() => {
    if (!canViewCancelledTokens) {
      router.push("/admin/dashboard")
    }
  }, [canViewCancelledTokens, router])

  useEffect(() => {
    const filtered = mockCancelledTokens.filter((token) => {
      const matchesSearch =
        token.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.passengerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.repName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.cancelledBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.cancellationReason.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesClass = classFilter === "all" || token.class === classFilter
      const matchesType = typeFilter === "all" || token.type === typeFilter
      const matchesAdmin = adminFilter === "all" || token.cancelledByRole === adminFilter
      const matchesReason = reasonFilter === "all" || token.cancellationReason === reasonFilter
      const matchesDate = dateFilter === "all" || token.cancellationDate === dateFilter

      return matchesSearch && matchesClass && matchesType && matchesAdmin && matchesReason && matchesDate
    })
    setFilteredTokens(filtered)
  }, [searchTerm, classFilter, typeFilter, adminFilter, reasonFilter, dateFilter])

  const handleRefresh = () => {
    setLastUpdated(new Date())
  }

  const handleViewToken = (token: (typeof mockCancelledTokens)[0]) => {
    setSelectedToken(token)
    setShowDetailsModal(true)
  }

  const stats = {
    total: filteredTokens.length,
    today: filteredTokens.filter((t) => t.cancellationDate === new Date().toISOString().split("T")[0]).length,
    yesterday: filteredTokens.filter(
      (t) => t.cancellationDate === new Date(Date.now() - 86400000).toISOString().split("T")[0],
    ).length,
    bySuperAdmin: filteredTokens.filter((t) => t.cancelledByRole === "Super Admin").length,
    byStationAdmin: filteredTokens.filter((t) => t.cancelledByRole === "Station Admin").length,
    byClerk: filteredTokens.filter((t) => t.cancelledByRole === "Clerk").length,
  }

  const uniqueDates = [...new Set(mockCancelledTokens.map((t) => t.cancellationDate))].sort().reverse()

  if (!canViewCancelledTokens) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-cyan-300 p-4">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="Cancelled Tokens Monitor"
          subtitle="Superadmin view of all cancelled tokens with admin details"
          onBack={() => router.back()}
          actions={
            <Button onClick={handleRefresh} size="sm" variant="outline" className="bg-transparent">
              <RefreshCw className="w-4 h-4" />
            </Button>
          }
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-red-900">{stats.total}</div>
              <div className="text-xs text-gray-600">Total Cancelled</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-red-600">{stats.today}</div>
              <div className="text-xs text-gray-600">Today</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-orange-600">{stats.yesterday}</div>
              <div className="text-xs text-gray-600">Yesterday</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-blue-600">{stats.bySuperAdmin}</div>
              <div className="text-xs text-gray-600">Super Admin</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-green-600">{stats.byStationAdmin}</div>
              <div className="text-xs text-gray-600">Station Admin</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-purple-600">{stats.byClerk}</div>
              <div className="text-xs text-gray-600">Clerk</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-3">
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tokens, names, admin, reason..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="AC">AC</SelectItem>
                  <SelectItem value="Sleeper">Sleeper</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Self">Self</SelectItem>
                  <SelectItem value="Representative">Representative</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
                </SelectContent>
              </Select>
              <Select value={adminFilter} onValueChange={setAdminFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Admin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Admins</SelectItem>
                  <SelectItem value="Super Admin">Super Admin</SelectItem>
                  <SelectItem value="Station Admin">Station Admin</SelectItem>
                  <SelectItem value="Clerk">Clerk</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  {uniqueDates.map((date) => (
                    <SelectItem key={date} value={date}>
                      {new Date(date).toLocaleDateString("en-IN")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Select value={reasonFilter} onValueChange={setReasonFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Cancellation Reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reasons</SelectItem>
                  <SelectItem value="Passenger Request">Passenger Request</SelectItem>
                  <SelectItem value="Duplicate Entry">Duplicate Entry</SelectItem>
                  <SelectItem value="Invalid Documents">Invalid Documents</SelectItem>
                  <SelectItem value="System Error">System Error</SelectItem>
                  <SelectItem value="No Show">No Show</SelectItem>
                  <SelectItem value="Administrative">Administrative Decision</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cancelled Tokens List */}
        <div className="space-y-3">
          {filteredTokens.map((token) => (
            <Card key={token.id} className="border-red-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-red-900">{token.number}</h3>
                    <div className="text-sm text-gray-600">
                      <p>
                        <Users className="w-3 h-3 inline mr-1" />
                        {token.passengers} passengers • Registered: {token.registrationTime}
                      </p>
                      {token.name && <p>Name: {token.name}</p>}
                      {token.passengerName && <p>Passenger: {token.passengerName}</p>}
                      {token.repName && <p>Representative: {token.repName}</p>}
                      {token.aadhaar && <p className="text-xs">Aadhaar: {token.aadhaar}</p>}
                      {token.reason && <p className="text-xs text-orange-600">Manual Reason: {token.reason}</p>}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={token.class === "AC" ? "default" : "secondary"} className="mb-1">
                      {token.class}
                    </Badge>
                    <br />
                    <Badge
                      variant="outline"
                      className={`text-xs mb-1 ${
                        token.type === "Manual"
                          ? "border-orange-500 text-orange-700"
                          : token.type === "Representative"
                            ? "border-purple-500 text-purple-700"
                            : "border-blue-500 text-blue-700"
                      }`}
                    >
                      {token.type}
                    </Badge>
                    <br />
                    <Badge variant="destructive" className="bg-red-100 text-red-800">
                      Cancelled
                    </Badge>
                  </div>
                </div>

                {/* Cancellation Details */}
                <div className="bg-red-50 p-3 rounded-lg mb-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-red-800">Cancelled by:</span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            token.cancelledByRole === "Super Admin"
                              ? "border-blue-500 text-blue-700"
                              : token.cancelledByRole === "Station Admin"
                                ? "border-green-500 text-green-700"
                                : "border-purple-500 text-purple-700"
                          }`}
                        >
                          <Shield className="w-3 h-3 mr-1" />
                          {token.cancelledBy} ({token.cancelledByRole})
                        </Badge>
                      </div>
                      <p className="text-sm text-red-700">
                        <strong>Reason:</strong> {token.cancellationReason}
                        {token.customReason && ` - ${token.customReason}`}
                      </p>
                      <p className="text-xs text-red-600">
                        <Clock className="w-3 h-3 inline mr-1" />
                        Cancelled on {new Date(token.cancellationDate).toLocaleDateString("en-IN")} at{" "}
                        {token.cancellationTime}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleViewToken(token)}>
                      <Eye className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500">Token ID: #{token.id.toString().padStart(6, "0")}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTokens.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No cancelled tokens found matching the filters</p>
            </CardContent>
          </Card>
        )}

        <PageFooter />
      </div>

      {/* Token Details Modal */}
      <TokenDetailsModal isOpen={showDetailsModal} onClose={() => setShowDetailsModal(false)} token={selectedToken} />
    </div>
  )
}
