"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useJobDetail } from "@/hooks/use-jobs";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  formatMatchScore,
  formatBudget,
  formatRelativeTime,
  formatDate,
} from "@/lib/utils/formatters";
import {
  JOB_STATUS,
  JOB_STATUS_LABELS,
  JOB_STATUS_COLORS,
  ROUTES,
} from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

export default function JobDetailPage({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const router = useRouter();
  const { toast } = useToast();
  const { job, loading, updateJobStatus, updateJob, refresh } =
    useJobDetail(id);

  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Initialize form values when job loads
  if (job && !notes && !selectedStatus) {
    setNotes(job.notes || "");
    setTags(job.tags?.join(", ") || "");
    setSelectedStatus(job.status);
  }

  const handleStatusChange = async (newStatus) => {
    const result = await updateJobStatus(newStatus);
    if (result.success) {
      toast({
        title: "Success",
        description: `Job status updated to ${JOB_STATUS_LABELS[newStatus]}`,
        variant: "success",
      });
      setSelectedStatus(newStatus);
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const handleSaveNotes = async () => {
    const tagsArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);
    const result = await updateJob({ notes, tags: tagsArray });

    if (result.success) {
      toast({
        title: "Success",
        description: "Notes and tags saved",
        variant: "success",
      });
      setIsEditingNotes(false);
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to save",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-32 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-5xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The job you're looking for doesn't exist or has been removed.
        </p>
        <Link href={ROUTES.JOBS}>
          <Button>Back to Jobs</Button>
        </Link>
      </div>
    );
  }

  const matchScore = formatMatchScore(job.match_score);
  const budget = formatBudget(job);
  const postedAt = formatRelativeTime(job.posted_at);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        ← Back to Jobs
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-2xl">{job.title}</CardTitle>
                  <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
                    <span>Posted {postedAt}</span>
                    <span>•</span>
                    <span>{budget}</span>
                    <span>•</span>
                    <span>{job.proposal_count} proposals</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "font-bold text-lg px-3 py-1",
                      matchScore.color
                    )}
                  >
                    {matchScore.score}%
                  </Badge>
                  <Badge className={JOB_STATUS_COLORS[job.status]}>
                    {JOB_STATUS_LABELS[job.status]}
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-sm">{job.description}</p>
            </CardContent>
          </Card>

          {/* Skills Required */}
          {job.skills_required && job.skills_required.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Skills Required</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.skills_required.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Notes & Tags</CardTitle>
                {!isEditingNotes ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingNotes(true)}
                  >
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveNotes}>
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setIsEditingNotes(false);
                        setNotes(job.notes || "");
                        setTags(job.tags?.join(", ") || "");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Notes</Label>
                {isEditingNotes ? (
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add your notes about this job..."
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm mt-2"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground mt-2">
                    {job.notes || "No notes added yet"}
                  </p>
                )}
              </div>

              <div>
                <Label>Tags (comma separated)</Label>
                {isEditingNotes ? (
                  <Input
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="e.g., urgent, high-priority, long-term"
                    className="mt-2"
                  />
                ) : job.tags && job.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {job.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground mt-2">
                    No tags added
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Update Status</Label>
                <select
                  value={selectedStatus}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  {Object.entries(JOB_STATUS).map(([key, value]) => (
                    <option key={key} value={value}>
                      {JOB_STATUS_LABELS[value]}
                    </option>
                  ))}
                </select>
              </div>

              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full">View on Upwork →</Button>
              </a>
            </CardContent>
          </Card>

          {/* Client Info */}
          {job.client_info && (
            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {job.client_info.hire_rate !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hire Rate:</span>
                    <span className="font-medium">
                      {job.client_info.hire_rate}%
                    </span>
                  </div>
                )}
                {job.client_info.total_spent !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Spent:</span>
                    <span className="font-medium">
                      ${job.client_info.total_spent.toLocaleString()}
                    </span>
                  </div>
                )}
                {job.client_info.location && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">
                      {job.client_info.location}
                    </span>
                  </div>
                )}
                {job.client_info.payment_verified && (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-600">
                      ✓ Payment Verified
                    </Badge>
                  </div>
                )}
                {job.client_info.reviews_count > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reviews:</span>
                    <span className="font-medium">
                      {job.client_info.rating?.toFixed(1)} (
                      {job.client_info.reviews_count})
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Job Details */}
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {job.category && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium">{job.category}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Budget Type:</span>
                <span className="font-medium capitalize">
                  {job.budget_type}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Posted:</span>
                <span className="font-medium">{formatDate(job.posted_at)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Added:</span>
                <span className="font-medium">
                  {formatDate(job.created_at)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
