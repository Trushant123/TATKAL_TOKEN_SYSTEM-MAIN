"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/contexts/language-context"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function RepresentativeRegistration() {
  const router = useRouter()
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    passengerAadhaar: "",
    passengerName: "",
    passengerOTP: "",
    repAadhaar: "",
    repName: "",
    repOTP: "",
    class: "",
    passengers: 1,
  })
  const [passengerOtpSent, setPassengerOtpSent] = useState(false)
  const [repOtpSent, setRepOtpSent] = useState(false)
  const [passengerVerified, setPassengerVerified] = useState(false)
  const [repVerified, setRepVerified] = useState(false)

  const handlePassengerOtpSend = () => {
    if (formData.passengerAadhaar.length === 12 && formData.passengerName.trim()) {
      setPassengerOtpSent(true)
    }
  }

  const handlePassengerOtpVerify = () => {
    if (formData.passengerOTP === "123456") {
      setPassengerVerified(true)
    }
  }

  const handleRepOtpSend = () => {
    if (formData.repAadhaar.length === 12 && formData.repName.trim()) {
      setRepOtpSent(true)
    }
  }

  const handleRepOtpVerify = () => {
    if (formData.repOTP === "123456") {
      setRepVerified(true)
    }
  }

  const handleFinalSubmit = () => {
    const params = new URLSearchParams({
      class: formData.class,
      passengers: formData.passengers.toString(),
      type: "representative",
      passengerName: formData.passengerName,
      repName: formData.repName,
    })
    router.push(`/passenger/token-confirmation?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-cyan-300 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold text-blue-900">{t.representativeRegistration}</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Passenger Authentication */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {passengerVerified && <CheckCircle className="w-5 h-5 text-green-600" />}
                {t.passengerDetails}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="passengerName">{t.passengerName}</Label>
                <Input
                  id="passengerName"
                  type="text"
                  value={formData.passengerName}
                  onChange={(e) => setFormData({ ...formData, passengerName: e.target.value })}
                  placeholder="Enter passenger name"
                  disabled={passengerVerified}
                />
              </div>
              <div>
                <Label htmlFor="passengerAadhaar">{t.passengerAadhaar}</Label>
                <Input
                  id="passengerAadhaar"
                  type="text"
                  value={formData.passengerAadhaar}
                  onChange={(e) => setFormData({ ...formData, passengerAadhaar: e.target.value })}
                  placeholder="Enter passenger's 12-digit Aadhaar"
                  maxLength={12}
                  disabled={passengerVerified}
                />
              </div>

              {!passengerOtpSent ? (
                <Button
                  onClick={handlePassengerOtpSend}
                  disabled={formData.passengerAadhaar.length !== 12 || !formData.passengerName.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {t.sendOTP}
                </Button>
              ) : !passengerVerified ? (
                <>
                  <div>
                    <Label htmlFor="passengerOTP">{t.passengerOTP}</Label>
                    <Input
                      id="passengerOTP"
                      type="text"
                      value={formData.passengerOTP}
                      onChange={(e) => setFormData({ ...formData, passengerOTP: e.target.value })}
                      placeholder="Enter passenger's OTP"
                      maxLength={6}
                    />
                  </div>
                  <Button
                    onClick={handlePassengerOtpVerify}
                    disabled={formData.passengerOTP.length !== 6}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {t.verifyOTP}
                  </Button>
                </>
              ) : (
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-green-800 font-medium">Passenger Verified</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Representative Authentication */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {repVerified && <CheckCircle className="w-5 h-5 text-green-600" />}
                {t.representativeDetails}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="repName">{t.representativeName}</Label>
                <Input
                  id="repName"
                  type="text"
                  value={formData.repName}
                  onChange={(e) => setFormData({ ...formData, repName: e.target.value })}
                  placeholder="Enter representative name"
                  disabled={repVerified}
                />
              </div>
              <div>
                <Label htmlFor="repAadhaar">{t.representativeAadhaar}</Label>
                <Input
                  id="repAadhaar"
                  type="text"
                  value={formData.repAadhaar}
                  onChange={(e) => setFormData({ ...formData, repAadhaar: e.target.value })}
                  placeholder="Enter representative's 12-digit Aadhaar"
                  maxLength={12}
                  disabled={repVerified}
                />
              </div>

              {!repOtpSent ? (
                <Button
                  onClick={handleRepOtpSend}
                  disabled={formData.repAadhaar.length !== 12 || !formData.repName.trim()}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {t.sendOTP}
                </Button>
              ) : !repVerified ? (
                <>
                  <div>
                    <Label htmlFor="repOTP">{t.representativeOTP}</Label>
                    <Input
                      id="repOTP"
                      type="text"
                      value={formData.repOTP}
                      onChange={(e) => setFormData({ ...formData, repOTP: e.target.value })}
                      placeholder="Enter representative's OTP"
                      maxLength={6}
                    />
                  </div>
                  <Button
                    onClick={handleRepOtpVerify}
                    disabled={formData.repOTP.length !== 6}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {t.verifyOTP}
                  </Button>
                </>
              ) : (
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-green-800 font-medium">Representative Verified</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Class and Passenger Selection */}
        {passengerVerified && repVerified && (
          <Card>
            <CardHeader>
              <CardTitle>Registration Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
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
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-sm text-yellow-800">{t.tokenGenerationNote}</p>
              </div>

              <Button
                onClick={handleFinalSubmit}
                disabled={!formData.class}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {t.registerToken}
              </Button>
            </CardContent>
          </Card>
        )}

        <footer className="mt-8 text-center text-xs text-blue-800">
          <p>Designed & Developed by Royal's Webtech Pvt. Ltd.</p>
          <p>Copyright: Central Railways</p>
        </footer>
      </div>
    </div>
  )
}
