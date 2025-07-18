"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"
import { Search, Download } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { PageFooter } from "@/components/ui/page-footer"

// Mock token data
const mockTokens = [
  { id: 1, number: "AC001", class: "AC", type: "Self", passengers: 2, status: "Active" },
  { id: 2, number: "AC002", class: "AC", type: "Representative", passengers: 1, status: "Active" },
  { id: 3, number: "SL001", class: "Sleeper", type: "Self", passengers: 4, status: "Active" },
  { id: 4, number: "SL002", class: "Sleeper", type: "Manual", passengers: 1, status: "Active" },
  { id: 5, number: "AC003", class: "AC", type: "Self", passengers: 3, status: "Active" },
]

export default function TokenList() {
  const router = useRouter()
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredTokens, setFilteredTokens] = useState(mockTokens)

  useEffect(() => {
    const filtered = mockTokens.filter(
      (token) =>
        token.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.type.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredTokens(filtered)
  }, [searchTerm])

  const isAfter915AM = () => {
    const now = new Date()
    const hour = now.getHours()
    const minute = now.getMinutes()
    return hour > 9 || (hour === 9 && minute >= 15)
  }

  const handleDownloadList = () => {
    const csvContent =
      "Token Number,Class,Type,Passengers,Status\n" +
      filteredTokens
        .map((token) => `${token.number},${token.class},${token.type},${token.passengers},${token.status}`)
        .join("\n")

    const element = document.createElement("a")
    const file = new Blob([csvContent], { type: "text/csv" })
    element.href = URL.createObjectURL(file)
    element.download = "token-list.csv"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-cyan-300 p-4">
      <div className="max-w-md mx-auto">
        <PageHeader title={t.tokenList} subtitle="View all generated tokens" onBack={() => router.back()} />

        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder={t.searchTokens}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                onClick={handleDownloadList}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                disabled={!isAfter915AM()}
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {!isAfter915AM() && (
          <Card className="mb-4 border-yellow-200 bg-yellow-50">
            <CardContent className="p-4 text-center">
              <p className="text-yellow-800 text-sm">Token list download will be available after 9:15 AM</p>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          {filteredTokens.map((token) => (
            <Card key={token.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-blue-900">{token.number}</h3>
                    <p className="text-sm text-gray-600">
                      {token.passengers} {t.passengers}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant={token.class === "AC" ? "default" : "secondary"} className="mb-1">
                      {token.class}
                    </Badge>
                    <br />
                    <Badge variant="outline" className="text-xs">
                      {token.type}
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Badge
                    variant={token.status === "Active" ? "default" : "secondary"}
                    className="bg-green-100 text-green-800"
                  >
                    {token.status}
                  </Badge>
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
