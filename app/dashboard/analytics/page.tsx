'use client';

export default function AnalyticsPage() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Task Distribution</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 mb-1">To Do</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-400 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">In Progress</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Review</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Done</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Priority Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Low</span>
              <span className="font-bold text-gray-900">5 tasks</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Medium</span>
              <span className="font-bold text-gray-900">12 tasks</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">High</span>
              <span className="font-bold text-gray-900">8 tasks</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Urgent</span>
              <span className="font-bold text-gray-900">3 tasks</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Approval Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">5</p>
            <p className="text-sm text-gray-600">Approved</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-600">3</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-600">1</p>
            <p className="text-sm text-gray-600">Rejected</p>
          </div>
        </div>
      </div>
    </div>
  );
}
