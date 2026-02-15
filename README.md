<div align="center">
  <h1>🤰 MamaGuard AI</h1>
  <p><strong>AI-Powered Maternal Health Monitoring System</strong></p>
  
  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#documentation">Documentation</a> •
    <a href="#deployment">Deployment</a>
  </p>

  ![License](https://img.shields.io/badge/license-MIT-blue.svg)
  ![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
  ![React](https://img.shields.io/badge/React-19.2.3-61dafb)
</div>

---

## 📖 Overview

**MamaGuard AI** is an innovative maternal health monitoring platform that leverages AI and voice technology to provide 24/7 support for expectant mothers in Morocco. The system combines WhatsApp-based conversational AI with a comprehensive clinical dashboard for healthcare providers.

### 🎯 Mission

Reduce maternal mortality rates by providing accessible, AI-powered health monitoring and real-time risk assessment through familiar communication channels.

### 🌟 Key Highlights

- 🗣️ **Voice-First Interface** - Natural language interactions in Darija (Moroccan Arabic)
- 🤖 **AI-Powered Triage** - Intelligent risk assessment and symptom analysis
- 📱 **WhatsApp Integration** - Accessible through the world's most popular messaging platform
- 👨‍⚕️ **Clinical Dashboard** - Real-time patient monitoring for healthcare providers
- 🔔 **Smart Alerts** - Automated notifications for critical situations
- 📊 **Analytics & Insights** - Comprehensive health tracking and trend analysis

---

## ✨ Features

### For Patients

- **24/7 Voice Support** - Speak naturally in Darija or French
- **Symptom Tracking** - Report symptoms via voice or text messages
- **Health Education** - Receive personalized pregnancy guidance
- **Appointment Reminders** - Automated scheduling and notifications
- **Emergency Protocols** - Immediate escalation for critical symptoms

### For Healthcare Providers

- **Real-Time Dashboard** - Monitor all patients at a glance
- **Risk Stratification** - Automatic categorization (Critical/Warning/Stable)
- **AI Recommendations** - Clinical insights and suggested actions
- **Patient Profiles** - Comprehensive medical history and trends
- **Voice Timeline** - Review all patient interactions
- **Quick Actions** - One-click call, dispatch, or schedule

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first styling
- **[Shadcn/ui](https://ui.shadcn.com/)** - Accessible component library
- **[Recharts](https://recharts.org/)** - Data visualization

### Backend & Infrastructure
- **[Supabase](https://supabase.com/)** - PostgreSQL database, authentication, and real-time subscriptions
- **[OpenAI](https://openai.com/)** - GPT-4 for conversational AI
- **[Minimax API](https://www.minimaxi.com/)** - Voice synthesis and transcription
- **[WhatsApp Business API](https://business.whatsapp.com/)** - Messaging integration

### Development Tools
- **ESLint** - Code linting
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Lucide React** - Icon library

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **npm** or **yarn** package manager
- **Supabase** account
- **OpenAI** API key
- **Minimax** API key (for voice)
- **WhatsApp Business** account (optional, for production)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mama-ai.git
   cd mama-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # OpenAI
   OPENAI_API_KEY=your_openai_api_key
   
   # Minimax (Voice)
   MINIMAX_API_KEY=your_minimax_api_key
   MINIMAX_GROUP_ID=your_group_id
   
   # WhatsApp (Production)
   WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
   WHATSAPP_ACCESS_TOKEN=your_access_token
   WHATSAPP_VERIFY_TOKEN=your_verify_token
   ```

4. **Set up the database**
   
   Run the SQL schema in your Supabase project:
   ```bash
   # Copy the contents of schema.sql and run it in Supabase SQL Editor
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
mama_ai/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Marketing pages
│   │   └── page.tsx              # Landing page
│   ├── dashboard/                # Clinical dashboard
│   │   ├── page.tsx              # Triage board
│   │   ├── patients/             # Patient management
│   │   ├── analytics/            # Analytics & reports
│   │   └── onboarding/           # Patient onboarding
│   ├── api/                      # API routes
│   │   ├── webhook/              # WhatsApp webhook
│   │   ├── whatsapp/             # WhatsApp utilities
│   │   └── welcome-audio/        # Audio generation
│   ├── actions/                  # Server actions
│   ├── login/                    # Authentication
│   └── layout.tsx                # Root layout
│
├── components/                   # React components
│   ├── common/                   # Shared components
│   ├── dashboard/                # Dashboard components
│   ├── patient/                  # Patient detail components
│   ├── patient-management/       # Patient list components
│   ├── sections/                 # Landing page sections
│   └── ui/                       # Reusable UI primitives
│
├── lib/                          # Utilities & helpers
│   ├── constants.ts              # App constants
│   ├── generateMamaResponse.ts   # AI response generation
│   ├── transcribe.ts             # Voice transcription
│   ├── speak.ts                  # Text-to-speech
│   ├── phoneUtils.ts             # Phone number utilities
│   └── utils.ts                  # Common helpers
│
├── types/                        # TypeScript definitions
│   └── index.ts                  # Shared types
│
├── hooks/                        # Custom React hooks
│   └── use-toast.ts              # Toast notifications
│
├── utils/                        # External integrations
│   └── supabase/                 # Supabase client setup
│
├── public/                       # Static assets
│
└── schema.sql                    # Database schema
```

---

## 🔗 Application Routes

### Public Routes
```
/                               → Landing page
/login                          → Healthcare provider login
/register                       → Provider registration
```

### Protected Routes (Dashboard)
```
/dashboard                      → Triage board overview
/dashboard/patients             → Patient management list
/dashboard/patients/[id]        → Individual patient profile
/dashboard/analytics            → Analytics & reports
/dashboard/onboarding           → Patient onboarding form
```

### API Routes
```
/api/webhook                    → WhatsApp webhook handler
/api/whatsapp/send              → Send WhatsApp messages
/api/welcome-audio              → Generate welcome audio
```

---

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

### Code Structure Guidelines

- **Components**: Keep components small and focused
- **Server Actions**: Use for data mutations (`app/actions/`)
- **API Routes**: Only for external webhooks (`app/api/`)
- **Types**: Centralize shared types in `types/index.ts`
- **Utilities**: Pure functions in `lib/`

### Testing the WhatsApp Integration

See [WHATSAPP_TESTING_GUIDE.md](WHATSAPP_TESTING_GUIDE.md) for detailed instructions.

---

## 📊 Database Schema

### Core Tables

- **`patients`** - Patient demographic and medical information
- **`conversations`** - WhatsApp conversation threads
- **`messages`** - Individual messages (voice and text)
- **`symptoms`** - Reported symptoms and severity
- **`checkups`** - Scheduled and completed appointments

See [schema.sql](schema.sql) for the complete database schema.

---

## 🔌 API Integration

### WhatsApp Webhook

The application receives WhatsApp messages via webhook:

```typescript
// app/api/webhook/route.ts
POST /api/webhook
- Verifies WhatsApp webhook token
- Processes incoming voice/text messages
- Triggers AI response generation
- Stores conversation history
```

### AI Response Generation

```typescript
// lib/generateMamaResponse.ts
- Analyzes patient symptoms
- Assesses risk level
- Generates contextual responses in Darija
- Escalates to healthcare providers if needed
```

### Voice Processing

```typescript
// lib/transcribe.ts
- Converts voice messages to text
- Supports Darija and French

// lib/speak.ts
- Converts text responses to natural speech
- Uses Minimax TTS API
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import to Vercel**
   ```bash
   # Install Vercel CLI (optional)
   npm i -g vercel
   
   # Deploy
   vercel
   ```

3. **Set environment variables** in Vercel dashboard

4. **Configure WhatsApp webhook** to point to your Vercel URL
   ```
   https://your-app.vercel.app/api/webhook
   ```

### Environment Variables

Ensure all required environment variables are set in your deployment platform:

```bash
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
OPENAI_API_KEY
MINIMAX_API_KEY
MINIMAX_GROUP_ID
WHATSAPP_PHONE_NUMBER_ID
WHATSAPP_ACCESS_TOKEN
WHATSAPP_VERIFY_TOKEN
```

### Build Optimization

- Next.js automatically optimizes images
- Tailwind CSS purges unused styles
- TypeScript ensures type safety at build time

---

## 📚 Documentation

Additional documentation is available in the following files:

- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Detailed project organization
- **[DASHBOARD_README.md](DASHBOARD_README.md)** - Dashboard feature guide
- **[PATIENT_PROFILE_GUIDE.md](PATIENT_PROFILE_GUIDE.md)** - Patient profile components
- **[WHATSAPP_TESTING_GUIDE.md](WHATSAPP_TESTING_GUIDE.md)** - WhatsApp integration testing
- **[ACCESSIBILITY_IMPROVEMENTS.md](ACCESSIBILITY_IMPROVEMENTS.md)** - A11y checklist
- **[UX_IMPROVEMENTS.md](UX_IMPROVEMENTS.md)** - UX enhancements
- **[DEMO_SETUP.md](DEMO_SETUP.md)** - Demo environment setup

---

## 🧪 Testing

### Manual Testing

1. **Landing Page**
   - Test responsive design across devices
   - Verify all navigation links work
   - Check form validation

2. **Dashboard**
   - Test patient filtering and search
   - Verify risk level categorization
   - Check quick action buttons

3. **WhatsApp Integration**
   - Send voice messages
   - Test symptom reporting
   - Verify AI responses

### Demo Script

Run the included demo script to test basic functionality:

```bash
chmod +x test-demo.sh
./test-demo.sh
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow TypeScript best practices
   - Use existing component patterns
   - Add proper type definitions

4. **Test your changes**
   ```bash
   npm run lint
   npm run build
   ```

5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**

### Code Style

- Use **TypeScript** for all new files
- Follow the existing **component structure**
- Use **Tailwind CSS** for styling
- Ensure **accessibility** (ARIA labels, keyboard navigation)
- Write **descriptive commit messages**

---

## 🔒 Security & Privacy

- **HIPAA Compliance**: Patient data is encrypted at rest and in transit
- **Authentication**: Supabase Auth with Row Level Security (RLS)
- **Data Privacy**: No patient data is stored in log files
- **Secure Communication**: All API calls use HTTPS
- **Access Control**: Role-based permissions for healthcare providers

---

## 🐛 Known Issues

- **Build Memory**: Production builds may fail on machines with < 4GB RAM
  - **Solution**: Use development mode or deploy to Vercel/Netlify
  
- **WhatsApp Webhook**: Requires public HTTPS endpoint
  - **Solution**: Use ngrok for local testing or deploy to production

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Zakaria** - *Initial work*

---

## 🙏 Acknowledgments

- **OpenAI** - GPT-4 conversational AI
- **Minimax** - Voice synthesis and transcription
- **Supabase** - Backend infrastructure
- **Shadcn/ui** - Component library
- **Vercel** - Deployment platform
- **Meta** - WhatsApp Business API

---

## 📞 Support

For questions or support:

- 📧 Email: support@mamaguard.com
- 📖 Documentation: [docs.mamaguard.com](https://docs.mamaguard.com)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/mama-ai/issues)

---

<div align="center">
  <p>Made with ❤️ for expectant mothers in Morocco</p>
  <p>
    <a href="#top">Back to Top ↑</a>
  </p>
</div>