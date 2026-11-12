# Aurora Institute Portal — 25CS208 Web Technology Micro Project

A responsive, multi-page college portal prototype built with HTML5, CSS3 and vanilla JavaScript.

## Run locally
1. Extract the ZIP file.
2. Open `index.html` in a modern browser, or use VS Code's Live Server extension.
3. Use the navigation to explore Register, Sign up, Sign in and Dashboard.

## Included features
- Responsive landing page, department tabs, campus gallery and parent information.
- Four-year academic journey and student dashboard.
- Subject-wise attendance tracker with browser storage.
- Year roadmap and milestone progress.
- SGPA calculator and attendance safe-bunk planner.
- Basic arithmetic calculator, dark mode and FAQ chatbot.
- Client-side form validation and mobile navigation.

## Important prototype limitations
This is a frontend academic demo. Registration and dashboard progress are stored in browser `localStorage`; sign-in is not real authentication. There is no server-side database, authorization, password hashing, or secure parent/student account separation. Do not use real student or personal information. Before production use, add a secure backend, database, server-side validation, authentication, authorization, HTTPS and appropriate privacy controls.

## Project structure
- `index.html` — landing page
- `home.html` — student dashboard
- `register.html`, `signup.html`, `signin.html` — demo forms
- `css/` — global, layout and academic dashboard styles
- `js/` — interactions, validation, attendance, calculator, theme and chatbot
- `img/` — local SVG illustrations

All college names, contact details, statistics, sample events and academic content are illustrative placeholders.
