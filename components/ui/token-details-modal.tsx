"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, User, Users, Clock, CreditCard, FileText } from "lucide-react"

interface Token {
  id: number
  number: string
  class: string
  type: string
  passengers: number
  status: string
  time: string
  name?: string
  passengerName?: string
  repName?: string
  aadhaar?: string
  reason?: string
}

interface TokenDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  token: Token | null
}

export function TokenDetailsModal({ isOpen, onClose, token }: TokenDetailsModalProps) {
  if (!isOpen || !token) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-blue-900">Token Details</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Token Number */}
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-blue-900">{token.number}</h2>
            <Badge
              variant={
                token.status === "Active" ? "default" : token.status === "Cancelled" ? "destructive" : "secondary"
              }
              className={
                token.status === "Active"
                  ? "bg-green-100 text-green-800"
                  : token.status === "Cancelled"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
              }
            >
              {token.status}
            </Badge>
          </div>

          {/* Basic Info */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-gray-600" />
                <span className="font-medium">Class:</span>
              </div>
              <Badge variant={token.class === "AC" ? "default" : "secondary"}>{token.class}</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-600" />
                <span className="font-medium">Passengers:</span>
              </div>
              <span>{token.passengers}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-600" />
                <span className="font-medium">Type:</span>
              </div>
              <Badge
                variant="outline"
                className={`text-xs ${
                  token.type === "Manual"
                    ? "border-orange-500 text-orange-700"
                    : token.type === "Representative"
                      ? "border-purple-500 text-purple-700"
                      : "border-blue-500 text-blue-700"
                }`}
              >
                {token.type}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="font-medium">Registration Time:</span>
              </div>
              <span>{token.time}</span>
            </div>
          </div>

          {/* Personal Details */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              Personal Details
            </h3>
            <div className="space-y-2">
              {token.name && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Name:</span>
                  <span className="text-sm">{token.name}</span>
                </div>
              )}
              {token.passengerName && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Passenger:</span>
                  <span className="text-sm">{token.passengerName}</span>
                </div>
              )}
              {token.repName && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Representative:</span>
                  <span className="text-sm">{token.repName}</span>
                </div>
              )}
              {token.aadhaar && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Aadhaar:</span>
                  <span className="text-sm font-mono">{token.aadhaar}</span>
                </div>
              )}
              {token.reason && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Reason:</span>
                  <span className="text-sm text-orange-600">{token.reason}</span>
                </div>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-600">Token ID: #{token.id.toString().padStart(6, "0")}</p>
            <p className="text-xs text-gray-600">Generated on: {new Date().toLocaleDateString("en-IN")}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
