'use client'

import { useEffect, useState } from 'react'
import fallbackStats from '@/lib/workshop-fallback.json'

export interface WorkshopStats {
  generatedAt: string
  proof: {
    autonomousActionsLast30d: number
    interventionRateLast30d: number
    daysSinceLastEditAcrossAllExhibits: string
    lastEditTimestamp: string | null
    fleetUptimePct: number
    agentsInProduction: number
    auditLogRetentionDays: number
    killSwitchState: 'armed' | 'engaged' | 'partial' | 'unknown'
  }
  exhibits: {
    'facebook-autopilot': {
      daysAutonomous: number
      postsThisMonth: number
      postsPlanned: number
      commentsAnswered: number
      avgResponseTimeMin: number
      lastHumanEditTs: string | null
    }
    veloura: {
      escalationsRate: number
      conversationsHandled: number
      daysAutonomous: number
      avgResolutionMin: number
      lastHumanEditTs: string | null
    }
  }
  isStale: boolean
  staleSinceMin: number
}

interface WorkshopStatsState {
  data: WorkshopStats
  isStale: boolean
  isFallback: boolean
}

const buildFallback = fallbackStats as WorkshopStats

export default function useWorkshopStats(): WorkshopStatsState {
  const [state, setState] = useState<WorkshopStatsState>({ data: buildFallback, isStale: buildFallback.isStale, isFallback: true })

  useEffect(() => {
    let cancelled = false

    async function loadStats() {
      try {
        const response = await fetch('/api/workshop-stats.json', { cache: 'no-store' })
        if (!response.ok) throw new Error(`workshop stats ${response.status}`)
        const data = (await response.json()) as WorkshopStats
        if (!cancelled) setState({ data, isStale: data.isStale, isFallback: false })
      } catch {
        if (!cancelled) setState({ data: buildFallback, isStale: true, isFallback: true })
      }
    }

    void loadStats()
    return () => { cancelled = true }
  }, [])

  return state
}
