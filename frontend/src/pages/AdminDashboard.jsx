import React from 'react'
import { Shield, Users, Home, BarChart3 } from 'lucide-react'

const AdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Manage the platform and verify listings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card-hover">
          <Users className="h-8 w-8 text-blue-600 mb-2" />
          <h3 className="text-lg font-semibold mb-1">Users</h3>
          <p className="text-gray-600 text-sm">Manage students and owners</p>
        </div>
        
        <div className="card-hover">
          <Home className="h-8 w-8 text-green-600 mb-2" />
          <h3 className="text-lg font-semibold mb-1">Listings</h3>
          <p className="text-gray-600 text-sm">Verify PG listings</p>
        </div>
        
        <div className="card-hover">
          <Shield className="h-8 w-8 text-purple-600 mb-2" />
          <h3 className="text-lg font-semibold mb-1">Verification</h3>
          <p className="text-gray-600 text-sm">Approve pending items</p>
        </div>
        
        <div className="card-hover">
          <BarChart3 className="h-8 w-8 text-orange-600 mb-2" />
          <h3 className="text-lg font-semibold mb-1">Analytics</h3>
          <p className="text-gray-600 text-sm">Platform statistics</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Platform Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">0</div>
            <div className="text-gray-600">Total Students</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">0</div>
            <div className="text-gray-600">Total Owners</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-gray-600">PG Listings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">0</div>
            <div className="text-gray-600">Pending Reviews</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
