import { getAnalyticsAction } from "@/lib/actions/admin";
import {
  FolderKanban,
  FileText,
  Users,
  Mail,
  TrendingUp,
  Clock,
} from "lucide-react";
import Link from "next/link";

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  href,
}: {
  title: string;
  value: number;
  subtitle?: string;
  icon: any;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
          <Icon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        </div>
      </div>
    </Link>
  );
}

function ActivityItem({
  title,
  description,
  time,
}: {
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex gap-4 border-b border-gray-200 py-4 last:border-0 dark:border-gray-800">
      <div className="flex-shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
          <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">{time}</p>
      </div>
    </div>
  );
}

export default async function AdminDashboard() {
  const result = await getAnalyticsAction();

  if (!result.success || !result.data) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-red-600">
            Failed to load analytics
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {result.error}
          </p>
        </div>
      </div>
    );
  }

  const data = result.data;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome to your admin dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Projects"
          value={data.projects.total}
          subtitle={`${data.projects.featured} featured`}
          icon={FolderKanban}
          href="/admin/projects"
        />
        <StatCard
          title="Blog Posts"
          value={data.blog.published}
          subtitle={`${data.blog.drafts} drafts`}
          icon={FileText}
          href="/admin/blog"
        />
        <StatCard
          title="Leads"
          value={data.leads.total}
          subtitle={`${data.leads.pending} pending`}
          icon={Users}
          href="/admin/leads"
        />
        <StatCard
          title="Subscribers"
          value={data.subscribers.active}
          subtitle="Active subscribers"
          icon={Mail}
          href="/admin/subscribers"
        />
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Activity</h2>
          <TrendingUp className="h-5 w-5 text-gray-400" />
        </div>

        {data.recentActivity.length > 0 ? (
          <div>
            {data.recentActivity.map((activity) => (
              <ActivityItem
                key={activity.id}
                title={activity.title}
                description={activity.description}
                time={new Date(activity.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              />
            ))}
          </div>
        ) : (
          <p className="py-8 text-center text-gray-500 dark:text-gray-400">
            No recent activity
          </p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
        <h2 className="mb-4 text-xl font-bold">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/admin/projects/new"
            className="rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
          >
            <FolderKanban className="mb-2 h-6 w-6" />
            <p className="font-medium">Create Project</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Add a new portfolio project
            </p>
          </Link>
          <Link
            href="/admin/blog/new"
            className="rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
          >
            <FileText className="mb-2 h-6 w-6" />
            <p className="font-medium">Write Blog Post</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Create a new blog post
            </p>
          </Link>
          <Link
            href="/admin/leads"
            className="rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
          >
            <Users className="mb-2 h-6 w-6" />
            <p className="font-medium">Review Leads</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Check new contact submissions
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
