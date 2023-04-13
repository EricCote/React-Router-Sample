# React with React-Router V6.10+

To install React dependencies:

```bash
npm install
```

To run in dev mode:

```bash
npm run dev
```

To create a deployable version:

```bash
npm run build
```

To run the deployable version:

```bash
npm run preview
```

### To test manual routing:

see the file `/src/main.tsx` to change the app import to test different ways to route:

- None (no routing, just a call to the server configured for SPA routing)
- Naive (path routing with no re-renders, this forces network calls each time we follow a link)
- Hash (hash routing with no network calls and re-renders)
- History API (path routing, with modified links that blocks network calls and re-renders)
- Navigation API (path routing, with navigation that intercepts network calls and re-renders)
- React-router (path routing, using react router which uses history API)
