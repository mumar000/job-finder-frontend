'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { JOB_STATUS, BUDGET_TYPE } from '@/lib/constants'

/**
 * Job Filters Component
 * Provides filtering options for jobs
 */
export function JobFilters({ filters, onFiltersChange, onClear }) {
  const [localFilters, setLocalFilters] = useState(filters)

  const handleChange = (key, value) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleApply = () => {
    onFiltersChange(localFilters)
  }

  const handleClear = () => {
    const clearedFilters = {
      status: '',
      min_score: '',
      max_score: '',
      budget_type: '',
      min_budget: '',
      max_budget: '',
      category: '',
    }
    setLocalFilters(clearedFilters)
    onClear?.()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Filter */}
        <div className="space-y-2">
          <Label>Status</Label>
          <select
            value={localFilters.status || ''}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">All Statuses</option>
            {Object.entries(JOB_STATUS).map(([key, value]) => (
              <option key={key} value={value}>
                {key.charAt(0) + key.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Match Score Range */}
        <div className="space-y-2">
          <Label>Match Score Range</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              min="0"
              max="100"
              value={localFilters.min_score || ''}
              onChange={(e) => handleChange('min_score', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              min="0"
              max="100"
              value={localFilters.max_score || ''}
              onChange={(e) => handleChange('max_score', e.target.value)}
            />
          </div>
        </div>

        {/* Budget Type */}
        <div className="space-y-2">
          <Label>Budget Type</Label>
          <select
            value={localFilters.budget_type || ''}
            onChange={(e) => handleChange('budget_type', e.target.value)}
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">All Types</option>
            <option value={BUDGET_TYPE.FIXED}>Fixed Price</option>
            <option value={BUDGET_TYPE.HOURLY}>Hourly</option>
          </select>
        </div>

        {/* Budget Range */}
        <div className="space-y-2">
          <Label>Budget Range ($)</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              min="0"
              value={localFilters.min_budget || ''}
              onChange={(e) => handleChange('min_budget', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              min="0"
              value={localFilters.max_budget || ''}
              onChange={(e) => handleChange('max_budget', e.target.value)}
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Category</Label>
          <Input
            placeholder="e.g., Web Development"
            value={localFilters.category || ''}
            onChange={(e) => handleChange('category', e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button onClick={handleApply} className="flex-1">
            Apply Filters
          </Button>
          <Button onClick={handleClear} variant="outline">
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
