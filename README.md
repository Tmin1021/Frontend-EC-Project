├── public/                      # Static assets like logo, favicon, manifest...
│   └── logo.svg
│
├── src/                         # Main source code folder
│   ├── assets/                 # Project-wide images, thumbnails, etc.
│   ├── components/             # Reusable components across the app
│   │   ├── custom/             # Custom-built reusable components (e.g., Header, Footer)
│   │   └── ui/                 # UI components from external libraries (e.g., MUI, Shadcn)
│   │
│   ├── pages/                  # Each folder here represents a page/view in the app
│   │   ├── Home/               # Example: Home page
│   │   │   ├── components/     # Components specific to Home only
│   │   │   └── index.jsx       # Entry file for the Home page
│   │   ├── Cart/
│   │   ├── Dashboard/
│   │   └── etc...
│   │
│   └── service/                # API calls, business logic, and controller-like functions
│
├── .env.local                  # Environment-specific variables (e.g., API keys, URLs)
├── package.json                # Project metadata and scripts
├── vite.config.js              # Vite configuration
└── README.md                  
