"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useToast } from "@/components/ui/toast"
import { useLanguage } from "@/contexts/language-context"
import { ArrowLeft, Shield } from "lucide-react"

export default function SelfRegistration() {
  const router = useRouter()
  const { t } = useLanguage()
  const { addToast } = useToast()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    aadhaar: "",
    name: "",
    otp: "",
    class: "",
    passengers: 1,
  })

  const handleAadhaarSubmit = async () => {
    if (formData.aadhaar.length !== 12 || !formData.name.trim()) {
      addToast({
        type: "error",
        title: "Validation Error",
        message: "Please enter valid Aadhaar number and name",
      })
      return
    }

    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
    setStep(2)
    addToast({
      type: "success",
      title: "OTP Sent",
      message: "OTP has been sent to your registered mobile number",
    })
  }

  const handleOTPVerify = async () => {
    if (formData.otp !== "123456") {
      addToast({
        type: "error",
        title: "Invalid OTP",
        message: "Please enter the correct OTP",
      })
      return
    }

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    setStep(3)
    addToast({
      type: "success",
      title: "Verification Successful",
      message: "Your identity has been verified successfully",
    })
  }

  const handleFinalSubmit = async () => {
    if (!formData.class) {
      addToast({
        type: "error",
        title: "Selection Required",
        message: "Please select a class",
      })
      return
    }

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)

    addToast({
      type: "success",
      title: "Registration Successful",
      message: "Your token registration has been completed",
    })

    router.push(
      `/passenger/token-confirmation?class=${formData.class}&passengers=${formData.passengers}&type=self&name=${encodeURIComponent(formData.name)}`,
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-cyan-300 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="w-8 h-8">
              <img src="/indian-railways-logo.png" alt="Indian Railways" className="w-full h-full object-contain" />
            </div>
            <CardTitle className="text-xl font-bold text-blue-900">{t.selfRegistration}</CardTitle>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                1
              </div>
              <div className={`w-8 h-1 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`} />
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
              <div className={`w-8 h-1 ${step >= 3 ? "bg-blue-600" : "bg-gray-200"}`} />
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                3
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <>
              <div className="bg-blue-50 p-3 rounded-lg flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <p className="text-sm text-blue-800">Your information is secure and encrypted</p>
              </div>
              <div>
                <Label htmlFor="aadhaar">{t.aadhaarNumber}</Label>
                <Input
                  id="aadhaar"
                  type="text"
                  value={formData.aadhaar}
                  onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value.replace(/\D/g, "") })}
                  placeholder="Enter 12-digit Aadhaar number"
                  maxLength={12}
                />
              </div>
              <div>
                <Label htmlFor="name">Passenger Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter passenger name"
                />
              </div>
              <Button
                onClick={handleAadhaarSubmit}
                disabled={formData.aadhaar.length !== 12 || !formData.name.trim() || loading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? <LoadingSpinner size="sm" /> : null}
                {loading ? "Sending..." : t.sendOTP}
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-800">OTP sent to mobile number linked with Aadhaar</p>
              </div>
              <div>
                <Label htmlFor="otp">{t.enterOTP}</Label>
                <Input
                  id="otp"
                  type="text"
                  value={formData.otp}
                  onChange={(e) => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, "") })}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                />
              </div>
              <Button
                onClick={handleOTPVerify}
                disabled={formData.otp.length !== 6 || loading}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {loading ? <LoadingSpinner size="sm" /> : null}
                {loading ? "Verifying..." : t.verifyOTP}
              </Button>
            </>
          )}

          {step === 3 && (
            <>
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

              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-sm text-yellow-800">{t.tokenGenerationNote}</p>
              </div>

              <Button
                onClick={handleFinalSubmit}
                disabled={!formData.class || loading}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {loading ? <LoadingSpinner size="sm" /> : null}
                {loading ? "Registering..." : t.registerToken}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
