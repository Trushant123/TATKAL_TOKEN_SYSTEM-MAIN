"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/contexts/language-context"
import { Search, Download, PrinterIcon as Print } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { PageFooter } from "@/components/ui/page-footer"

// Mock comprehensive token data
const mockTokens = [
  {
    id: 1,
    number: "AC001",
    class: "AC",
    type: "Self",
    passengers: 2,
    status: "Active",
    time: "00:45",
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
    reason: "Elderly",
  },
  {
    id: 5,
    number: "AC003",
    class: "AC",
    type: "Self",
    passengers: 3,
    status: "Active",
    time: "02:15",
    aadhaar: "****-****-3456",
  },
  {
    id: 6,
    number: "SL002",
    class: "Sleeper",
    type: "Representative",
    passengers: 2,
    status: "Active",
    time: "02:45",
    aadhaar: "****-****-7890",
  },
  {
    id: 7,
    number: "M002",
    class: "AC",
    type: "Manual",
    passengers: 1,
    status: "Active",
    time: "03:00",
    reason: "OTP Failed",
  },
]

export default function AdminTokenList() {
  const router = useRouter()
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [classFilter, setClassFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [filteredTokens, setFilteredTokens] = useState(mockTokens)

  useEffect(() => {
    const filtered = mockTokens.filter((token) => {
      const matchesSearch =
        token.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.type.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesClass = classFilter === "all" || token.class === classFilter
      const matchesType = typeFilter === "all" || token.type === typeFilter

      return matchesSearch && matchesClass && matchesType
    })
    setFilteredTokens(filtered)
  }, [searchTerm, classFilter, typeFilter])

  const handleDownloadCSV = () => {
    const csvContent =
      "Token Number,Class,Type,Passengers,Status,Time,Aadhaar/Reason\n" +
      filteredTokens
        .map(
          (token) =>
            `${token.number},${token.class},${token.type},${token.passengers},${token.status},${token.time},${token.aadhaar || token.reason || "N/A"}`,
        )
        .join("\n")

    const element = document.createElement("a")
    const file = new Blob([csvContent], { type: "text/csv" })
    element.href = URL.createObjectURL(file)
    element.download = `token-list-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handlePrint = () => {
    window.print()
  }

  const stats = {
    total: filteredTokens.length,
    ac: filteredTokens.filter((t) => t.class === "AC").length,
    sleeper: filteredTokens.filter((t) => t.class === "Sleeper").length,
    self: filteredTokens.filter((t) => t.type === "Self").length,
    representative: filteredTokens.filter((t) => t.type === "Representative").length,
    manual: filteredTokens.filter((t) => t.type === "Manual").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-cyan-300 p-4">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          title={t.tokenList}
          subtitle="Complete list of all registered tokens"
          onBack={() => router.back()}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-blue-900">{stats.total}</div>
              <div className="text-xs text-gray-600">Total</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-green-600">{stats.ac}</div>
              <div className="text-xs text-gray-600">AC</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-purple-600">{stats.sleeper}</div>
              <div className="text-xs text-gray-600">Sleeper</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-blue-600">{stats.self}</div>
              <div className="text-xs text-gray-600">Self</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-indigo-600">{stats.representative}</div>
              <div className="text-xs text-gray-600">Rep</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-orange-600">{stats.manual}</div>
              <div className="text-xs text-gray-600">Manual</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder={t.searchTokens}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
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
              <div className="flex gap-2">
                <Button onClick={handleDownloadCSV} size="sm" className="bg-green-600 hover:bg-green-700">
                  <Download className="w-4 h-4" />
                </Button>
                <Button onClick={handlePrint} size="sm" variant="outline">
                  <Print className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Token List */}
        <div className="space-y-3">
          {filteredTokens.map((token) => (
            <Card key={token.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-blue-900">{token.number}</h3>
                    <p className="text-sm text-gray-600">
                      {token.passengers} passengers • {token.time}
                    </p>
                    {token.aadhaar && <p className="text-xs text-gray-500">Aadhaar: {token.aadhaar}</p>}
                    {token.reason && <p className="text-xs text-orange-600">Reason: {token.reason}</p>}
                  </div>
                  <div className="text-right">
                    <Badge variant={token.class === "AC" ? "default" : "secondary"} className="mb-1">
                      {token.class}
                    </Badge>
                    <br />
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        token.type === "Manual"
                          ? "border-orange-500 text-orange-700"
                          : token.type === "Representative"
                            ? "border-purple-500 text-purple-700"
                            : "border-blue-500 text-blue-700"
                      }`}
                    >
                      {token.type}
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {token.status}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      /* Mark as served logic */
                    }}
                  >
                    Mark Served
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTokens.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">{t.noTokensFound}</p>
            </CardContent>
          </Card>
        )}

        <PageFooter />
      </div>
    </div>
  )
}
