"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { User, Shield } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { PageFooter } from "@/components/ui/page-footer"

export default function LoginSelection() {
  const router = useRouter()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-cyan-300 p-4">
      <div className="max-w-md mx-auto">
        <PageHeader title={t.selectLoginType} showLogo={true} />

        <Card>
          <CardContent className="space-y-4 p-6">
            <Button
              onClick={() => router.push("/passenger/login")}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg flex items-center justify-center gap-3"
            >
              <User className="w-6 h-6" />
              {t.passengerLogin}
            </Button>

            <Button
              onClick={() => router.push("/admin/login")}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg flex items-center justify-center gap-3"
            >
              <Shield className="w-6 h-6" />
              {t.adminLogin}
            </Button>
          </CardContent>
        </Card>

        <PageFooter />
      </div>
    </div>
  )
}
