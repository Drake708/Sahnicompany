# SAHNI & CO. - Access Credentials

## 🔐 Admin Portal Login

**Username:** `cadinkarsahni`  
**Password:** `Jaishreeram@123`

---

## 👤 Client Portal Login

**Client Name:** Simran  
**Username (PAN):** `LOHPS7022A`  
**Password:** `lohps7022a24121998`

---

## 📋 Login Instructions

1. Navigate to the website
2. Click **"LOGIN"** button in top right
3. Select **"ADMIN ACCESS"** tab
4. Enter the credentials above
5. Click **"SIGN IN"**

---

## ⚠️ Important Notes

- **Case Sensitive:** Both username and password are case-sensitive
- **Client Portal:** Currently disabled (no clients in database)
- **Invalid Credentials:** Will show error message if credentials are incorrect
- **Logout Required:** Must logout before navigating to other pages from portal

---

## 🔄 Password Reset

If you need to change the admin password:
1. Edit `/components/LoginPage.tsx`
2. Find the `ADMIN_CREDENTIALS` object (around line 25)
3. Update the password value
4. Save the file

```typescript
const ADMIN_CREDENTIALS = {
  username: 'cadinkarsahni',
  password: 'YOUR_NEW_PASSWORD_HERE'
};
```

---

## 📧 Email Configuration

Admin email for all notifications: **dinkarsahni@gmail.com**

All the following send to this email:
- Contact form submissions
- Forgot password requests
- Client notifications (when implemented)

---

## 🛡️ Security Features

- ✅ Credential validation on every login attempt
- ✅ Error messages for invalid credentials
- ✅ Form data cleared when switching tabs
- ✅ Errors cleared when typing
- ✅ Session management (must logout to navigate)
- ✅ No default/demo credentials exposed in UI

---

**Last Updated:** January 2025  
**Status:** Production Ready
