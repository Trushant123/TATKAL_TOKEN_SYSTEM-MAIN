"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/contexts/language-context"
import { ArrowLeft, Plus } from "lucide-react"

export default function ManualTokenIssue() {
  const router = useRouter()
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    passengerName: "",
    class: "",
    passengers: 1,
    reason: "",
    customReason: "",
  })

  const handleSubmit = () => {
    // Manual token registered successfully
    alert("Manual token registered successfully! Token will be generated at 9:15 AM.")
    router.push("/admin/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-cyan-300 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <CardTitle className="text-xl font-bold text-blue-900 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              {t.issueManualToken}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="passengerName">Passenger Name (Optional)</Label>
            <Input
              id="passengerName"
              type="text"
              value={formData.passengerName}
              onChange={(e) => setFormData({ ...formData, passengerName: e.target.value })}
              placeholder="Enter passenger name"
            />
          </div>

          <div>
            <Label htmlFor="class">{t.selectClass}</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, class: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AC">AC</SelectItem>
                <SelectItem value="Sleeper">Sleeper</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="passengers">{t.numberOfPassengers}</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, passengers: Number.parseInt(value) })}>
              <SelectTrigger>
                <SelectValue placeholder="Select number of passengers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="reason">Reason</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, reason: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="No Aadhaar">No Aadhaar</SelectItem>
                <SelectItem value="OTP Failed">OTP Failed</SelectItem>
                <SelectItem value="Elderly">Elderly</SelectItem>
                <SelectItem value="No Phone">No Phone</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.reason === "Other" && (
            <div>
              <Label htmlFor="customReason">Custom Reason</Label>
              <Textarea
                id="customReason"
                value={formData.customReason}
                onChange={(e) => setFormData({ ...formData, customReason: e.target.value })}
                placeholder="Enter custom reason"
                rows={3}
              />
            </div>
          )}

          <div className="bg-orange-50 p-3 rounded-lg">
            <p className="text-sm text-orange-800">Manual tokens are limited and will be logged with admin details.</p>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!formData.class || !formData.reason}
            className="w-full bg-orange-600 hover:bg-orange-700"
          >
            Issue Manual Token
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
