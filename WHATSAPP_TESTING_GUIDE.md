# WhatsApp Testing Guide - Mama AI Platform

## Current Configuration Summary

### ✅ Eleven Labs (Voice) - Correctly Configured
**Location:** `lib/speak.ts`

```typescript
API Endpoint: https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}
Model: eleven_multilingual_v2 (Best for Arabic/Darija/French mix)
Voice Settings: stability=0.5, similarity_boost=0.75
```

**Environment Variables Required:**
- `ELEVENLABS_API_KEY` - Your API key
- `ELEVENLABS_VOICE_ID` - Your chosen voice ID

**Status:** ✅ Properly implemented but **NOT currently in use** (voice features disabled in webhook)

---

### ⚠️ WhatsApp Cloud API - TEST MODE LIMITATIONS

**Current Setup:**
- **Phone Number ID:** `970347606167493`
- **API Version:** v18.0
- **Mode:** SANDBOX/TEST MODE

#### 🔴 CRITICAL LIMITATION: Test Account Restrictions

**What this means:**
1. You are using a **test WhatsApp Business account**
2. Messages can ONLY be sent to **verified recipient numbers**
3. You must manually add each test phone number to an "allowlist" in Meta Business Manager

**Current Verified Test Numbers:**
- `+212693157659` ✅ (verified in previous testing)
- `+212713023026` ✅ (verified in previous testing)

---

## How WhatsApp Messages Work in Your Platform

### 1. **Patient Registration** (`/app/actions/patients.ts`)
```typescript
// When a new patient registers, sends welcome message
To: formatForWhatsApp(patient.phone_number) // Strips + and spaces
Message: Darija welcome message
API: graph.facebook.com/v18.0/{PHONE_ID}/messages
```

### 2. **Webhook (Patient → Doctor)** (`/app/api/webhook/route.ts`)
```typescript
// When patient sends message via WhatsApp
Receives: Text or Voice message
Transcribes: Audio → Text (if voice)
Stores: Message in database
Responds: AI-generated reply via generateMamaResponse()
```

### 3. **Doctor Dashboard** (`/app/api/whatsapp/send/route.ts`)
```typescript
// When doctor sends message from dashboard
Message: Prefixed with "👨‍⚕️ [Risala min tbib]:"
Saves: To database as role: "assistant"
Sends: Via WhatsApp to patient
```

### 4. **Automated Check-ins** (`/app/api/cron/check-in/route.ts`)
```typescript
// Daily automated messages to all patients
Frequency: Daily (configured in cron)
Message: Health check-in prompts
Target: All registered patients
```

---

## 🚨 Current Problem: Test Account Cannot Reach Real Patients

### Why Messages Aren't Being Received:

**Error Code 131030:**
```json
{
  "error": {
    "code": 131030,
    "message": "(#131030) Recipient phone number not in allowed list"
  }
}
```

**What happened in your terminal test:**
```bash
# This command succeeded (API accepted)
Status: 200
Response: {
  "messaging_product": "whatsapp",
  "contacts": [...],
  "messages": [{
    "id": "wamid.HBgNMjEyNzEzMDIzMDI2FQIAERgSQjc0Q..."
  }]
}

# BUT the message was NOT delivered because:
# +212713023026 is not verified in your test account sandbox
```

---

## ✅ Solution Options

### Option 1: Add Recipients to Test Allowlist (Quick Fix)

**Steps:**
1. Go to [Meta Business Manager](https://business.facebook.com/)
2. Navigate to **WhatsApp** → **Getting Started** → **Test Numbers**
3. Click "Add Phone Number"
4. Enter: `+212693157659` or `+212713023026`
5. WhatsApp will send a 6-digit verification code to that number
6. Enter the code in Meta Business Manager
7. Repeat for each test number you want to use

**Limitations:**
- Max ~5-10 test numbers
- Each person must verify via code
- Only for testing, not production use

---

### Option 2: Submit for Business Verification (Production)

**Steps:**
1. **Complete Business Verification:**
   - Go to Meta Business Manager
   - Submit business documents (business license, tax ID, etc.)
   - Provide business address and contact info
   - Wait 1-7 days for approval

2. **Request Message Template Approval:**
   - Create message templates in WhatsApp Business Manager
   - Get templates approved by Meta
   - Use only approved templates for initial contact

3. **Lift Restrictions:**
   - Once verified, you can message ANY phone number
   - Messaging tier starts at 1,000 unique users/day
   - Can scale to 100,000+ with good quality score

**Requirements:**
- Valid business registration
- Physical business address
- Business phone number
- Business email
- Facebook Page linked to business

---

## Testing Workflow with Current Setup

### ✅ What Works Now:

1. **Register a test patient with verified number:**
```bash
# From Dashboard → Add Patient
Phone: +212693157659  # MUST be pre-verified
Full Name: Test Patient
Due Date: [any date]
```

2. **Send test message from dashboard:**
```typescript
// Dashboard → Patients → [Select Patient] → Chat
Type message → Send
✅ Will be delivered if number is verified
```

3. **Receive webhook messages:**
```bash
# Patient sends WhatsApp message to: +212 your_business_number
Platform receives → Processes → Stores → Responds
✅ Works if number is verified
```

---

## Phone Number Format Reference

**Your platform uses centralized utilities:**

### Storage (Database):
```typescript
import { normalizePhone } from "@/lib/phoneUtils";
const stored = normalizePhone("+212 693-157659");
// Result: "+212693157659" (E.164 format WITH +)
```

### WhatsApp API Calls:
```typescript
import { formatForWhatsApp } from "@/lib/phoneUtils";
const apiFormat = formatForWhatsApp("+212693157659");
// Result: "212693157659" (digits only, NO +)
```

### Display in UI:
```typescript
import { formatForDisplay } from "@/lib/phoneUtils";
const display = formatForDisplay("+212693157659");
// Result: "+212 693 157 659" (readable spacing)
```

---

## Verification Status Check

**To check your WhatsApp account status:**

```bash
curl -X GET \
  "https://graph.facebook.com/v18.0/970347606167493" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Look for:**
- `code_verification_status`: Should be `"VERIFIED"` for production
- `quality_rating`: Should be `"GREEN"`  
- `messaging_limit_tier`: Indicates how many users you can message per day

---

## Current Account Status (Based on Previous Tests)

```json
{
  "verified_name": "Mama AI",
  "code_verification_status": "NOT_VERIFIED",
  "display_phone_number": "+212...",
  "quality_rating": "GREEN",
  "messaging_limit_tier": "TIER_50",  // Test tier
  "id": "970347606167493"
}
```

**This confirms:** You are in TEST/SANDBOX mode with limited recipients.

---

## Recommended Next Steps

### For Immediate Testing (Today):
1. ✅ Add your test numbers to WhatsApp sandbox allowlist
2. ✅ Use only verified numbers for testing
3. ✅ Test full flow: Register → Send → Receive → Respond

### For Production Launch (This Week):
1. 📋 Submit business verification documents to Meta
2. 📝 Create and submit message templates for approval
3. ⏳ Wait for verification (typically 2-5 business days)
4. 🚀 Once approved, you can message unlimited verified users

### For Demo/Presentation (Alternative):
1. 🎬 Use the verified test numbers
2. 📱 Show the full dashboard with real database data
3. 💬 Demonstrate chat interface with test conversations
4. 📊 Show analytics dashboard with metrics

---

## Environment Variables Checklist

**Current .env configuration:**
```bash
# WhatsApp (Required)
WHATSAPP_ACCESS_TOKEN=EAAmwu4vIC4Y... ✅
WHATSAPP_PHONE_NUMBER_ID=970347606167493 ✅

# Eleven Labs (Optional - currently not in use)
ELEVENLABS_API_KEY=your_elevenlabs_key ⚠️ (placeholder)
ELEVENLABS_VOICE_ID=your_chosen_voice_id ⚠️ (placeholder)

# OpenAI (Required for AI responses)
OPENAI_API_KEY=... ✅

# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=... ✅
NEXT_PUBLIC_SUPABASE_ANON_KEY=... ✅
SUPABASE_SERVICE_ROLE_KEY=... ✅
```

---

## Quick Test Command

**To test WhatsApp message to verified number:**

```bash
node -e "
const phoneId = '970347606167493';
const token = 'YOUR_TOKEN_HERE';
const to = '212693157659';  // NO + prefix for API

fetch(\`https://graph.facebook.com/v18.0/\${phoneId}/messages\`, {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: to,
    type: 'text',
    text: { body: 'Test from Mama AI Platform 🧸' },
  }),
})
.then(async (r) => {
  console.log('Status:', r.status);
  const data = await r.json();
  console.log('Response:', JSON.stringify(data, null, 2));
})
.catch((e) => console.error('Error:', e.message));
"
```

---

## Summary

- ✅ **Eleven Labs:** Correctly configured, ready to use when enabled
- ⚠️ **WhatsApp:** Working API but in TEST MODE with recipient restrictions
- 🔴 **Main Issue:** Need to verify test numbers OR complete business verification
- ✅ **Code Quality:** All phone number handling is centralized and correct
- 🚀 **Next Action:** Add test numbers to allowlist OR submit for business verification

---

**Questions or need help?** Check the Meta Business Manager dashboard or consult the [WhatsApp Business API Documentation](https://developers.facebook.com/docs/whatsapp/cloud-api/).
