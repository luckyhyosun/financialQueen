import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * ProtectedRoute - A wrapper component that redirects to login if user is not authenticated
 * @returns {JSX.Element} The outlet if authenticated, or redirect if not
 */
export function ProtectedRoute() {
    const location = useLocation();
    const { isAuthenticated, isReady } = useSelector((state) => state.currentUser);

    // If the user isn't authenticated, redirect to login
    if (isReady && !isAuthenticated) {
        // Redirect to login with the attempted path in state for potential redirect back later
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    // If authenticated or still loading auth state, render children
    return <Outlet />;
}
