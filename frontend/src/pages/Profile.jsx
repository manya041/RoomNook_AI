import React from 'react'
import { User, Mail, Phone, MapPin } from 'lucide-react'

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Manage your account information</p>
      </div>

      <div className="card">
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold">User Profile</h2>
          <p className="text-gray-600">Update your personal information</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-400" />
                <input type="text" className="input" placeholder="Your name" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <input type="email" className="input" placeholder="Your email" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <input type="tel" className="input" placeholder="Your phone number" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <input type="text" className="input" placeholder="Your location" />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button className="btn btn-primary">Update Profile</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
