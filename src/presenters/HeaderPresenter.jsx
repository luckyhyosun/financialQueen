import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HeaderView } from "../views/HeaderView.jsx";
import { mapDispatchToAuthPropsACB, mapStateToAuthPropsCB } from "../maps/authMap.js";

/**
 * Navbar Container - Handles navbar logic and passes props to the unified view
 * @param {Object} props Component props (from Redux connect)
 * @param {string} [props.className] Optional CSS class name
 * @returns {JSX.Element} The navbar component
 */
function NavbarContainerComponent(props) {
    const navigate = useNavigate();

    /**
     * Handle user sign out
     */
    function handleSignOutACB() {
        console.log("Logout button clicked - calling props.signOutACB"); // Debug log
        props.signOutACB();
        navigate("/login");
        collapseMobileMenuCB();
    }

    /**
     * Handle navigation to a specific path
     * @param {string} path The path to navigate to
     */
    function handleNavigateACB(path) {
        navigate(path);
        collapseMobileMenuCB();
    }

    /**
     * Collapses the mobile menu if it's open
     */
    function collapseMobileMenuCB() {
        const navbarToggler = document.querySelector(".navbar-toggler");
        const navbarCollapse = document.querySelector("#navbarNav");

        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
            navbarToggler.click();
        }
    }

    // Prepare props object for HeaderView
    const headerViewProps = {
        isAuthenticated: props.isAuthenticated,
        userDisplayName: props.displayName,
        userPhotoURL: props.photoURL,
        handleSignOutACB: handleSignOutACB,
        handleNavigateACB: handleNavigateACB,
        className: props.className,
    };

    // Return the unified navbar view with props object
    return <HeaderView props={headerViewProps} />;
}

// Connected version using auth map
const NavbarContainerConnected = connect(mapStateToAuthPropsCB, mapDispatchToAuthPropsACB)(NavbarContainerComponent);

// Export the connected version as the default
export const NavbarContainer = NavbarContainerConnected;

// Also export the pure component for testing or other uses
export { NavbarContainerComponent };
