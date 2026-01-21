'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Plus, CheckCircle, XCircle } from 'lucide-react';

interface Approval {
  id: string;
  title: string;
  description?: string;
  requestType: string;
  status: string;
  priority: string;
  createdBy: { id: string; name: string; email: string };
  currentApprover?: { id: string; name: string; email: string };
  approvedBy?: { id: string; name: string; email: string };
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchApprovals();
  }, []);

  const fetchApprovals = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/approvals');
      setApprovals(response.data.approvals);
    } catch (error) {
      toast.error('Failed to fetch approvals');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (approvalId: string) => {
    try {
      const response = await axios.post(`/api/approvals/${approvalId}/approve`, {
        approvalNotes: 'Approved',
      });
      setApprovals(
        approvals.map((a) => (a.id === approvalId ? response.data : a))
      );
      toast.success('Approval submitted');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to approve');
    }
  };

  const handleReject = async (approvalId: string) => {
    const reason = prompt('Please provide a rejection reason:');
    if (!reason) return;

    try {
      const response = await axios.post(`/api/approvals/${approvalId}/reject`, {
        rejectionReason: reason,
      });
      setApprovals(
        approvals.map((a) => (a.id === approvalId ? response.data : a))
      );
      toast.success('Approval rejected');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to reject');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Approvals</h2>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Request Approval
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">Loading approvals...</div>
        ) : approvals.length === 0 ? (
          <div className="p-8 text-center text-gray-600">
            No approvals yet.
          </div>
        ) : (
          <div className="divide-y">
            {approvals.map((approval) => (
              <div key={approval.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      {approval.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {approval.description}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[approval.status] ||
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {approval.status}
                  </span>
                </div>

                <div className="text-sm text-gray-600 mb-4">
                  <p>
                    Requested by: <strong>{approval.createdBy.name}</strong>
                  </p>
                  {approval.currentApprover && (
                    <p>
                      Awaiting approval from:{' '}
                      <strong>{approval.currentApprover.name}</strong>
                    </p>
                  )}
                </div>

                {approval.status === 'pending' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApprove(approval.id)}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
                    >
                      <CheckCircle size={18} />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(approval.id)}
                      className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm"
                    >
                      <XCircle size={18} />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
