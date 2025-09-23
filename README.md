# Let Me AI That For You (LMAITFY)

A fun web application built with Next.js 14 that creates shareable links demonstrating how to ask AI assistants questions. The app simulates a user typing a question and shows them how to interact with ChatGPT.

## Features

- 🎭 **Animated Demonstrations**: Fake cursor movement and typewriter effects
- 🌓 **Theme Support**: Light, dark, and auto themes
- 🔗 **Shareable Links**: Generate links with custom questions and settings
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🌐 **Internationalization**: English and Vietnamese support
- ⚡ **Fast Performance**: Built with Next.js 14 App Router

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui + Radix UI
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd lmaitfy
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Home Page (/)

1. Enter a question in the textarea
2. Click "Generate Link"
3. Copy the generated shareable link

### Share Page (/share)

- Visit a generated link to see the animated demonstration
- Watch the fake cursor move and type the question
- Click the "Send" button when prompted to redirect to ChatGPT

### URL Parameters

- `q`: The question to demonstrate (required)
- `theme`: Theme preference (`light`, `dark`, `auto`)
- `s`: Animation speed multiplier (0.5 - 2.0)

Example: `/share?q=How%20to%20center%20a%20div&theme=dark&s=1.2`

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Home page
│   └── share/
│       └── page.tsx        # Share/demo page
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── providers/          # Context providers
│   ├── chat-layout.tsx     # Main layout component
│   ├── composer.tsx        # Chat input component
│   ├── fake-cursor.tsx     # Animated cursor
│   ├── header-bar.tsx      # Header with logo and theme
│   ├── theme-switcher.tsx  # Theme toggle component
│   └── typewriter.tsx      # Typing animation
└── lib/
    ├── i18n.ts            # Internationalization
    └── utils.ts           # Utility functions
```

## Development

### Building for Production

```bash
npm run build
```

### Running Production Build

```bash
npm start
```

### Linting

```bash
npm run lint
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings

### Manual Deployment

1. Build the project: `npm run build`
2. Upload the `.next` folder and other required files to your server
3. Install dependencies: `npm install --production`
4. Start the server: `npm start`

## Environment Variables

Create a `.env.local` file for any environment-specific settings:

```bash
# Example - no API keys needed for this project
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Screenshots

### Light Theme

![Light Theme Screenshot](./screenshots/light-theme.png)

### Dark Theme

![Dark Theme Screenshot](./screenshots/dark-theme.png)

## Acknowledgments

- Inspired by "Let Me Google That For You"
- Built with amazing tools from Vercel, Radix UI, and the React community
- UI components from [shadcn/ui](https://ui.shadcn.com)
