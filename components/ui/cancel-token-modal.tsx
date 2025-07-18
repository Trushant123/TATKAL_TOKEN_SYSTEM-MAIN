"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { X, AlertTriangle } from "lucide-react"

interface CancelTokenModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (reason: string, customReason?: string, adminDetails?: { username: string; role: string }) => void
  tokenNumber: string
}

export function CancelTokenModal({ isOpen, onClose, onConfirm, tokenNumber }: CancelTokenModalProps) {
  const { user } = useAuth()
  const [reason, setReason] = useState("")
  const [customReason, setCustomReason] = useState("")

  if (!isOpen) return null

  const handleConfirm = () => {
    if (reason) {
      const adminDetails = {
        username: user?.username || "unknown",
        role: user?.role || "unknown",
      }
      onConfirm(reason, reason === "Other" ? customReason : undefined, adminDetails)
      setReason("")
      setCustomReason("")
      onClose()
    }
  }

  const handleClose = () => {
    setReason("")
    setCustomReason("")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-red-800 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Cancel Token
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-50 p-3 rounded-lg">
            <p className="text-red-800 font-medium">Token: {tokenNumber}</p>
            <p className="text-red-700 text-sm">This action cannot be undone.</p>
            <p className="text-red-600 text-xs mt-1">
              Cancelled by: {user?.username} ({user?.role})
            </p>
          </div>

          <div>
            <Label htmlFor="reason">Cancellation Reason *</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select cancellation reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Passenger Request">Passenger Request</SelectItem>
                <SelectItem value="Duplicate Entry">Duplicate Entry</SelectItem>
                <SelectItem value="Invalid Documents">Invalid Documents</SelectItem>
                <SelectItem value="System Error">System Error</SelectItem>
                <SelectItem value="No Show">No Show</SelectItem>
                <SelectItem value="Administrative">Administrative Decision</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {reason === "Other" && (
            <div>
              <Label htmlFor="customReason">Custom Reason *</Label>
              <Textarea
                id="customReason"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Enter custom cancellation reason"
                rows={3}
              />
            </div>
          )}

          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="text-yellow-800 text-xs">
              This cancellation will be logged and visible to superadmins for audit purposes.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleClose} variant="outline" className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!reason || (reason === "Other" && !customReason.trim())}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Confirm Cancellation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
