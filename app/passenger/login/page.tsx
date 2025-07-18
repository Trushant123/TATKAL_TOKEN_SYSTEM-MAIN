"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { PageHeader } from "@/components/ui/page-header"
import { PageFooter } from "@/components/ui/page-footer"

export default function PassengerLogin() {
  const router = useRouter()
  const { t } = useLanguage()
  const { login } = useAuth()
  const [mobile, setMobile] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)

  const handleSendOTP = () => {
    if (mobile.length === 10) {
      setOtpSent(true)
      // Simulate OTP sending
    }
  }

  const handleLogin = () => {
    if (otp === "123456") {
      // Demo OTP
      login({ type: "passenger", mobile })
      router.push("/passenger/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-cyan-300 p-4">
      <div className="max-w-md mx-auto">
        <PageHeader title={t.passengerLogin} onBack={() => router.back()} />

        <Card>
          <CardContent className="space-y-4 p-6">
            {/* Keep existing form content */}
            <div>
              <Label htmlFor="mobile">{t.mobileNumber}</Label>
              <Input
                id="mobile"
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter 10-digit mobile number"
                maxLength={10}
              />
            </div>

            {!otpSent ? (
              <Button
                onClick={handleSendOTP}
                disabled={mobile.length !== 10}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {t.sendOTP}
              </Button>
            ) : (
              <>
                <div>
                  <Label htmlFor="otp">{t.enterOTP}</Label>
                  <Input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                  />
                </div>
                <Button
                  onClick={handleLogin}
                  disabled={otp.length !== 6}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {t.login}
                </Button>
              </>
            )}
            <div className="text-center text-sm text-gray-600">
              <p className="font-semibold">Demo Credentials:</p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p>Mobile: Any 10-digit number</p>
                <p>OTP: 123456</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <PageFooter />
      </div>
    </div>
  )
}
