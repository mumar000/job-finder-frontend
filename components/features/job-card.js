import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatMatchScore, formatBudget, formatRelativeTime, truncateText } from '@/lib/utils/formatters'
import { JOB_STATUS_COLORS, ROUTES } from '@/lib/constants'
import { cn } from '@/lib/utils/cn'

/**
 * Job Card Component
 * Displays a job with key information and quick actions
 */
export function JobCard({ job, onStatusChange }) {
  const matchScore = formatMatchScore(job.match_score)
  const budget = formatBudget(job)
  const postedAt = formatRelativeTime(job.posted_at)
  const description = truncateText(job.description, 150)

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <Link href={ROUTES.JOB_DETAIL(job._id)}>
              <CardTitle className="hover:text-primary cursor-pointer line-clamp-2">
                {job.title}
              </CardTitle>
            </Link>
            <CardDescription className="mt-1">
              Posted {postedAt} • {budget}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge
              variant="outline"
              className={cn('font-bold', matchScore.color)}
            >
              {matchScore.score}% Match
            </Badge>
            <Badge className={JOB_STATUS_COLORS[job.status]}>
              {job.status}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        <p className="text-sm text-muted-foreground">{description}</p>

        {/* Skills */}
        {job.skills_required && job.skills_required.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {job.skills_required.slice(0, 5).map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
            {job.skills_required.length > 5 && (
              <Badge variant="secondary">
                +{job.skills_required.length - 5} more
              </Badge>
            )}
          </div>
        )}

        {/* Client Info */}
        {job.client_info && (
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
            {job.client_info.hire_rate !== undefined && (
              <div>
                <span className="font-medium">Hire Rate:</span>{' '}
                {job.client_info.hire_rate}%
              </div>
            )}
            {job.client_info.total_spent !== undefined && (
              <div>
                <span className="font-medium">Spent:</span> $
                {job.client_info.total_spent.toLocaleString()}
              </div>
            )}
            {job.client_info.payment_verified && (
              <Badge variant="outline" className="text-green-600">
                ✓ Verified
              </Badge>
            )}
            {job.proposal_count > 0 && (
              <div>
                <span className="font-medium">Proposals:</span>{' '}
                {job.proposal_count}
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        {job.status === 'new' && (
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              onClick={() => onStatusChange?.(job._id, 'interested')}
            >
              Interested
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onStatusChange?.(job._id, 'declined')}
            >
              Decline
            </Button>
          </div>
        )}

        {job.status === 'interested' && (
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              onClick={() => onStatusChange?.(job._id, 'applied')}
            >
              Mark as Applied
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
