'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Plus, Trash2, Shield } from 'lucide-react';

interface TeamMember {
  id: string;
  email: string;
  name?: string;
  status: string;
  userRoles: Array<{ role: string; level: number }>;
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    role: 'member',
  });

  useEffect(() => {
    // Fetch team members - would need to create this endpoint
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setIsLoading(true);
      // This endpoint would need to be created
      // const response = await axios.get('/api/team/members');
      // setMembers(response.data.members);
    } catch (error) {
      toast.error('Failed to fetch team members');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // This endpoint would need to be created
      // const response = await axios.post('/api/team/invite', formData);
      toast.success('Invitation sent successfully');
      setFormData({ email: '', role: 'member' });
      setShowInviteForm(false);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to send invitation');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Team</h2>
        <button
          onClick={() => setShowInviteForm(!showInviteForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Invite Member
        </button>
      </div>

      {showInviteForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-bold mb-4">Invite Team Member</h3>
          <form onSubmit={handleInviteUser} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="member@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="member">Member</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Send Invitation
              </button>
              <button
                type="button"
                onClick={() => setShowInviteForm(false)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">Loading team members...</div>
        ) : members.length === 0 ? (
          <div className="p-8 text-center text-gray-600">
            <p className="mb-4">No team members yet. Start by inviting your first team member.</p>
            <Shield size={48} className="mx-auto opacity-20" />
          </div>
        ) : (
          <div className="divide-y">
            {members.map((member) => (
              <div key={member.id} className="p-6 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{member.name || member.email}</p>
                  <p className="text-sm text-gray-600">{member.email}</p>
                  {member.userRoles.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Role: {member.userRoles[0].role}
                    </p>
                  )}
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg text-red-600">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
