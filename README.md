# 🏡 RoomNook AI - Smart PG, Roommate & Mess Finder for Students

A comprehensive full-stack web application that helps university students find verified PGs, compatible roommates, and mess services using AI-powered compatibility matching.

## ✨ Features

- **Perfect Match Score™ System**: AI-powered compatibility scoring for PG, roommate, and mess combinations
- **Role-based Dashboards**: Separate interfaces for students, PG owners, and admins
- **AI Assistant**: Chat with an intelligent assistant for personalized recommendations
- **Verified Listings**: All PGs and mess services are verified by admin team
- **Advanced Filtering**: Search by location, budget, room type, food preferences, and more
- **Real-time Compatibility**: Calculate compatibility scores between students and roommates
- **Secure Authentication**: JWT-based authentication with role-based access control

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MySQL** database with Sequelize ORM
- **JWT** for authentication
- **bcrypt** for password hashing
- **Express Validator** for input validation

### Frontend
- **React.js** with Vite
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Formik & Yup** for form handling

## 📁 Project Structure

```
RoomNook-AI/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── authController.js      # Authentication logic
│   │   ├── studentController.js   # Student operations
│   │   ├── ownerController.js     # PG owner operations
│   │   ├── adminController.js     # Admin operations
│   │   └── aiController.js        # AI assistant logic
│   ├── middleware/
│   │   └── authMiddleware.js      # Authentication middleware
│   ├── models/
│   │   ├── Student.js             # Student model
│   │   ├── PgOwner.js             # PG owner model
│   │   ├── Admin.js               # Admin model
│   │   ├── PgListing.js          # PG listing model
│   │   ├── RoommateProfile.js     # Roommate profile model
│   │   ├── MessListing.js         # Mess listing model
│   │   ├── Review.js              # Review model
│   │   ├── Bookmark.js            # Bookmark model
│   │   └── index.js               # Model associations
│   ├── routes/
│   │   ├── authRoutes.js          # Authentication routes
│   │   ├── studentRoutes.js       # Student routes
│   │   ├── ownerRoutes.js         # Owner routes
│   │   ├── adminRoutes.js         # Admin routes
│   │   └── aiRoutes.js            # AI routes
│   ├── utils/
│   │   ├── compatibility.js        # Compatibility algorithms
│   │   └── matchScore.js          # Match scoring utilities
│   ├── package.json
│   ├── server.js                  # Main server file
│   └── env.example               # Environment variables template
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Navigation component
│   │   │   ├── Footer.jsx         # Footer component
│   │   │   └── ProtectedRoute.jsx # Route protection
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Landing page
│   │   │   ├── Login.jsx          # Login page
│   │   │   ├── Register.jsx       # Registration page
│   │   │   ├── StudentDashboard.jsx # Student dashboard
│   │   │   ├── OwnerDashboard.jsx # Owner dashboard
│   │   │   ├── AdminDashboard.jsx # Admin dashboard
│   │   │   ├── ChatAssistant.jsx  # AI assistant page
│   │   │   ├── Profile.jsx        # Profile page
│   │   │   ├── PgListings.jsx     # PG listings page
│   │   │   └── MessListings.jsx   # Mess listings page
│   │   ├── redux/
│   │   │   ├── store.js           # Redux store
│   │   │   └── slices/
│   │   │       ├── authSlice.js   # Authentication state
│   │   │       ├── pgSlice.js     # PG listings state
│   │   │       ├── messSlice.js   # Mess listings state
│   │   │       └── uiSlice.js     # UI state
│   │   ├── api/
│   │   │   └── axios.js           # API configuration
│   │   ├── App.jsx                # Main app component
│   │   ├── main.jsx               # App entry point
│   │   └── index.css              # Global styles
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── database/
    ├── schema.sql                 # Database schema
    ├── views.sql                  # Database views
    └── seed.sql                   # Sample data
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **MySQL** (v8.0 or higher) with password: `root`
- **npm** or **yarn**

### 1. Database Setup (Automated)

**Option A: Use the automated setup script (Recommended)**
```bash
# Run the database setup script
setup-database.bat
```

**Option B: Manual setup**
1. **Install MySQL** (if not already installed):
   - Download from [MySQL Official Website](https://dev.mysql.com/downloads/)
   - Or use XAMPP/WAMP for easy setup
   - Set password to `root` for easy setup

2. **Create Database**:
   ```sql
   CREATE DATABASE roomnook_ai;
   ```

3. **Run Schema and Seed Files**:
   ```bash
   # Using MySQL command line
   mysql -u root -proot roomnook_ai < database/schema.sql
   mysql -u root -proot roomnook_ai < database/views.sql
   mysql -u root -proot roomnook_ai < database/seed.sql
   ```

### 2. Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd RoomNook-AI/backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp env.example .env
   ```
   
   The `.env` file is already configured with the correct settings:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=root
   DB_NAME=roomnook_ai
   DB_PORT=3306
   JWT_SECRET=supersecretkey123456789
   JWT_EXPIRE=7d
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start the backend server**:
   ```bash
   npm run dev
   ```
   
   The backend will be running on `http://localhost:5000`

### 3. Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd RoomNook-AI/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   
   The frontend will be running on `http://localhost:3000`

## 🔧 Configuration

### Database Configuration

The application uses MySQL with Sequelize ORM. Key configuration points:

- **Host**: `localhost` (default)
- **Port**: `3306` (default)
- **Database**: `roomnook_ai`
- **User**: `root` (or your MySQL username)
- **Password**: Your MySQL password
- **Moderation fields**: `students` and `pg_owners` include an `is_blocked` flag for admin-controlled access
- **Location fields**: Listings use a single `location` column (city/neighborhood) alongside a full `address`
- **Mess pricing**: Mess services expose a `monthly_cost` column to streamline pricing filters

### Environment Variables

#### Backend (.env)
```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=roomnook_ai
DB_PORT=3306

# JWT
JWT_SECRET=supersecretkey123456789
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:3000
```

## 🎯 Usage

### For Students

1. **Register** as a student with your preferences
2. **Browse PG listings** with advanced filters
3. **Use AI Assistant** to get personalized recommendations
4. **Bookmark** your favorite listings
5. **Find compatible roommates** based on lifestyle preferences
6. **Review** PGs and mess services

### For PG Owners

1. **Register** as a PG owner
2. **Create PG listings** with detailed information
3. **Manage applications** from students
4. **Track performance** with analytics dashboard
5. **Respond to reviews** and feedback

### For Admins

1. **Login** with admin credentials
2. **Verify PG listings** and owner accounts
3. **Manage users** and moderate content
4. **View platform analytics** and statistics
5. **Handle reports** and disputes

## 🤖 AI Assistant Features

The AI Assistant uses the **Perfect Match Score™** system to provide recommendations:

- **Budget Compatibility**: Matches students with PGs within their budget range
- **Location Preference**: Finds listings in preferred locations
- **Lifestyle Matching**: Considers sleep schedules, cleanliness levels, and social preferences
- **Food Compatibility**: Matches dietary preferences with mess options
- **Roommate Compatibility**: Calculates compatibility scores between potential roommates

### Example Queries

- "Find me a PG under ₹6000 near Clement Town with vegetarian mess"
- "Show me compatible roommates for a night owl student"
- "What are the best PGs for a clean, studious student?"

## 🔐 Authentication

The application uses JWT-based authentication with role-based access control:

- **Students**: Can browse listings, use AI assistant, bookmark items
- **Owners**: Can create and manage PG listings
- **Admins**: Can verify listings and manage users

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register/student` - Student registration
- `POST /api/auth/register/owner` - Owner registration
- `POST /api/auth/login/student` - Student login
- `POST /api/auth/login/owner` - Owner login
- `POST /api/auth/login/admin` - Admin login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Students
- `GET /api/students/pg-listings` - Get PG listings
- `GET /api/students/pg-listings/:id` - Get PG listing by ID
- `GET /api/students/mess-listings` - Get mess listings
- `POST /api/students/bookmarks` - Add bookmark
- `GET /api/students/bookmarks` - Get bookmarks
- `POST /api/students/reviews` - Add review

### AI Assistant
- `POST /api/ai/assistant` - Chat with AI assistant
- `GET /api/ai/recommendations` - Get personalized recommendations
- `GET /api/ai/compatibility/:roommateId` - Get compatibility analysis
- `GET /api/ai/perfect-match-score` - Calculate Perfect Match Score™

### Owners
- `POST /api/owners/pg-listings` - Create PG listing
- `GET /api/owners/pg-listings` - Get owner's listings
- `PUT /api/owners/pg-listings/:id` - Update listing
- `DELETE /api/owners/pg-listings/:id` - Delete listing
- `GET /api/owners/dashboard` - Get dashboard stats

### Admin
- `GET /api/admin/dashboard` - Get admin dashboard
- `GET /api/admin/students` - Get all students
- `GET /api/admin/owners` - Get all owners
- `GET /api/admin/pg-listings` - Get all listings
- `PUT /api/admin/pg-listings/:id/verify` - Verify listing
- `PUT /api/admin/owners/:id/verify` - Verify owner

## 🧪 Testing

### Sample Data

The application comes with sample data including:

- **Students**: 4 sample student profiles with different preferences
- **PG Owners**: 3 verified PG owners
- **PG Listings**: 3 sample PG listings in different locations
- **Mess Listings**: 3 sample mess options
- **Reviews**: Sample reviews and ratings
- **Admin**: 1 admin account for testing

### 🧪 Test Credentials

The application comes with pre-configured test accounts:

#### Student Account
- **Email:** `rohan@email.com`
- **Password:** `password123`
- **Profile:** Computer Science student, budget ₹4000-8000, prefers Clement Town

#### PG Owner Account
- **Email:** `rajesh@email.com`
- **Password:** `password123`
- **Profile:** Verified PG owner with multiple listings

#### Admin Account
- **Email:** `admin@roomnook.com`
- **Password:** `password123`
- **Profile:** Super admin with full platform access

### 🎯 Quick Test Flow

1. **Register as Student:** Create a new student account
2. **Browse PGs:** Search and filter PG listings
3. **Use AI Assistant:** Ask "Find me a PG under ₹6000 near Clement Town"
4. **Bookmark Items:** Save your favorite PGs and mess services
5. **Login as Owner:** Manage PG listings and applications
6. **Login as Admin:** Verify listings and manage users

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Error**:
   - Check MySQL is running
   - Verify database credentials in `.env`
   - Ensure database `roomnook_ai` exists

2. **Port Already in Use**:
   - Change `PORT` in `.env` file
   - Kill existing processes using the port

3. **CORS Errors**:
   - Ensure `FRONTEND_URL` in `.env` matches your frontend URL
   - Check if both servers are running

4. **Authentication Issues**:
   - Clear browser localStorage
   - Check JWT_SECRET is set correctly

### Logs

- **Backend logs**: Check console output for detailed error messages
- **Frontend logs**: Check browser console for client-side errors
- **Database logs**: Check MySQL error logs for database issues

## 🔄 Development

### Adding New Features

1. **Backend**: Add new routes, controllers, and models as needed
2. **Frontend**: Create new components and pages
3. **Database**: Update schema and run migrations
4. **Testing**: Test with sample data and real scenarios

### Code Structure

- **Controllers**: Handle business logic and API responses
- **Models**: Define database schemas and relationships
- **Routes**: Define API endpoints and middleware
- **Components**: Reusable UI components
- **Pages**: Full page components
- **Redux**: State management and API calls

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:

- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

---

**Built with ❤️ for students by the RoomNook AI team**
