import React, { useEffect, useRef } from "react";
import defaultProfilePicture from "/images/login/ArielProfilePicture.png"; // Ensure path is correct

/**
 * HeaderView - A single navbar view that shows different content based on auth status
 * @param {Object} props Component props
 * @param {boolean} props.isAuthenticated Whether user is authenticated
 * @param {string} [props.userDisplayName] User's display name (when authenticated)
 * @param {string} [props.userPhotoURL] User's profile photo URL (when authenticated)
 * @param {Function} props.handleSignOutACB Callback for sign out action
 * @param {Function} props.handleNavigateACB Callback for navigation
 * @param {string} [props.className] Optional CSS class name
 * @returns {JSX.Element} The navbar UI
 */
export function HeaderView({ props }) {
    // Use ref for profile image hover effect
    const profileImgRef = useRef(null);

    // Set up mouse enter/leave effects for profile image
    useEffect(
        function setupHoverEffectsACB() {
            const imgElement = profileImgRef.current;

            // Only set up effects if the user is authenticated and element exists
            if (props.isAuthenticated && imgElement) {
                function handleMouseEnterACB() {
                    imgElement.style.width = "40px";
                }

                function handleMouseLeaveACB() {
                    imgElement.style.width = "35px";
                }

                // Add event listeners
                imgElement.addEventListener("mouseenter", handleMouseEnterACB);
                imgElement.addEventListener("mouseleave", handleMouseLeaveACB);

                // Clean up event listeners
                return function cleanupCB() {
                    imgElement.removeEventListener("mouseenter", handleMouseEnterACB);
                    imgElement.removeEventListener("mouseleave", handleMouseLeaveACB);
                };
            }

            return function cleanupCB() {}; // Empty cleanup for non-authenticated state
        },
        [props.isAuthenticated]
    );

    /**
     * Creates a navigation click handler for a specific path
     * @param {string} path The path to navigate to
     * @returns {Function} Click handler function
     */
    function createNavHandlerACB(path) {
        /**
         * Handles click on navigation element
         * @param {Event} e Click event
         */
        return function navigationHandlerACB(e) {
            e.preventDefault();
            props.handleNavigateACB(path);
        };
    }

    // Style for highlighting effects
    const navbarStyles = `
        .navbar .nav-link:hover, 
        .navbar .btn-link:hover,
        .navbar a.nav-link:hover,
        .navbar .nav-link:focus, 
        .navbar .btn-link:focus,
        .navbar a.nav-link:focus {
            color: #dc3545 !important;
            text-decoration: none;
        }
        .navbar .nav-link:focus-visible,
        .navbar .btn-link:focus-visible,
        .navbar a.nav-link:focus-visible {
            outline: 2px solid #dc3545;
            outline-offset: 2px;
        }
        .navbar .navbar-brand:hover,
        .navbar .navbar-brand:focus {
            color: #dc3545 !important;
        }
        .navbar .profile-link:focus-visible {
            outline: 2px solid #dc3545;
            outline-offset: 2px;
        }
        .navbar .navbar-brand:hover img,
        .navbar .navbar-brand:focus img {
            filter: drop-shadow(0 0 2px #dc3545);
        }
    `;

    // Create handlers for each navigation item
    const handleLogoClickACB = createNavHandlerACB(props.isAuthenticated ? "/profile" : "/");
    const handleDashboardClickACB = createNavHandlerACB("/dashboard");
    const handleEducationClickACB = createNavHandlerACB("/education");
    const handleForumClickACB = createNavHandlerACB("/forum");
    const handleProfileClickACB = createNavHandlerACB("/profile");
    const handleSignUpClickACB = createNavHandlerACB("/signUp");
    const handleLoginClickACB = createNavHandlerACB("/login");

    // Logo element with image tag
    const logoElement = (
        <a href="#" onClick={handleLogoClickACB} className="navbar-brand" aria-label="Once Upon a Budget">
            <img
                src={"/images/Once Upon a Budget.svg"}
                alt="Once Upon a Budget"
                height="60"
                className="d-inline-block align-top"
            />
        </a>
    );

    // Render authenticated navbar content
    if (props.isAuthenticated === true) {
        return (
            <header className={props.className || ""}>
                <style>{navbarStyles}</style>
                <nav className="navbar navbar-expand-sm border-0 py-1 pb-0">
                    <div className="container-fluid">
                        {/* Logo */}
                        {logoElement}

                        {/* Hamburger menu for mobile */}
                        <button
                            className="navbar-toggler navbar-dark"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon navbar-dark"></span>
                        </button>

                        {/* Navigation links for authenticated users */}
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                            <div className="navbar-nav align-items-center">
                                <a
                                    href="/dashboard"
                                    onClick={handleDashboardClickACB}
                                    className="nav-link text-white pe-md-3"
                                >
                                    Plan Your Portfolio
                                </a>
                                <a href="#" onClick={handleEducationClickACB} className="nav-link text-white pe-md-3">
                                    Education
                                </a>
                                <a href="#" onClick={handleForumClickACB} className="nav-link text-white pe-md-3">
                                    Forum
                                </a>
                                <button
                                    onClick={props.handleSignOutACB}
                                    className="nav-link text-white btn btn-link"
                                    style={{
                                        background: "none",
                                        border: "none",
                                        padding: "var(--bs-nav-link-padding-y) var(--bs-nav-link-padding-x)",
                                        cursor: "pointer",
                                    }}
                                >
                                    Logout
                                </button>
                                <a href="#" onClick={handleProfileClickACB} className="nav-link ms-md-2 profile-link">
                                    <img
                                        ref={profileImgRef}
                                        src={props.userPhotoURL || defaultProfilePicture}
                                        alt={props.userDisplayName || "User Profile"}
                                        style={{
                                            width: "35px",
                                            height: "35px",
                                            objectFit: "cover",
                                            transition: "width 0.2s ease-in-out",
                                            borderRadius: "50%",
                                        }}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }

    // Render non-authenticated navbar content
    return (
        <header className={props.className}>
            <style>{navbarStyles}</style>
            <nav className="navbar navbar-expand-sm border-0 py-1 pb-0">
                <div className="container-fluid">
                    {/* Logo */}
                    {logoElement}

                    {/* Hamburger menu for mobile */}
                    <button
                        className="navbar-toggler navbar-dark"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon navbar-dark"></span>
                    </button>

                    {/* Navigation links for non-authenticated users */}
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <div className="navbar-nav">
                            <a href="#" onClick={handleSignUpClickACB} className="nav-link text-white">
                                Sign Up
                            </a>
                            <a href="#" onClick={handleLoginClickACB} className="nav-link text-white">
                                Log in
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
