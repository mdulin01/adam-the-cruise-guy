# Adam The Cruise Guy — Project Guidelines

## Key URLs & Resources

| Resource | URL |
|----------|-----|
| **GitHub Repository** | https://github.com/mdulin01/adam-the-cruise-guy |

## Technical Stack

- **Frontend:** React 19 + Vite 7 + Tailwind CSS 4
- **Backend/Database:** Firebase (Firestore, Authentication, Storage)
- **Deployment:** Vercel
- **Version Control:** GitHub (mdulin01/adam-the-cruise-guy)

## Infrastructure

- **Firebase Project ID:** adam-the-cruise-guy
- **Firebase Storage Bucket:** `gs://adam-the-cruise-guy.firebasestorage.app`
- **Database:** Firestore
- **Authentication:** Enabled (Google provider)
- **Storage:** Enabled
- **Firebase config** is hardcoded in `src/firebase-config.js` (public API keys only)

## Architecture Notes

- **Main app:** `src/App.jsx`
- **Key components:** CRMApp (CRM dashboard), LandingPage (public-facing page)
- **Custom hooks:** useFirestore
- **Constants:** `src/constants.js`

## File Scope Boundary

**CRITICAL: When working on this project, ONLY access files within the `adam-the-cruise-guy/` directory.** Do not read, write, or reference files from any sibling project folder. If you need something from another project, stop and ask first.
