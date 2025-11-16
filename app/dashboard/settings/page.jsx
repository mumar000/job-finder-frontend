'use client'

import { useSettings } from '@/hooks/use-settings'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export default function SettingsPage() {
  const {
    upworkStatus,
    loading,
    connecting,
    syncing,
    disconnecting,
    isUpworkConnected,
    connectUpwork,
    disconnectUpwork,
    syncUpworkProfile,
  } = useSettings()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {/* Upwork Integration Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upwork Integration</CardTitle>
          <CardDescription>
            Connect your Upwork account to automatically sync your profile and find matching jobs
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-10 w-32" />
            </div>
          ) : (
            <div className="space-y-4">
              {isUpworkConnected ? (
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-sm font-medium text-green-600">Connected to Upwork</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your Upwork profile is connected. We&apos;ll automatically sync your skills, portfolio,
                    and work history to provide better job matches.
                  </p>
                  <div className="flex gap-3">
                    <Button onClick={syncUpworkProfile} disabled={syncing} variant="outline">
                      {syncing ? 'Syncing...' : 'Sync Profile Now'}
                    </Button>
                    <Button onClick={disconnectUpwork} disabled={disconnecting} variant="destructive">
                      {disconnecting ? 'Disconnecting...' : 'Disconnect'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-gray-400" />
                    <span className="text-sm font-medium text-muted-foreground">Not connected</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect your Upwork account to:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mb-4 space-y-1">
                    <li>Automatically sync your skills and profile</li>
                    <li>Get personalized job recommendations</li>
                    <li>Track your work history and success rate</li>
                    <li>Never miss high-matching opportunities</li>
                  </ul>
                  <Button onClick={connectUpwork} disabled={connecting}>
                    {connecting ? 'Connecting...' : 'Connect to Upwork'}
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Settings Section */}
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Manage your account preferences and notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Additional account settings coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
