# PurpleRain™ Admin Panel - Sales CRM

A modern, responsive admin panel for managing Twitter-based sales leads and intern performance. Built with Next.js, TypeScript, and Tailwind CSS.

## 🎯 Project Overview

This admin panel is designed for sales managers to:

- **View all leads** from Twitter-based outreach campaigns
- **Filter and search** leads by various criteria
- **Manage intern access** and performance
- **Track engagement scores** and conversion rates
- **Export data** for analysis

## 🚀 Features

### Lead Management

- **Card-based layout** for easy scanning of lead information
- **Advanced filtering** by status, source, engagement score, and more
- **Search functionality** across names, companies, and Twitter handles
- **Pagination** for handling large datasets (1000+ leads)
- **Export to CSV** for data analysis

### Visual Design

- **PurpleRain™ theme** with custom color palette
- **Responsive design** that works on all devices
- **Smooth animations** using Framer Motion
- **Accessible UI** with keyboard navigation support
- **Dark mode** optimized interface

### Performance

- **Optimized for large datasets** with efficient filtering
- **Lazy loading** and pagination
- **Smooth transitions** and animations
- **Mobile-first** responsive design

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom PurpleRain™ theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Custom shadcn/ui-inspired components

## 🎨 Design System

### Colors

- **Background**: `#0f0f0f` (primary), `#1a1a1a` (secondary)
- **Text**: `#f5f5f5` (primary), `#a0a0a0` (secondary)
- **Accent**: `#9e5eff` (PurpleRain™ purple)
- **Borders**: `#2a2a2a`

### Typography

- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components

- **Buttons**: Soft shadows, large radius (rounded-2xl), hover animations
- **Cards**: Clean borders, subtle shadows, hover effects
- **Inputs**: Rounded corners, focus states with accent color
- **Badges**: Status indicators with semantic colors

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── globals.css        # Global styles and theme
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main admin panel page
├── components/            # React components
│   ├── ui/               # Base UI components
│   │   ├── button.tsx    # Button component
│   │   ├── card.tsx      # Card component
│   │   ├── input.tsx     # Input component
│   │   └── badge.tsx     # Badge component
│   ├── LeadCard.tsx      # Individual lead display
│   ├── FilterBar.tsx     # Search and filter interface
│   └── LeadsView.tsx     # Main leads management view
├── data/                 # Mock data and types
│   └── mockLeads.ts      # Sample leads and interns data
└── lib/                  # Utilities
    └── utils.ts          # Helper functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd admin-crm
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📊 Mock Data

The application includes realistic mock data for testing:

- **8 sample leads** with various statuses and engagement scores
- **3 intern profiles** with performance metrics
- **Multiple lead sources**: Twitter search, engagement, referrals
- **Realistic engagement scores** and contact information

## 🎯 Key Components

### LeadCard

Displays individual lead information in a clean card format:

- Name, Twitter handle, company
- Status badge with color coding
- Engagement score with visual indicator
- Tags and notes
- Action buttons (Edit, Assign)

### FilterBar

Advanced filtering and search capabilities:

- Text search across multiple fields
- Status and source filters
- Engagement score range
- Clear filters functionality
- Results counter

### LeadsView

Main interface for lead management:

- Grid layout with responsive design
- Pagination for large datasets
- Export functionality
- Add new lead button
- Empty state handling

## 🔧 Customization

### Adding New Lead Statuses

1. Update the `Lead` interface in `mockLeads.ts`
2. Add new status to `statusOptions` in `FilterBar.tsx`
3. Update `statusColors` mapping

### Modifying the Theme

1. Edit colors in `tailwind.config.ts`
2. Update component styles as needed
3. Modify global CSS in `globals.css`

### Adding New Filters

1. Extend the `FilterState` interface
2. Add filter logic in `LeadsView.tsx`
3. Update the `FilterBar` component

## 📱 Mobile Responsiveness

The admin panel is fully responsive with:

- **Mobile-first** design approach
- **Flexible grid layouts** that adapt to screen size
- **Touch-friendly** buttons and interactions
- **Optimized typography** for small screens
- **Collapsible filters** for mobile devices

## 🔮 Future Enhancements

- **Real-time updates** with WebSocket integration
- **Advanced analytics** dashboard
- **Bulk operations** for lead management
- **Integration** with Twitter API
- **User authentication** and role-based access
- **Notification system** for new leads
- **Advanced reporting** and insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary to PurpleRain™ Tech.

---

Built with ❤️ for sales teams that need powerful, intuitive lead management tools.
