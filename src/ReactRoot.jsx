import { createHashRouter, Outlet, useNavigate } from "react-router-dom";
import { Quiz } from "./presenters/QuizPresenter.jsx";
import { QuizResult } from "./presenters/QuizResultPresenter.jsx";
import { Footer } from "./views/Footer.jsx";
import { LandingPage } from "./presenters/LandingPagePresenter.jsx";
import { Education } from "./presenters/EducationPresenter.jsx";
import { Auth } from "./presenters/AuthPresenter.jsx";
import { Profile } from "./presenters/ProfilePresenter.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { DashboardPage } from "./presenters/DashboardPresenter.jsx";

import { getAssetsURL } from "./helpers/index.js";
import { NavbarContainer } from "./presenters/HeaderPresenter.jsx";
import { ForumPage } from "./presenters/ForumPagePresenter.jsx";
import { ForumDetail } from "./presenters/ForumDetailPresenter.jsx";
import { ForumNew } from "./presenters/ForumNewPresenter.jsx";
import navigationService from "./service/navigationService.js";
import { useEffect } from "react";

const AppRouter = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        navigationService.setNavigate(navigate); // Register the navigate function globally
    }, [navigate]);

    return children; // Render children inside Router context
};

// Layout used for public routes
function Layout() {
    return (
        <AppRouter>
            <div
                className="bg-image d-flex flex-column vh-100"
                style={{
                    backgroundImage: `url('${getAssetsURL()}/images/background/bg_Img.png')`,
                }}
            >
                <NavbarContainer className="flex-shrink-0" />
                <main className="flex-grow-1 overflow-hidden">
                    <Outlet />
                </main>
                <Footer className="flex-shrink-0" />
            </div>
        </AppRouter>
    );
}

export function makeRouter() {
    return createHashRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                { index: true, element: <LandingPage /> }, // Default route
                { path: "quiz", element: <Quiz /> },
                { path: "quiz-result", element: <QuizResult /> },
                { path: "signUp", element: <Auth /> },
                { path: "login", element: <Auth /> },
                // Protected routes wrapped with ProtectedRoute component
                {
                    element: <ProtectedRoute />,
                    children: [
                        { path: "dashboard", element: <DashboardPage /> },
                        { path: "education", element: <Education /> },
                        { path: "profile", element: <Profile /> },
                        {
                            path: "forum",
                            element: <ForumPage />,
                            children: [
                                { path: "", element: <ForumDetail /> },
                                { path: "new", element: <ForumNew /> },
                            ],
                        },
                    ],
                },
            ],
        },
    ]);
}
