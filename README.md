# Instagram Reel Analyzer

A React application that analyzes Instagram Reels and provides detailed insights including engagement metrics, creator information, and content analysis.

## Features

- **Real Data Mode**: Uses Apify API to fetch actual Instagram data
- **Demo Mode**: Uses mock data for testing and demonstration
- **Engagement Analytics**: Shows likes, comments, shares, and engagement rates
- **Creator Insights**: Displays creator profile information
- **Content Analysis**: Analyzes captions, hashtags, and music

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   The app will automatically open at `http://localhost:3000`

## Usage

### Demo Mode (Default)
- Simply paste any Instagram Reel URL and click "Analyze"
- Uses mock data for demonstration purposes

### Real Data Mode
1. Toggle "Enable Real Data (Apify)" in settings
2. Get an Apify API token from [apify.com](https://apify.com)
3. Paste your API token in the settings
4. Analyze public Instagram Reels with real data

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Technologies Used

- React 18
- Vite (build tool)
- Tailwind CSS (styling)
- Lucide React (icons)
- Apify API (data scraping)

## Notes

- Real data mode only works with public Instagram profiles
- Some metrics (reach, shares) are private and not available via scraping
- The app respects Instagram's terms of service by only accessing public data