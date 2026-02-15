# 📱 Phone Number Handling - Best Practices Guide

## 🎯 **Design Principles**

### **The Three Formats Rule**
Your codebase should use exactly 3 phone number formats, each for a specific purpose:

| Format | Purpose | Example | Where Used |
|--------|---------|---------|------------|
| **E.164 with `+`** | Database storage | `+212612345678` | Database columns, data transfer |
| **E.164 without `+`** | WhatsApp API | `212612345678` | API requests to Meta/WhatsApp |
| **Display format** | UI/Human readable | `+212 612 345 678` | User interfaces, reports |

---

## 🔧 **Implementation Checklist**

### ✅ **What You Should Do**

1. **Store phone numbers in E.164 format WITH `+`**
   ```typescript
   // ✅ CORRECT
   phone_number: "+212612345678"
   
   // ❌ WRONG
   phone_number: "0612345678"  // Missing country code
   phone_number: "212612345678"  // Missing +
   phone_number: "+212 612 345 678"  // Has spaces (not normalized)
   ```

2. **Always normalize on input**
   ```typescript
   import { normalizePhone } from "@/lib/phoneUtils";
   
   // ✅ User enters: "612 345 678" with country code "+212"
   const normalized = normalizePhone(phone, countryCode);
   // Result: "+212612345678"
   
   // ✅ Save to database
   await supabase.from("patients").insert({
     phone_number: normalized
   });
   ```

3. **Strip `+` only when sending to WhatsApp API**
   ```typescript
   import { formatForWhatsApp } from "@/lib/phoneUtils";
   
   // ✅ Fetch from database (has +)
   const patient = await supabase.from("patients")...
   const dbPhone = patient.phone_number; // "+212612345678"
   
   // ✅ Format for WhatsApp
   const whatsappPhone = formatForWhatsApp(dbPhone); // "212612345678"
   
   // ✅ Send
   await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
     body: JSON.stringify({
       to: whatsappPhone,  // No +
       ...
     })
   });
   ```

4. **Normalize incoming webhook phone numbers**
   ```typescript
   // WhatsApp sends: may or may not include +
   const senderPhone = messageObj.from; // Could be "212612345678" or "+212612345678"
   
   // ✅ Normalize before DB lookup
   const normalized = normalizePhone(senderPhone);
   
   const { data: patient } = await supabase
     .from("patients")
     .eq("phone_number", normalized)  // Now matches!
     .single();
   ```

5. **Use display formatting in UI**
   ```typescript
   import { formatForDisplay } from "@/lib/phoneUtils";
   
   // ✅ In React component
   <p>Phone: {formatForDisplay(patient.phone_number)}</p>
   // Displays: "+212 612 345 678" (readable)
   ```

---

## 🚨 **Common Mistakes to Avoid**

### ❌ **Don't Do These**

1. **Storing phone numbers without country code**
   ```typescript
   // ❌ BAD - Can't determine country
   phone_number: "0612345678"
   ```

2. **Storing with inconsistent formats**
   ```typescript
   // ❌ Database has mixed formats:
   patient1: "+212612345678"  // Has +
   patient2: "212612345678"   // No +
   patient3: "0612345678"     // No country code
   // Results in failed lookups!
   ```

3. **Sending to WhatsApp with `+` symbol**
   ```typescript
   // ❌ WhatsApp API will reject this
   to: "+212612345678"
   
   // ✅ Correct
   to: "212612345678"
   ```

4. **Not normalizing webhook incoming numbers**
   ```typescript
   // ❌ Direct comparison will fail if formats don't match
   .eq("phone_number", messageObj.from)
   
   // ✅ Normalize first
   .eq("phone_number", normalizePhone(messageObj.from))
   ```

5. **Hardcoding country-specific formatting**
   ```typescript
   // ❌ Only works for one country
   const formatted = `+212 ${phone.slice(0,3)} ${phone.slice(3,6)} ${phone.slice(6)}`;
   
   // ✅ Use utility function that handles multiple countries
   const formatted = formatForDisplay(phone);
   ```

---

## 🔄 **Refactoring Guide**

### **Step 1: Update Existing Code**

**Update OnboardingForm:**
```typescript
// Before:
phone_number: values.phone_number.trim().replace(/\s/g, "")

// After:
import { normalizePhone } from "@/lib/phoneUtils";
phone_number: normalizePhone(values.phone_number)
```

**Update Webhook Handler:** ✅ *Already done!*
```typescript
const normalizedPhone = normalizePhone(senderPhone);
```

**Update Cron Check-in:**
```typescript
// Before:
to: patient.phone_number,  // May have + (breaks API)

// After:
import { formatForWhatsApp } from "@/lib/phoneUtils";
to: formatForWhatsApp(patient.phone_number),
```

**Update formatPhone in actions/patients.ts:**
```typescript
// Before: Custom implementation
function formatPhone(countryCode: string, phone: string): string {
  const combined = `${countryCode}${phone}`.replace(/\s/g, "");
  return combined.startsWith("+") ? combined : `+${combined}`;
}

// After: Use centralized utility
import { normalizePhone } from "@/lib/phoneUtils";
function formatPhone(countryCode: string, phone: string): string {
  return normalizePhone(phone, countryCode);
}
```

### **Step 2: Add Validation**

Add to patient registration forms:
```typescript
import { isValidPhoneInput } from "@/lib/phoneUtils";

// In form validation
if (!isValidPhoneInput(phone, countryCode)) {
  setError("Invalid phone number format");
  return;
}
```

### **Step 3: Database Migration (Optional)**

If you have existing inconsistent data:
```sql
-- Check for phones without +
SELECT id, phone_number 
FROM patients 
WHERE phone_number NOT LIKE '+%';

-- Fix them (if you know they're all Morocco +212)
UPDATE patients 
SET phone_number = CONCAT('+', phone_number)
WHERE phone_number NOT LIKE '+%' 
  AND LENGTH(phone_number) = 12;  -- Morocco number length
```

---

## 📚 **Industry Best Practices**

### **Why E.164?**
E.164 is the international standard (ITU-T):
- **Globally unique**: Every phone has one E.164 number
- **API compatible**: WhatsApp, Twilio, Vonage all use E.164
- **Future-proof**: Works for any country expansion

### **Why Store WITH `+`?**
1. **Unambiguous**: `212` vs `+212` - is it Morocco or area code?
2. **Database indexing**: Consistent format = faster queries
3. **Easier debugging**: Logs show complete number
4. **Standard compliance**: E.164 spec includes `+`

### **Why Send WITHOUT `+` to WhatsApp?**
- WhatsApp API expects pure digits
- Meta's API docs specify: "Phone number in E.164 format without +"
- Including `+` causes API rejection

---

## 🧪 **Testing Guide**

Test these scenarios:

1. **Input normalization:**
   ```typescript
   normalizePhone("612345678", "+212") === "+212612345678"
   normalizePhone("+212 612 345 678") === "+212612345678"
   normalizePhone("0612345678", "+212") === "+212612345678"
   ```

2. **WhatsApp formatting:**
   ```typescript
   formatForWhatsApp("+212612345678") === "212612345678"
   formatForWhatsApp("+1234567890") === "1234567890"
   ```

3. **Webhook lookup:**
   - Send WhatsApp message from `+212612345678`
   - Webhook receives `212612345678` or `+212612345678`
   - Both should find same patient in database

4. **Registration flow:**
   - User enters: `0612 345 678` with country `+212`
   - Stored as: `+212612345678`
   - WhatsApp receives: `212612345678`
   - Patient receives welcome message ✅

---

## 📊 **Current Status in Your Codebase**

| Component | Status | Action Needed |
|-----------|--------|---------------|
| ✅ Webhook normalization | Fixed | None |
| ✅ Phone utilities | Created | None |
| ⚠️ OnboardingForm | Inconsistent | Use `normalizePhone` |
| ⚠️ Cron check-in | May send + to API | Use `formatForWhatsApp` |
| ⚠️ actions/patients.ts | Custom impl. | Replace with utility |
| ⚠️ lib/utils.ts | US-only format | Use new `formatForDisplay` |
| ❌ Validation | Missing | Add input validation |

---

## 🎓 **Quick Reference Card**

```typescript
import { 
  normalizePhone,      // DB storage
  formatForWhatsApp,   // WhatsApp API
  formatForDisplay,    // UI display
  isValidPhoneInput    // Validation
} from "@/lib/phoneUtils";

// ✅ Saving to database
const dbPhone = normalizePhone(userInput, countryCode);
await db.insert({ phone_number: dbPhone });

// ✅ Sending to WhatsApp
const apiPhone = formatForWhatsApp(dbPhone);
await whatsappAPI.send({ to: apiPhone });

// ✅ Showing to user
<span>{formatForDisplay(dbPhone)}</span>

// ✅ Validating input
if (!isValidPhoneInput(userInput, countryCode)) {
  throw new Error("Invalid phone");
}
```

---

## 🔗 **References**

- [E.164 Standard](https://en.wikipedia.org/wiki/E.164)
- [WhatsApp Cloud API Docs](https://developers.facebook.com/docs/whatsapp/cloud-api/)
- [Twilio Phone Number Best Practices](https://www.twilio.com/docs/glossary/what-e164)

---

## ✨ **Summary**

**The Golden Rule:** 
> Store WITH `+`, send WITHOUT `+`, display with SPACING

**One function for each purpose:**
- `normalizePhone()` → Store it
- `formatForWhatsApp()` → Send it
- `formatForDisplay()` → Show it

**Always normalize on boundaries:**
- User input → Normalize → Database
- Database → Format → WhatsApp API
- WhatsApp webhook → Normalize → Database lookup
