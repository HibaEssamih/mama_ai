#!/bin/bash

# Quick Demo Test Script
# Run this to verify everything works before recording

echo "🎯 MAMA AI - Hackathon Demo Quick Test"
echo "========================================"
echo ""

# Check if server is running
echo "1. Testing server..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Server is running"
else
    echo "❌ Server not running - Start with: npm run dev"
    exit 1
fi

# Test WhatsApp API
echo ""
echo "2. Testing WhatsApp API..."
node -e "
const phoneId = '970347606167493';
const token = 'EAAmwu4vIC4YBQk6WmbyggjmWFOW1uByMOold4Eg22xtddQZAOWGFxVMT89j5lp4s1dDva24Tgw0wEUppD9WHUGZC5CeaGDWy9Us4xIUuKbY1roVetBKRucLQ0Yhl0prB5DtmNWVZCmHVkXZBCZAhHmY9kEa3yZChP9YsTXZBDnIuy0RZCFZCcYn4JpWT542LKiAKoPRFfV6wTevEsO2J6zGAzdFcRU7a9uPnDZB7aHcPw6htljX4aq4K3l5qSLQEO96b9ZCguyAfgUHUsbVSTOQRA4qWEgZCZAAZDZD';
const to = '212693157659';

console.log('📱 Sending test message to +212693157659...');

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
    text: { body: '🧸 Mama AI Demo Test - If you receive this, the system is working!' },
  }),
})
.then(async (r) => {
  if (r.status === 200) {
    console.log('✅ WhatsApp API working - Message sent!');
    console.log('📱 Check phone +212693157659 for test message');
  } else {
    console.log('⚠️  API responded with status:', r.status);
    const data = await r.json();
    console.log('Response:', JSON.stringify(data, null, 2));
  }
})
.catch((e) => {
  console.log('❌ WhatsApp API error:', e.message);
});
"

echo ""
echo "3. Opening demo pages..."
echo "   - Dashboard: http://localhost:3000/dashboard"
echo "   - Analytics: http://localhost:3000/dashboard/analytics"
echo "   - New Patient: http://localhost:3000/dashboard/patients/new"
echo ""

# Open browser tabs (Mac)
if [[ "$OSTYPE" == "darwin"* ]]; then
    open http://localhost:3000/dashboard
    sleep 1
    open http://localhost:3000/dashboard/analytics
    sleep 1
    open http://localhost:3000/dashboard/patients/new
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open http://localhost:3000/dashboard &
    sleep 1
    xdg-open http://localhost:3000/dashboard/analytics &
    sleep 1
    xdg-open http://localhost:3000/dashboard/patients/new &
fi

echo ""
echo "✅ Demo setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Check WhatsApp on +212693157659 for test message"
echo "2. Register test patient with verified number"
echo "3. Send symptom message from patient phone"
echo "4. Check dashboard for updates"
echo "5. Start recording your demo!"
echo ""
echo "🎬 Good luck with your hackathon! 🍀"
