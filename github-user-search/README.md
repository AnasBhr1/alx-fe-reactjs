# GitHub User Search

A modern React application for searching and exploring GitHub users built with Vite.

## 🚀 Features

- **User Search**: Search for GitHub users by username or keywords
- **User Profiles**: View detailed user information including bio, location, company
- **User Statistics**: Display follower count, following count, and repository count
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **GitHub API Integration**: Real-time data from the GitHub REST API
- **Modern UI**: Clean, GitHub-inspired interface with smooth animations

## 🛠️ Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and development server
- **Axios** - HTTP client for API requests
- **CSS3** - Styling with modern CSS features
- **GitHub REST API** - Data source

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation Steps

1. **Clone or create the project directory**:
   ```bash
   mkdir github-user-search
   cd github-user-search
   ```

2. **Initialize the project with Vite**:
   ```bash
   npm create vite@latest . -- --template react
   ```

3. **Install dependencies**:
   ```bash
   npm install axios
   ```

4. **Set up environment variables** (optional but recommended for higher rate limits):
   - Create a `.env` file in the root directory
   - Add your GitHub personal access token:
     ```
     VITE_APP_GITHUB_API_KEY=your_github_token_here
     ```
   - To get a token, visit: https://github.com/settings/tokens

5. **Start the development server**:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## 📁 Project Structure

```
github-user-search/
├── public/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── SearchBar.css
│   │   ├── UserCard.jsx
│   │   ├── UserCard.css
│   │   ├── UserList.jsx
│   │   └── UserList.css
│   ├── services/
│   │   └── githubService.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── .env
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Usage

1. **Search for Users**: Enter a GitHub username or keyword in the search bar
2. **View Results**: Browse through the list of matching users
3. **User Details**: Each user card displays:
   - Avatar and profile picture
   - Name and username
   - Bio (if available)
   - Company and location (if available)
   - Repository, follower, and following counts
4. **Visit Profiles**: Click "View Profile" to visit the user's GitHub profile

## 🔧 Configuration

### GitHub API Rate Limits
- **Without authentication**: 60 requests per hour
- **With personal access token**: 5,000 requests per hour

### Environment Variables
- `VITE_APP_GITHUB_API_KEY`: Your GitHub personal access token (optional)

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🚀 Build & Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

The built files will be in the `dist` directory and can be deployed to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- [GitHub API Documentation](https://docs.github.com/en/rest)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)

## 📞 Support

If you encounter any issues or have questions, please feel free to open an issue on the GitHub repository.