# 🌟 ITCrypto Dashboard

Welcome to **ITCrypto Dashboard**, your go-to web application for tracking the latest trends in the cryptocurrency market! Built with React and TypeScript, this sleek and responsive dashboard provides real-time data and insights into the world of cryptocurrencies using the powerful CoinGecko API.

## 🚀 Features

- **Real-time Market Data**: Stay updated with live prices, market caps, and 24-hour changes for top cryptocurrencies.
- **Interactive Charts**: Visualize price history with beautiful, interactive area charts.
- **Smart Search**: Quickly find your favorite cryptocurrencies with our intuitive search functionality.
- **Detailed Coin Analysis**: Dive deep into each cryptocurrency with comprehensive data, including:
  - Market statistics
  - Trading volume
  - Trust scores
  - Price changes
  - Historical data
- **Responsive Design**: Enjoy a seamless experience on both desktop and mobile devices.
- **Auto-refresh**: Data updates automatically every 15 minutes to keep you informed.
- **Local Caching**: Smart caching reduces API calls and enhances performance.

## 🛠️ Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Routing**: React Router
- **API**: CoinGecko
- **Code Quality**: Biome (Linting & Formatting)

## 📦 Installation

To get started with ITCrypto Dashboard, follow these simple steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/itcrypto-dashboard.git
   cd itcrypto-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

## 🔧 Configuration

The application is configured with several key files:

- **Vite Config**: For build tool and development server settings.
- **Tailwind Config**: Custom theme settings, including colors.
- **TypeScript Config**: Strict type checking and module resolution.
- **Biome Config**: Code style and linting rules.

## 🏗️ Project Structure

src/
├── components/        # Reusable React components
├── hooks/            # Custom React hooks
├── pages/            # Page components for routing
├── styles/           # Global styles
├── types/            # TypeScript type definitions
├── App.tsx           # Main application component
└── main.tsx          # Application entry point
```

## 🔄 Data Flow

1. The application fetches initial cryptocurrency data on load.
2. Real-time updates are handled through polling every 15 minutes.
3. Data is cached locally to improve performance and reduce API calls.
4. Interactive charts display weekly price data for the last 60 days.

## 🎨 UI Features

- **Dark Theme**: Optimized for cryptocurrency trading.
- **Interactive Price Charts**: Hover effects for detailed insights.
- **Responsive Grid Layouts**: Adapts to different screen sizes.
- **Custom Yellow Accent Color**: Highlights important data points.
- **Loading States and Error Handling**: User-friendly feedback during data fetching.

## 🙏 Acknowledgements

- **CoinGecko**: For providing the cryptocurrency data API.
- **Tailwind CSS**: For the utility-first CSS framework.
- **Recharts**: For the charting library.
- **The React Community**: For excellent tools and documentation.

## 📧 Contact

For any questions or suggestions, please open an issue in the GitHub repository or reach out via email.

---

  
