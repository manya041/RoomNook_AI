import React from 'react'
import { Home, Plus, BarChart3, Users } from 'lucide-react'

const OwnerDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Owner Dashboard</h1>
        <p className="text-gray-600">Manage your PG listings and track performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card-hover">
          <Home className="h-8 w-8 text-blue-600 mb-2" />
          <h3 className="text-lg font-semibold mb-1">My Listings</h3>
          <p className="text-gray-600 text-sm">Manage your PG listings</p>
        </div>
        
        <div className="card-hover">
          <Plus className="h-8 w-8 text-green-600 mb-2" />
          <h3 className="text-lg font-semibold mb-1">Add New PG</h3>
          <p className="text-gray-600 text-sm">Create a new listing</p>
        </div>
        
        <div className="card-hover">
          <BarChart3 className="h-8 w-8 text-purple-600 mb-2" />
          <h3 className="text-lg font-semibold mb-1">Analytics</h3>
          <p className="text-gray-600 text-sm">View performance metrics</p>
        </div>
        
        <div className="card-hover">
          <Users className="h-8 w-8 text-orange-600 mb-2" />
          <h3 className="text-lg font-semibold mb-1">Applications</h3>
          <p className="text-gray-600 text-sm">Manage student applications</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">0</div>
            <div className="text-gray-600">Total Listings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">0</div>
            <div className="text-gray-600">Active Listings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-gray-600">Applications</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OwnerDashboard
