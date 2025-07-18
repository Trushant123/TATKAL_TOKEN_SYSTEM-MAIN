"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import { CheckCircle, Download, Home } from "lucide-react"

export default function TokenConfirmation() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { t } = useLanguage()

  const tokenClass = searchParams.get("class")
  const passengers = searchParams.get("passengers")
  const type = searchParams.get("type")

  const name = searchParams.get("name")
  const passengerName = searchParams.get("passengerName")
  const repName = searchParams.get("repName")

  const handleDownload = () => {
    // Generate and download registration confirmation
    const element = document.createElement("a")
    const file = new Blob(
      [
        `Registration Successful\nClass: ${tokenClass}\nPassengers: ${passengers}\nType: ${type}\nToken will be generated at 9:15 AM`,
      ],
      {
        type: "text/plain",
      },
    )
    element.href = URL.createObjectURL(file)
    element.download = `registration-confirmation.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-cyan-300 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <CardTitle className="text-xl font-bold text-green-800">{t.registrationSuccessful}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white p-4 rounded-lg border-2 border-green-200">
            <div className="space-y-2">
              {name && (
                <div className="flex justify-between">
                  <span className="font-medium">Name:</span>
                  <span>{name}</span>
                </div>
              )}
              {passengerName && (
                <div className="flex justify-between">
                  <span className="font-medium">Passenger:</span>
                  <span>{passengerName}</span>
                </div>
              )}
              {repName && (
                <div className="flex justify-between">
                  <span className="font-medium">Representative:</span>
                  <span>{repName}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-medium">{t.class}:</span>
                <Badge variant={tokenClass === "AC" ? "default" : "secondary"}>{tokenClass}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{t.passengers}:</span>
                <span>{passengers}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{t.type}:</span>
                <Badge variant="outline">{type === "self" ? t.self : t.representative}</Badge>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <p className="text-lg font-semibold text-yellow-800 mb-2">{t.tokenWillBeGenerated}</p>
            <p className="text-sm text-yellow-700">{t.keepConfirmationSafe}</p>
          </div>

          <div className="space-y-2">
            <Button
              onClick={handleDownload}
              className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              {t.downloadConfirmation}
            </Button>

            <Button
              onClick={() => router.push("/passenger/dashboard")}
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              {t.backToDashboard}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
