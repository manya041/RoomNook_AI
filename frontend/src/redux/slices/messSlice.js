import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios'

const buildDemoMessListings = (count = 30) => {
  const locations = [
    'Clement Town, Dehradun',
    'Rajpur Road, Dehradun',
    'Dharampur, Dehradun',
    'Ballupur, Dehradun',
    'Sahastradhara Road, Dehradun',
    'Prem Nagar, Dehradun',
    'Karanpur, Dehradun'
  ]
  const foods = ['veg', 'non-veg', 'both']
  const images = [
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1481931715705-36f966f6d168?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop'
  ]
  return Array.from({ length: count }, (_, i) => {
    const idx = i % locations.length
    const ft = foods[i % foods.length]
    const cost = 2200 + (i % 12) * 100
    const rating = 4 + (i % 10) * 0.05
    return {
      id: `demo-${i + 1}`,
      name: `RoomNook Mess ${i + 1}`,
      location: locations[idx],
      food_type: ft,
      monthly_cost: cost,
      rating: Math.round(rating * 10) / 10,
      meal_timing: '7AM-10PM',
      images: [images[idx % images.length]],
      status: 'active',
      phone: `+91-97${String(60000000 + i).slice(0,8)}`
    }
  })
}

const DEMO_MESS_LISTINGS = buildDemoMessListings(30)

// Async thunks
export const getMessListings = createAsyncThunk(
  'mess/getMessListings',
  async (filters = {}, { rejectWithValue }) => {
    if (import.meta?.env?.DEV) {
      return {
        messListings: DEMO_MESS_LISTINGS,
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalItems: DEMO_MESS_LISTINGS.length,
          limit: DEMO_MESS_LISTINGS.length
        }
      }
    }
    try {
      const response = await api.get('/students/mess-listings', { params: filters })
      return response.data
    } catch (error) {
      return {
        messListings: DEMO_MESS_LISTINGS,
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalItems: DEMO_MESS_LISTINGS.length,
          limit: DEMO_MESS_LISTINGS.length
        }
      }
    }
  }
)

export const getMessListingById = createAsyncThunk(
  'mess/getMessListingById',
  async (id, { rejectWithValue }) => {
    if (import.meta?.env?.DEV) {
      const item = DEMO_MESS_LISTINGS.find((m) => String(m.id) === String(id)) || DEMO_MESS_LISTINGS[0]
      return item
    }
    try {
      const response = await api.get(`/students/mess-listings/${id}`)
      return response.data
    } catch (error) {
      const item = DEMO_MESS_LISTINGS.find((m) => String(m.id) === String(id)) || DEMO_MESS_LISTINGS[0]
      return item
    }
  }
)

// Initial state
const initialState = {
  messListings: [],
  currentMessListing: null,
  pagination: null,
  loading: false,
  error: null,
}

// Mess slice
const messSlice = createSlice({
  name: 'mess',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearCurrentMessListing: (state) => {
      state.currentMessListing = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Mess Listings
      .addCase(getMessListings.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getMessListings.fulfilled, (state, action) => {
        state.loading = false
        state.messListings = action.payload.messListings
        state.pagination = action.payload.pagination
      })
      .addCase(getMessListings.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Get Mess Listing by ID
      .addCase(getMessListingById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getMessListingById.fulfilled, (state, action) => {
        state.loading = false
        state.currentMessListing = action.payload
      })
      .addCase(getMessListingById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError, clearCurrentMessListing } = messSlice.actions
export default messSlice.reducer
