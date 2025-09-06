# Once Upon a Budget

## Description

Once Upon a Budget is a web application designed to educate women about financial literacy.
The application provides a user-friendly interface for users to learn about budgeting, saving, and investing.
To break the barrier of finance as a scary subject, the application eases users into the topic by first letting them finish a personality quiz on disney princesses.
Based on the results of this personality quiz, financial traits are assigned to the user, and they are then given help to create a personalized financial plan that is tailored to their personality type.
On top of that users get the chance to learn about budgeting on the education page and can discuss open questions in the forum.

![LandingPageDesign](https://github.com/user-attachments/assets/2f1d5a00-0e61-4edb-9dad-68792b2e852e)
![UserPageDesign](https://github.com/user-attachments/assets/07feaddb-eba4-43f2-8782-f5e9bf913f93)

## Deployed App

The app is deployed on Firebase Hosting. You can access it [here](https://once-upon-a-budget.web.app/).

## How to set up the project

Follow these steps:

1. npm install
2. set up .env
3. npm run dev

## Third party components

Located in /src/components, consisting of Button Add Investment; Data Grid; and Pie Chart, from MUI (https://mui.com).

## Progress

### Already done

- First Usability Test. Results can be found [here](https://kth-my.sharepoint.com/:w:/g/personal/diagnosa_ug_kth_se/EVdnaUuAwq5MkhouKZMRedABgtrf0nhzwyHjE29ZVeArXg?e=CNtidB).
- First Prototype Design on [Figma](https://www.figma.com/design/Ggd642v1eyTXoskDDr99xA/UOaB-Prototype?node-id=0-1&t=s5F9dPIayKCzQEnH-1).
- Views
    - [x] for Landing Page
    - [x] for Signup/Login
    - [x] for Navbar (signed in/not signed in)
    - [x] for Education Page
    - [x] for Forum
    - [x] for Personality Quiz
    - [x] for Dashboard with help to create a personalized financial plan
- Presenters
    - [x] for Signup/Login Authentication
    - [x] for Navbar (signed in/not signed in)
    - [x] for Education Page
    - [x] for Landing Page
    - [x] for Personality Quiz
    - [x] for Dashboard for financial plan
    - [x] for Forum
- Firebase Connection
    - [x] for Google Authentication
    - [x] for Email Authentication
- API Connection
    - [x] Spotify API
    - [x] Google Books
    - [x] Disney API
- Persistence
    - [x] setup with Firebase
    - [x] setup with Redux
- Component Integration
    - [x] MUI Dashboard for Financial Plan

## Project Structure

```plaintext
src/                         # Core application logic
├── api/                               # API logic
├    ├── apiConfig.jsx                 # Configuration constants
├    ├── disney.jsx                    # Fetches disney images
├    ├── googleBooks.jsx               # Fetches book information
├    ├── spotify.jsx                   # Searches podcasts
├── components/              # Reusable components
│   ├── ButtonAddInvestment/
│   │   └── AddInvestmentButton.jsx    # MUI Component for adding investments
│   │   └── InvestmentButtonStyles.jsx # MUI styles for the button
│   ├── DataGrid/
│   │   └── DataGrid.jsx               # MUI Data Grid component
│   │   └── DataGridStyles.jsx         # MUI styles for the data grid
│   ├── PieChart/
│   │   └── PieChart.jsx               # MUI Pie Chart component
│   │   └── PieChartStyles.jsx         # MUI styles for the pie chart
│   ├── BigButtonLink.jsx              # Big button link component
│   ├── CategorySelector.jsx           # Category selector component
│   ├── ProtectedRoute.jsx             # Protected route component
│   └── Userthumbnail.jsx              # User thumbnail component
├── firebase/                # Firebase configuration and setup
│   ├── auth.js                        # Firebase auth functions
│   ├── authListener.js                # Auth state listener
│   ├── config.js                      # Firebase project credentials
│   └── index.js                       # Firebase app initialization
├── helpers/                 # Utility functions
│   └── arrayCallback.js               # Common array callback functions
│   └── categories.js                  # Array of category list for filtering purpose
│   └── date.js                        # Date formatter helper
│   └── index.js                       # Multi purpose file
│   └── localStorage.js                # Local storage setter and getter function
│   └── quizanswer.js                  # Logic for the quiz and quiz results
│   └── status.js                      # Array of multiple status codes
├── maps/                    # Mapping data between UI and logic
│   ├── authMap.js                # Authentification data mapping
│   ├── educationMap.js               # Education data mapping
│   ├── forumMap.js               # Forum data mapping
│   ├── investmentMap.js          # Mapping for dashboard investment to logic
│   ├── landingMap.js             # Mapping landingpage data to logic
│   ├── profileMap.js             # Mapping profile data to logic
│   └── quizMap.js                # Mapping quiz answers to logic
├── presenters/              # Logic & interaction handlers for each view
│   ├── AuthPresenter.jsx          # Authentication logic handler
│   ├── DashboardPresenter.jsx     # Logic for displaying the dasboard
│   ├── EducationPresenter.jsx     # Connects data with education page
│   ├── ForumDetailPresenter.jsx   # Forum detail page logic
│   ├── ForumNewPresenter.jsx      # New forum post logic
│   ├── ForumPagePresenter.jsx     # Forum page logic handler
│   ├── HeaderPresenter.jsx        # Logic for dynamic header
│   ├── LandingPagePresenter.jsx   # Handles interactions on the landing page
│   ├── ProfilePresenter.jsx       # Profile page logic
│   ├── QuizPresenter.jsx          # Controls quiz logic and result flow
│   └── QuizResultPresenter.jsx    # Controls quiz result logic and result flow
├── service/              # ADD DESCRIPTION
│   └── navigationService.jsx    # ADD DESCRIPTION
├── store/                   # Redux store and state slices
│   ├── reducer.js                 # Root reducer combining all slices
│   ├── middleware/
│   │   └── educateListener.js       # Middleware listening to education state
│   │   └── forumListener.js       # Middleware listening to forum state
│   │   └── investmentListener.js  # Middleware listening to investment (dashboard) state
│   │   └── profileListener.js     # Middleware listening to profile state
│   │   └── quizListener.js        # Middleware listening to quiz state
│   │   └── userListener.js        # Middleware listening to user state changes
│   └── slices/
│       ├── articleSlice.js        # Slice managing article state
│       ├── bookSlice.js           # Slice managing books state
│       ├── forumSlice.js          # Forum state management
│       ├── educationSlice.js      # General education state management
│       ├── investmentSlice.js     # Slice managing investment state
│       ├── podcastSlice.js        # Slice managing podcasts state
│       ├── profileSlice.js        # Slice managing profile state
│       ├── quizSlice.js           # Slice managing quiz state
│       └── userSlice.js           # Slice managing user-related state
├── utils/                  # Utility functions
│   └── Authentification/
│       └── validation.js          # Authentication utility functions
│   └── Dashboard/
│       └── chartConfig.jsx                    # Datagrid configuration of mobile or desktop
│       └── createColumnsForDashboard.jsx      # Datagrid configuration of columns
│       └── dataForPieChart.jsx                # Datagrid dataformatting
│   └── Education/
│       └── articleData.jsx                    # Hardcoded article data
├── views/                  # Presentational components (UI only)
│   ├── AuthView.jsx                           # Authentication view component
│   ├── DashboardView.jsx                      # Visual layout for the dashboard (my portfolio) page
│   ├── EducationPage.jsx                      # Visual layout for the education page
│   ├── Footer.jsx                             # App-wide footer
│   ├── ForumDetailView.jsx                    # Forum detail view (Q&A for one question in Detail) (stub)
│   ├── ForumDetailqView.jsx                   # Forum Detail
│   ├── ForumNewView.jsx                       # Create forum post view
│   ├── ForumPageView.jsx                      # Main forum page
│   ├── HeaderView.jsx                         # Visual part of the header
│   ├── LandingPageView.jsx                    # Landing page layout
│   ├── ProfileView.jsx                        # User profile view
│   ├── QuizResultSuspenseView.jsx             # Results page after quiz completion
│   ├── QuizResultView.jsx                     # Results page after quiz completion
│   └── QuizView.jsx                           # Quiz page layout
├── index.jsx                # Main entry point for React app
└── ReactRoot.jsx            # Root app wrapper component
```

## Static Assets & Style

```plaintext
public/                     # Publicly accessible assets
└── images/
  ├── background/              # Background images used in UI
  ├── icons/                   # Assets for icons
  ├── login/                   # Assets for login/signup views
  └── resources/               # Images for educational resources & podcasts

styles/                    # Global and page-specific CSS styles
├── bigButtonLink.css           # Styles for the lbig button link
├── form.css                    # Styles for the forum textarea
├── heading.css                 # Styles for the pretty princess heading
├── landingPage.css             # Styles for the landing page
└── loginCreateAcount.css       # Styles for login and signup pages
styles.css                      # Global styles for the app
```

## Project Configuration

```plaintext
index.html                 # Root HTML file used by Vite during build
vite.config.js             # Vite build configuration
firebase.json              # Firebase hosting and rules configuration

package.json               # Project metadata and dependencies
package-lock.json          # Dependency tree lock file

.eslintrc, .prettierrc     # Linting and formatting configuration
.gitignore                 # Files and folders to be excluded from Git
README.md                  # Project documentation (this file)
```
