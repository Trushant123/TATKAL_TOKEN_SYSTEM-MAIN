"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TokenDetailsModal } from "@/components/ui/token-details-modal"
import { CancelTokenModal } from "@/components/ui/cancel-token-modal"
import { useToast } from "@/components/ui/toast"
import { PageHeader } from "@/components/ui/page-header"
import { PageFooter } from "@/components/ui/page-footer"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { Search, RefreshCw, Eye, Clock, Users, X } from "lucide-react"

// Mock real-time token data
const mockLiveTokens = [
  {
    id: 1,
    number: "AC001",
    class: "AC",
    type: "Self",
    passengers: 2,
    status: "Active",
    time: "00:45",
    name: "Rajesh Kumar",
    aadhaar: "****-****-1234",
  },
  {
    id: 2,
    number: "AC002",
    class: "AC",
    type: "Representative",
    passengers: 1,
    status: "Active",
    time: "01:15",
    passengerName: "Priya Sharma",
    repName: "Amit Sharma",
    aadhaar: "****-****-5678",
  },
  {
    id: 3,
    number: "SL001",
    class: "Sleeper",
    type: "Self",
    passengers: 4,
    status: "Active",
    time: "01:30",
    name: "Mohammed Ali",
    aadhaar: "****-****-9012",
  },
  {
    id: 4,
    number: "M001",
    class: "Sleeper",
    type: "Manual",
    passengers: 1,
    status: "Active",
    time: "02:00",
    name: "Elderly Person",
    reason: "Elderly",
  },
  {
    id: 5,
    number: "AC003",
    class: "AC",
    type: "Self",
    passengers: 3,
    status: "Served",
    time: "02:15",
    name: "Sunita Patel",
    aadhaar: "****-****-3456",
  },
]

export default function LiveMonitoring() {
  const router = useRouter()
  const { t } = useLanguage()
  const { addToast } = useToast()
  const { canViewLiveMonitoring, user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [classFilter, setClassFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [filteredTokens, setFilteredTokens] = useState(mockLiveTokens)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [selectedToken, setSelectedToken] = useState<(typeof mockLiveTokens)[0] | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [tokenToCancel, setTokenToCancel] = useState<string>("")

  // Redirect if not authorized
  useEffect(() => {
    if (!canViewLiveMonitoring) {
      router.push("/admin/dashboard")
    }
  }, [canViewLiveMonitoring, router])

  useEffect(() => {
    const filtered = mockLiveTokens.filter((token) => {
      const matchesSearch =
        token.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.passengerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.repName?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || token.status === statusFilter
      const matchesClass = classFilter === "all" || token.class === classFilter
      const matchesType = typeFilter === "all" || token.type === typeFilter

      return matchesSearch && matchesStatus && matchesClass && matchesType
    })
    setFilteredTokens(filtered)
  }, [searchTerm, statusFilter, classFilter, typeFilter])

  const handleRefresh = () => {
    setLastUpdated(new Date())
    addToast({
      type: "info",
      title: "Refreshed",
      message: "Live monitoring data has been refreshed",
    })
  }

  const handleViewToken = (token: (typeof mockLiveTokens)[0]) => {
    setSelectedToken(token)
    setShowDetailsModal(true)
  }

  const handleCancelToken = (tokenNumber: string) => {
    setTokenToCancel(tokenNumber)
    setShowCancelModal(true)
  }

  const handleConfirmCancel = (
    reason: string,
    customReason?: string,
    adminDetails?: { username: string; role: string },
  ) => {
    const finalReason = reason === "Other" ? customReason : reason
    addToast({
      type: "warning",
      title: "Token Cancelled",
      message: `Token ${tokenToCancel} has been cancelled. Reason: ${finalReason}`,
    })

    // Log the cancellation for superadmin audit
    console.log("Token Cancellation Log:", {
      tokenNumber: tokenToCancel,
      reason: finalReason,
      cancelledBy: adminDetails?.username,
      cancelledByRole: adminDetails?.role,
      timestamp: new Date().toISOString(),
    })
  }

  const handleMarkServed = (tokenId: number) => {
    addToast({
      type: "success",
      title: "Token Served",
      message: "Token has been marked as served",
    })
  }

  const stats = {
    total: filteredTokens.length,
    active: filteredTokens.filter((t) => t.status === "Active").length,
    served: filteredTokens.filter((t) => t.status === "Served").length,
    cancelled: filteredTokens.filter((t) => t.status === "Cancelled").length,
    ac: filteredTokens.filter((t) => t.class === "AC").length,
    sleeper: filteredTokens.filter((t) => t.class === "Sleeper").length,
  }

  if (!canViewLiveMonitoring) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-cyan-300 p-4">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          title={t.liveMonitoring}
          subtitle="Real-time monitoring of all tokens"
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
              <div className="text-lg font-bold text-blue-900">{stats.total}</div>
              <div className="text-xs text-gray-600">Total</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-green-600">{stats.active}</div>
              <div className="text-xs text-gray-600">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-gray-600">{stats.served}</div>
              <div className="text-xs text-gray-600">Served</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-red-600">{stats.cancelled}</div>
              <div className="text-xs text-gray-600">Cancelled</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-purple-600">{stats.ac}</div>
              <div className="text-xs text-gray-600">AC</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-orange-600">{stats.sleeper}</div>
              <div className="text-xs text-gray-600">Sleeper</div>
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
                  placeholder="Search by token, name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Served">Served</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="AC">AC</SelectItem>
                  <SelectItem value="Sleeper">Sleeper</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Self">Self</SelectItem>
                  <SelectItem value="Representative">Representative</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Token List */}
        <div className="space-y-3">
          {filteredTokens.map((token) => (
            <Card key={token.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-blue-900">{token.number}</h3>
                    <div className="text-sm text-gray-600">
                      <p>
                        <Users className="w-3 h-3 inline mr-1" />
                        {token.passengers} passengers • {token.time}
                      </p>
                      {token.name && <p>Name: {token.name}</p>}
                      {token.passengerName && <p>Passenger: {token.passengerName}</p>}
                      {token.repName && <p>Representative: {token.repName}</p>}
                      {token.aadhaar && <p className="text-xs">Aadhaar: {token.aadhaar}</p>}
                      {token.reason && <p className="text-xs text-orange-600">Reason: {token.reason}</p>}
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
                    <Badge
                      variant={
                        token.status === "Active"
                          ? "default"
                          : token.status === "Cancelled"
                            ? "destructive"
                            : "secondary"
                      }
                      className={
                        token.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : token.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                      }
                    >
                      {token.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleViewToken(token)}>
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    {token.status === "Active" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCancelToken(token.number)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <X className="w-3 h-3 mr-1" />
                        Cancel
                      </Button>
                    )}
                  </div>
                  {token.status === "Active" && (
                    <Button
                      size="sm"
                      onClick={() => handleMarkServed(token.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Mark Served
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTokens.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No tokens found matching the filters</p>
            </CardContent>
          </Card>
        )}

        <PageFooter />
      </div>

      {/* Token Details Modal */}
      <TokenDetailsModal isOpen={showDetailsModal} onClose={() => setShowDetailsModal(false)} token={selectedToken} />

      {/* Cancel Token Modal */}
      <CancelTokenModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleConfirmCancel}
        tokenNumber={tokenToCancel}
      />
    </div>
  )
}
