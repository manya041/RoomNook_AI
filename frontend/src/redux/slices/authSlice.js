import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios'

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password, userType }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/login/${userType}`, { email, password })
      const { token, refreshToken, user } = response.data
      
      localStorage.setItem('token', token)
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('user', JSON.stringify(user))
      
      return { token, refreshToken, user }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed')
    }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async ({ userData, userType }, { rejectWithValue }) => {
    try {
      console.log('Redux register: Sending to API:', `/auth/register/${userType}`, userData)
      const response = await api.post(`/auth/register/${userType}`, userData)
      console.log('Redux register: API response:', response.data)
      const { token, refreshToken, user } = response.data
      
      localStorage.setItem('token', token)
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('user', JSON.stringify(user))
      
      return { token, refreshToken, user }
    } catch (error) {
      console.error('Redux register: API error:', error.response?.data || error.message)
      const apiErr = error.response?.data
      const msg = apiErr?.errors?.[0]?.msg || apiErr?.message || 'Registration failed'
      return rejectWithValue(msg)
    }
  }
)

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/auth/profile')
      return response.data.user
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get profile')
    }
  }
)

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.put('/auth/profile', userData)
      return response.data.user
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile')
    }
  }
)

// Initial state
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
}

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('refreshToken')
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.refreshToken = action.payload.refreshToken || null
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.refreshToken = action.payload.refreshToken || null
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.refreshToken = null
        state.isAuthenticated = false
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
export const logoutAsync = createAsyncThunk(
  'auth/logoutAsync',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      await api.post('/auth/logout', { refreshToken })
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      return true
    } catch (error) {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      return rejectWithValue(error.response?.data?.message || 'Logout failed')
    }
  }
)
