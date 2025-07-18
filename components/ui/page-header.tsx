"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface PageHeaderProps {
  title: string
  subtitle?: string
  onBack?: () => void
  showLogo?: boolean
  actions?: React.ReactNode
}

export function PageHeader({ title, subtitle, onBack, showLogo = true, actions }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        {onBack && (
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
        )}
        {showLogo && (
          <div className="w-10 h-10">
            <img src="/indian-railways-logo.png" alt="Indian Railways" className="w-full h-full object-contain" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-blue-900">{title}</h1>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}
