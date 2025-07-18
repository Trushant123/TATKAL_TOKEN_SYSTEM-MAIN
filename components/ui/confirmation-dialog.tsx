"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle } from "lucide-react"

interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  type?: "warning" | "danger" | "info"
  confirmText?: string
  cancelText?: string
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "warning",
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmationDialogProps) {
  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const icons = {
    warning: AlertTriangle,
    danger: AlertTriangle,
    info: CheckCircle,
  }

  const colors = {
    warning: "text-yellow-600 bg-yellow-100",
    danger: "text-red-600 bg-red-100",
    info: "text-blue-600 bg-blue-100",
  }

  const buttonColors = {
    warning: "bg-yellow-600 hover:bg-yellow-700",
    danger: "bg-red-600 hover:bg-red-700",
    info: "bg-blue-600 hover:bg-blue-700",
  }

  const Icon = icons[type]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className={`w-16 h-16 ${colors[type]} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <Icon className="w-8 h-8" />
          </div>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 text-center">{message}</p>
          <div className="flex gap-3">
            <Button onClick={onClose} variant="outline" className="flex-1 bg-transparent">
              {cancelText}
            </Button>
            <Button onClick={handleConfirm} className={`flex-1 ${buttonColors[type]}`}>
              {confirmText}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
