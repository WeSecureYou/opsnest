'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Inbox, Megaphone, Users } from 'lucide-react';
import axios from 'axios';

interface Stats {
  totalTasks: number;
  pendingApprovals: number;
  announcements: number;
  teamMembers: number;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<Stats>({
    totalTasks: 0,
    pendingApprovals: 0,
    announcements: 0,
    teamMembers: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [tasksRes, approvalsRes] = await Promise.all([
          axios.get('/api/tasks'),
          axios.get('/api/approvals'),
        ]);

        setStats({
          totalTasks: tasksRes.data.pagination.total,
          pendingApprovals: approvalsRes.data.approvals.filter(
            (a: any) => a.status === 'pending'
          ).length,
          announcements: 0, // Can be fetched similarly
          teamMembers: 0, // Can be fetched similarly
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsCards = [
    {
      label: 'Total Tasks',
      value: stats.totalTasks,
      icon: CheckCircle2,
      color: 'text-blue-600',
      href: '/dashboard/tasks',
    },
    {
      label: 'Pending Approvals',
      value: stats.pendingApprovals,
      icon: Inbox,
      color: 'text-orange-600',
      href: '/dashboard/approvals',
    },
    {
      label: 'Announcements',
      value: stats.announcements,
      icon: Megaphone,
      color: 'text-green-600',
      href: '/dashboard/announcements',
    },
    {
      label: 'Team Members',
      value: stats.teamMembers,
      icon: Users,
      color: 'text-purple-600',
      href: '/dashboard/team',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {session?.user.name}!
        </h2>
        <p className="text-gray-600">Here's what's happening in your organization.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{card.label}</p>
                  <p className={`text-4xl font-bold mt-2 ${card.color}`}>
                    {isLoading ? '...' : card.value}
                  </p>
                </div>
                <Icon className={`${card.color} opacity-20`} size={40} />
              </div>
              <div className="flex items-center gap-2 text-blue-600 mt-4 text-sm font-medium">
                View all <ArrowRight size={16} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/dashboard/tasks?action=create"
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition"
          >
            <p className="font-medium text-gray-900">Create a Task</p>
            <p className="text-sm text-gray-600 mt-1">
              Assign work to team members
            </p>
          </Link>
          <Link
            href="/dashboard/approvals?action=create"
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition"
          >
            <p className="font-medium text-gray-900">Request Approval</p>
            <p className="text-sm text-gray-600 mt-1">
              Start an approval workflow
            </p>
          </Link>
          <Link
            href="/dashboard/announcements?action=create"
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition"
          >
            <p className="font-medium text-gray-900">Post Announcement</p>
            <p className="text-sm text-gray-600 mt-1">
              Share important updates
            </p>
          </Link>
          <Link
            href="/dashboard/team"
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition"
          >
            <p className="font-medium text-gray-900">Manage Team</p>
            <p className="text-sm text-gray-600 mt-1">
              Invite members and manage roles
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
