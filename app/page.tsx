"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

export default function LanguageSelection() {
  const router = useRouter()
  const { setLanguage } = useLanguage()

  const handleLanguageSelect = (lang: "en" | "hi" | "mr") => {
    setLanguage(lang)
    router.push("/login-selection")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-cyan-300 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[url('/placeholder.svg?height=800&width=400')] bg-no-repeat bg-center bg-contain" />
      </div>

      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-4">
              <img
                src="/indian-railways-logo.png"
                alt="Indian Railways Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-xl font-bold text-blue-900 mb-2">INDIAN RAILWAYS</h1>
            <h2 className="text-lg font-semibold text-blue-900">Tatkal Token Management</h2>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => handleLanguageSelect("en")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
            >
              English
            </Button>
            <Button
              onClick={() => handleLanguageSelect("hi")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
            >
              हिंदी
            </Button>
            <Button
              onClick={() => handleLanguageSelect("mr")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
            >
              मराठी
            </Button>
          </div>
        </CardContent>
      </Card>

      <footer className="absolute bottom-4 left-0 right-0 text-center text-xs text-blue-800">
        <p>Designed & Developed by Royal's Webtech Pvt. Ltd.</p>
        <p>Copyright: Central Railways</p>
      </footer>
    </div>
  )
}
