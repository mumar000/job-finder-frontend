'use client'

import { useState } from 'react'
import { useJobs } from '@/hooks/use-jobs'
import { useToast } from '@/hooks/use-toast'
import { useDebounce } from '@/hooks/use-debounce'
import { JobCard } from '@/components/features/job-card'
import { JobFilters } from '@/components/features/job-filters'
import { Pagination } from '@/components/ui/pagination'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { SearchIcon, FilterIcon, XIcon } from '@/components/ui/icons'
import { jobsApi } from '@/lib/api'
import { cn } from '@/lib/utils/cn'

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('match_score')
  const { toast } = useToast()

  const debouncedSearch = useDebounce(searchQuery, 500)

  const { jobs, loading, filters, meta, updateFilters, goToPage, refresh } = useJobs({
    sort_by: sortBy,
  })

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      await jobsApi.updateJobStatus(jobId, newStatus)
      toast({
        title: 'Success',
        description: `Job status updated to ${newStatus}`,
        variant: 'success',
      })
      refresh()
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update job status',
        variant: 'destructive',
      })
    }
  }

  const handleFiltersChange = (newFilters) => {
    updateFilters(newFilters)
    setShowFilters(false)
  }

  const handleClearFilters = () => {
    updateFilters({
      status: '',
      min_score: '',
      max_score: '',
      budget_type: '',
      min_budget: '',
      max_budget: '',
      category: '',
    })
  }

  const handleSortChange = (e) => {
    const newSort = e.target.value
    setSortBy(newSort)
    updateFilters({ sort_by: newSort })
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Jobs</h1>
          <p className="text-muted-foreground mt-1">
            {meta.total} jobs found
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden"
        >
          <FilterIcon className="mr-2" />
          Filters
        </Button>
      </div>

      <div className="flex gap-6">
        {/* Filters Sidebar - Desktop */}
        <aside className="hidden md:block w-72 shrink-0">
          <JobFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClear={handleClearFilters}
          />
        </aside>

        {/* Filters Sidebar - Mobile */}
        {showFilters && (
          <>
            <div
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
              onClick={() => setShowFilters(false)}
            />
            <aside className="fixed left-0 top-16 bottom-0 z-50 w-72 bg-background border-r overflow-y-auto md:hidden p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowFilters(false)}
                >
                  <XIcon />
                </Button>
              </div>
              <JobFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClear={handleClearFilters}
              />
            </aside>
          </>
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Search and Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search jobs by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm w-full sm:w-48"
            >
              <option value="match_score">Best Match</option>
              <option value="posted_at">Most Recent</option>
              <option value="created_at">Recently Added</option>
            </select>
          </div>

          {/* Jobs Grid */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border rounded-lg p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-20 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search query
              </p>
              <Button onClick={handleClearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {jobs.map((job) => (
                  <JobCard
                    key={job._id}
                    job={job}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>

              {/* Pagination */}
              {meta.totalPages > 1 && (
                <Pagination
                  currentPage={meta.page}
                  totalPages={meta.totalPages}
                  onPageChange={goToPage}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
