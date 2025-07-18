"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/contexts/language-context"
import { Download, BarChart3, PieChart, TrendingUp, Calendar, Users } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { PageFooter } from "@/components/ui/page-footer"

export default function Reports() {
  const router = useRouter()
  const { t } = useLanguage()
  const [selectedReport, setSelectedReport] = useState("daily")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  // Mock report data
  const reportData = {
    daily: {
      totalTokens: 156,
      acTokens: 67,
      sleeperTokens: 89,
      selfTokens: 112,
      repTokens: 31,
      manualTokens: 13,
      servedTokens: 142,
      pendingTokens: 14,
      avgWaitTime: "12 minutes",
      peakHour: "2:00 AM - 3:00 AM",
    },
    weekly: {
      totalTokens: 1089,
      acTokens: 467,
      sleeperTokens: 622,
      selfTokens: 784,
      repTokens: 217,
      manualTokens: 88,
      servedTokens: 1034,
      pendingTokens: 55,
      avgWaitTime: "15 minutes",
      peakDay: "Saturday",
    },
    monthly: {
      totalTokens: 4567,
      acTokens: 1956,
      sleeperTokens: 2611,
      selfTokens: 3289,
      repTokens: 912,
      manualTokens: 366,
      servedTokens: 4321,
      pendingTokens: 246,
      avgWaitTime: "14 minutes",
      peakWeek: "Week 3",
    },
  }

  const currentData = reportData[selectedReport as keyof typeof reportData]

  const handleDownloadReport = () => {
    const csvContent = `Report Type,${selectedReport}
Date,${selectedDate}
Total Tokens,${currentData.totalTokens}
AC Tokens,${currentData.acTokens}
Sleeper Tokens,${currentData.sleeperTokens}
Self Tokens,${currentData.selfTokens}
Representative Tokens,${currentData.repTokens}
Manual Tokens,${currentData.manualTokens}
Served Tokens,${currentData.servedTokens}
Pending Tokens,${currentData.pendingTokens}
Average Wait Time,${currentData.avgWaitTime}`

    const element = document.createElement("a")
    const file = new Blob([csvContent], { type: "text/csv" })
    element.href = URL.createObjectURL(file)
    element.download = `${selectedReport}-report-${selectedDate}.csv`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-cyan-300 p-4">
      <div className="max-w-6xl mx-auto">
        <PageHeader title={t.reports} subtitle="Comprehensive analytics and insights" onBack={() => router.back()} />

        {/* Report Controls */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Report Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Report Type</label>
                <Select value={selectedReport} onValueChange={setSelectedReport}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily Report</SelectItem>
                    <SelectItem value="weekly">Weekly Report</SelectItem>
                    <SelectItem value="monthly">Monthly Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleDownloadReport} className="bg-green-600 hover:bg-green-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-900">{currentData.totalTokens}</div>
              <div className="text-sm text-gray-600">Total Tokens</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{currentData.servedTokens}</div>
              <div className="text-sm text-gray-600">Served</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{currentData.pendingTokens}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{currentData.avgWaitTime}</div>
              <div className="text-sm text-gray-600">Avg Wait</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Class Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Class Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>AC Class</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(currentData.acTokens / currentData.totalTokens) * 100}%` }}
                    />
                  </div>
                  <Badge variant="default">{currentData.acTokens}</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Sleeper Class</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${(currentData.sleeperTokens / currentData.totalTokens) * 100}%` }}
                    />
                  </div>
                  <Badge variant="secondary">{currentData.sleeperTokens}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registration Type */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Registration Type
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Self Registration</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(currentData.selfTokens / currentData.totalTokens) * 100}%` }}
                    />
                  </div>
                  <Badge className="bg-green-100 text-green-800">{currentData.selfTokens}</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Representative</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${(currentData.repTokens / currentData.totalTokens) * 100}%` }}
                    />
                  </div>
                  <Badge className="bg-indigo-100 text-indigo-800">{currentData.repTokens}</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Manual Issue</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-600 h-2 rounded-full"
                      style={{ width: `${(currentData.manualTokens / currentData.totalTokens) * 100}%` }}
                    />
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">{currentData.manualTokens}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {Math.round((currentData.servedTokens / currentData.totalTokens) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Service Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{currentData.avgWaitTime}</div>
                <div className="text-sm text-gray-600">Average Wait Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {selectedReport === "daily"
                    ? currentData.peakHour
                    : selectedReport === "weekly"
                      ? currentData.peakDay
                      : currentData.peakWeek}
                </div>
                <div className="text-sm text-gray-600">Peak {selectedReport === "daily" ? "Hour" : "Period"}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Key Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                <p className="text-sm">
                  <strong>High Service Rate:</strong>{" "}
                  {Math.round((currentData.servedTokens / currentData.totalTokens) * 100)}% of tokens were successfully
                  served.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <p className="text-sm">
                  <strong>Class Preference:</strong>{" "}
                  {currentData.acTokens > currentData.sleeperTokens ? "AC class" : "Sleeper class"} is more popular with{" "}
                  {Math.max(currentData.acTokens, currentData.sleeperTokens)} tokens.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                <p className="text-sm">
                  <strong>Manual Tokens:</strong> {currentData.manualTokens} tokens were issued manually (
                  {Math.round((currentData.manualTokens / currentData.totalTokens) * 100)}% of total).
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                <p className="text-sm">
                  <strong>Peak Time:</strong> Highest activity during{" "}
                  {selectedReport === "daily"
                    ? currentData.peakHour
                    : selectedReport === "weekly"
                      ? currentData.peakDay
                      : currentData.peakWeek}
                  .
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
