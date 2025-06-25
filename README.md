# GitHub API Explorer - React + Express Full Stack App

## Overview

This project is a full-stack web application that allows users to search GitHub users, view user profiles and repositories, and inspect repository commit history. It uses a React frontend and an Express backend that proxies requests to the GitHub public API.

## Features

- User search box with live GitHub search results
- User profile details including bio and repos
- Repository details with last 5 commits
- External links to GitHub open in new tabs with distinct styling
- Loading indicators on data fetches
- Backend security with Helmet
- Comprehensive unit tests for backend and frontend

## Technologies

- React (React Router, Hooks)
- Express (Axios, Helmet, CORS)
- Mocha & Chai for backend testing
- Jest & React Testing Library for frontend testing

## Setup Instructions

### Backend

1. Navigate to the `server` folder.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the backend server (default port 5000).
4. Run `npm test` to run backend tests.

### Frontend

1. Navigate to the `client` folder.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the React development server (default port 3000).
4. Run `npm test` to run frontend tests.

## Notes

- No authentication or database is used.
- Only publicly accessible GitHub API endpoints are used.
- Backend handles all GitHub API interactions.
- The project folder structure separates backend and frontend clearly.

---

## Author

Your Name Here

