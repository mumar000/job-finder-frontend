'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { jobsApi } from '@/lib/api'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { BriefcaseIcon } from '@/components/ui/icons'
import { ROUTES } from '@/lib/constants'

export default function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const data = await jobsApi.getJobStats()
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const statusCounts = stats?.statusCounts || {}
  const totalJobs = Object.values(statusCounts).reduce((sum, count) => sum + count, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href={ROUTES.JOBS}>
          <Button>
            <BriefcaseIcon className="mr-2" />
            View All Jobs
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Jobs"
          value={totalJobs}
          icon="📊"
          color="bg-blue-500"
        />
        <StatCard
          title="New Jobs"
          value={statusCounts.new || 0}
          icon="✨"
          color="bg-green-500"
        />
        <StatCard
          title="Applied"
          value={statusCounts.applied || 0}
          icon="📝"
          color="bg-yellow-500"
        />
        <StatCard
          title="Hired"
          value={statusCounts.hired || 0}
          icon="🎉"
          color="bg-purple-500"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Jobs by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(statusCounts).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-sm capitalize">{status}</span>
                  </div>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-green-500" />
                <div>
                  <p className="text-sm font-medium">New jobs available</p>
                  <p className="text-xs text-muted-foreground">
                    {statusCounts.new || 0} new jobs match your criteria
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                <div>
                  <p className="text-sm font-medium">Applications pending</p>
                  <p className="text-xs text-muted-foreground">
                    {statusCounts.applied || 0} applications awaiting response
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-purple-500" />
                <div>
                  <p className="text-sm font-medium">Interviews scheduled</p>
                  <p className="text-xs text-muted-foreground">
                    {statusCounts.interviewing || 0} interviews in progress
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* High Match Jobs Section */}
      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>High Match Jobs</CardTitle>
            <Link href={`${ROUTES.JOBS}?min_score=80`}>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {stats?.highMatchJobs || 0} jobs with 80%+ match score
          </p>
          <Link href={ROUTES.JOBS}>
            <Button className="mt-4">Browse Jobs</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({ title, value, icon, color }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-3xl font-bold mt-2">{value}</h3>
          </div>
          <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-2xl`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
