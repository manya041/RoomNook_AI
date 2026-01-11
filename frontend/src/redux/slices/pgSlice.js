import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios'

const buildDemoPgListings = (count = 30) => {
  const locations = [
    'Clement Town, Dehradun',
    'Rajpur Road, Dehradun',
    'Dharampur, Dehradun',
    'Ballupur, Dehradun',
    'Sahastradhara Road, Dehradun',
    'Prem Nagar, Dehradun',
    'Karanpur, Dehradun'
  ]
  const roomTypes = ['single', 'double', 'triple']
  const images = [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1505692794403-34d4982db3f7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1527030280862-64139fba04ca?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-1e5113c3d2aa?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&h=600&fit=crop'
  ]
  return Array.from({ length: count }, (_, i) => {
    const idx = i % locations.length
    const rt = roomTypes[i % roomTypes.length]
    const price = 4500 + (i % 10) * 300
    const rating = 4 + (i % 10) * 0.07
    return {
      id: `demo-${i + 1}`,
      title: `RoomNook PG ${i + 1}`,
      location: locations[idx],
      room_type: rt,
      rent_amount: price,
      rating: Math.round(rating * 10) / 10,
      images: [images[idx]],
      amenities: ['WiFi', 'RO Water', 'Food', 'Security', ...(rt !== 'single' ? ['AC'] : [])],
      verification_status: 'verified',
      status: 'active',
      owner: { name: `Owner ${i + 1}`, phone: `+91-98${String(70000000 + i).slice(0,8)}` }
    }
  })
}

const DEMO_PG_LISTINGS = buildDemoPgListings(30)

// Async thunks
export const getPgListings = createAsyncThunk(
  'pg/getPgListings',
  async (filters = {}, { rejectWithValue }) => {
    if (import.meta?.env?.DEV) {
      return {
        pgListings: DEMO_PG_LISTINGS,
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalItems: DEMO_PG_LISTINGS.length,
          limit: DEMO_PG_LISTINGS.length
        }
      }
    }
    try {
      const response = await api.get('/students/pg-listings', { params: filters })
      return response.data
    } catch (error) {
      return {
        pgListings: DEMO_PG_LISTINGS,
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalItems: DEMO_PG_LISTINGS.length,
          limit: DEMO_PG_LISTINGS.length
        }
      }
    }
  }
)

export const getPgListingById = createAsyncThunk(
  'pg/getPgListingById',
  async (id, { rejectWithValue }) => {
    if (import.meta?.env?.DEV) {
      const item = DEMO_PG_LISTINGS.find((p) => String(p.id) === String(id)) || DEMO_PG_LISTINGS[0]
      return item
    }
    try {
      const response = await api.get(`/students/pg-listings/${id}`)
      return response.data
    } catch (error) {
      const item = DEMO_PG_LISTINGS.find((p) => String(p.id) === String(id)) || DEMO_PG_LISTINGS[0]
      return item
    }
  }
)

export const addBookmark = createAsyncThunk(
  'pg/addBookmark',
  async (bookmarkData, { rejectWithValue }) => {
    try {
      const response = await api.post('/students/bookmarks', bookmarkData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add bookmark')
    }
  }
)

export const getBookmarks = createAsyncThunk(
  'pg/getBookmarks',
  async (type, { rejectWithValue }) => {
    try {
      const response = await api.get('/students/bookmarks', { params: { type } })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch bookmarks')
    }
  }
)

// Initial state
const initialState = {
  pgListings: [],
  currentPgListing: null,
  bookmarks: [],
  pagination: null,
  loading: false,
  error: null,
}

// PG slice
const pgSlice = createSlice({
  name: 'pg',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearCurrentPgListing: (state) => {
      state.currentPgListing = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Get PG Listings
      .addCase(getPgListings.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getPgListings.fulfilled, (state, action) => {
        state.loading = false
        state.pgListings = action.payload.pgListings
        state.pagination = action.payload.pagination
      })
      .addCase(getPgListings.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Get PG Listing by ID
      .addCase(getPgListingById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getPgListingById.fulfilled, (state, action) => {
        state.loading = false
        state.currentPgListing = action.payload
      })
      .addCase(getPgListingById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Add Bookmark
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.bookmarks.push(action.payload.bookmark)
      })
      
      // Get Bookmarks
      .addCase(getBookmarks.fulfilled, (state, action) => {
        state.bookmarks = action.payload
      })
  },
})

export const { clearError, clearCurrentPgListing } = pgSlice.actions
export default pgSlice.reducer
