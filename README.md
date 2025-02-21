# TruthGuard - AI Fake News Detector

An AI-powered system that helps detect fake news by analyzing news content and URLs.

## Features

- Real-time news content analysis
- URL credibility checking
- Detailed authenticity scoring
- Warning signs detection
- Confidence level assessment
- Beautiful and responsive UI

## Tech Stack

- Frontend: HTML, JavaScript, TailwindCSS
- Backend: Node.js, Express
- AI: Groq API (Mixtral-8x7b-32768 model)

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/truthguard.git
cd truthguard
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Groq API key:
```env
GROQ_API_KEY=your_groq_api_key_here
```

4. Start the server:
```bash
npm start
```

5. Open `index.html` in your browser

## Environment Variables

Create a `.env` file with the following:

- `GROQ_API_KEY`: Your Groq API key

## Contributing

Feel free to open issues and pull requests! 