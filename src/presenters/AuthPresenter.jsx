import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { validatePasswordsCB } from "../utils/Authentification/validation.jsx";
import { mapDispatchToAuthPropsACB, mapStateToAuthPropsCB } from "../maps/authMap.js";
import { AuthView } from "../views/AuthView";

export function AuthPresenter(props) {
    const location = useLocation();
    const navigate = useNavigate();

    // Derive route-based props
    const from = location.state?.from || "/profile";
    const isSignup = location.pathname.includes("/signUp");

    // Local form state using useState
    const [formState, setFormState] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        formError: "",
        passwordMatchError: "",
    });

    /**
     * Handle real-time password validation
     */
    function validatePasswordsRealtimeCB() {
        if (!isSignup) return;

        const { password, confirmPassword } = formState;
        const validation = validatePasswordsCB(password, confirmPassword, false);

        function updatePasswordErrorCB(prevState) {
            return {
                ...prevState,
                passwordMatchError: validation.error || "",
            };
        }

        setFormState(updatePasswordErrorCB);
    }

    /**
     * Reset form errors
     */
    function resetFormErrorsCB() {
        function clearErrorsCB(prevState) {
            return {
                ...prevState,
                formError: "",
                passwordMatchError: "",
            };
        }

        setFormState(clearErrorsCB);
    }

    /**
     * Set form error
     */
    function setFormErrorCB(error) {
        function updateFormErrorCB(prevState) {
            return {
                ...prevState,
                formError: error,
                passwordMatchError: "",
            };
        }

        setFormState(updateFormErrorCB);
    }

    /**
     * Set password match error specifically
     */
    function setPasswordMatchErrorCB(error) {
        function updatePasswordMatchErrorCB(prevState) {
            return {
                ...prevState,
                passwordMatchError: error,
            };
        }

        setFormState(updatePasswordMatchErrorCB);
    }

    /**
     * Clear sensitive fields
     */
    function clearSensitiveFieldsCB() {
        function clearFieldsCB(prevState) {
            return {
                ...prevState,
                password: "",
                confirmPassword: "",
                formError: "",
                passwordMatchError: "",
            };
        }

        setFormState(clearFieldsCB);
    }

    /**
     * Handle navigation after successful auth OR logout
     */
    function handleNavigationCB() {
        if (props.isAuthenticated && !props.isLoading) {
            clearSensitiveFieldsCB();
            navigate(from);
        } else if (
            !props.isAuthenticated &&
            !props.isLoading &&
            !location.pathname.includes("/login") &&
            !location.pathname.includes("/signUp")
        ) {
            // Handle logout - redirect to login page only if not already on auth pages
            clearSensitiveFieldsCB();
            navigate("/login"); // Changed from "/signIn" to "/login"
        }
    }

    /**
     * Handle Google sign-in
     */
    function handleGoogleSignInACB(e) {
        if (e) e.preventDefault();

        resetFormErrorsCB();
        props.clearAuthError();

        // Dispatch the action - middleware handles the rest
        props.googleSignInACB();

        // Handle navigation directly if already authenticated
        // This happens immediately for already-logged-in users
        handleNavigationCB();
    }

    /**
     * Handle email authentication
     */
    function handleEmailAuthACB(e) {
        if (e) e.preventDefault();

        resetFormErrorsCB();
        props.clearAuthError();

        // Basic validation
        if (!formState.email) {
            setFormErrorCB("Email is required");
            return;
        }

        if (isSignup) {
            if (!formState.password) {
                setFormErrorCB("Password is required");
                return;
            }

            if (!formState.name) {
                setFormErrorCB("Name is required for signup");
                return;
            }

            const passwordValidation = validatePasswordsCB(formState.password, formState.confirmPassword, true);

            if (!passwordValidation.isValid) {
                setPasswordMatchErrorCB(passwordValidation.error);
                return;
            }

            // Dispatch sign-up action
            props.emailSignUpACB(formState.email, formState.password, formState.name);
        } else {
            if (!formState.password) {
                setFormErrorCB("Password is required");
                return;
            }

            // Dispatch sign-in action
            props.emailSignInACB(formState.email, formState.password);
        }

        // Handle navigation directly if already authenticated
        handleNavigationCB();
    }

    /**
     * Validates passwords with new input value
     */
    function validatePasswordsWithNewValueCB(inputName, inputValue) {
        const passwordValue = inputName === "password" ? inputValue : formState.password;
        const confirmPasswordValue = inputName === "confirmPassword" ? inputValue : formState.confirmPassword;

        const validation = validatePasswordsCB(passwordValue, confirmPasswordValue, false);

        function updateStateWithValidationCB(prev) {
            return {
                ...prev,
                [inputName]: inputValue,
                passwordMatchError: validation.error || "",
            };
        }

        setFormState(updateStateWithValidationCB);
    }

    /**
     * Updates form state with new input value
     */
    function updateFormStateCB(inputName, inputValue) {
        function updateFieldCB(prevState) {
            return {
                ...prevState,
                [inputName]: inputValue,
            };
        }

        setFormState(updateFieldCB);
    }

    /**
     * Handle input changes with validation
     */
    function handleInputChangeACB(e) {
        const { name: inputName, value: inputValue } = e.target;

        // Clear Redux auth error when user starts typing
        if (props.error) {
            props.clearAuthError();
        }

        // Real-time password validation for password fields during signup
        if (isSignup && (inputName === "password" || inputName === "confirmPassword")) {
            validatePasswordsWithNewValueCB(inputName, inputValue);
        } else {
            updateFormStateCB(inputName, inputValue);
        }
    }

    // Single useEffect for navigation - only when auth state changes
    useEffect(
        function navigationEffectACB() {
            // Only handle navigation, all other logic is in event handlers
            handleNavigationCB();
        },
        [props.isAuthenticated, props.isLoading]
    );

    // Determine if we should show the auth error from Redux
    // But clear form errors when Redux error is cleared
    const displayError = props.error || formState.formError;

    return (
        <AuthView
            isSignup={isSignup}
            authState={{
                userId: props.id,
                email: props.email,
                displayName: props.displayName,
                photoURL: props.photoURL,
                quizResult: props.quizResult,
                isAuthenticated: props.isAuthenticated,
                isLoading: props.isLoading,
                error: displayError, // Combine Redux and form errors
            }}
            formState={{
                ...formState,
                // Clear form errors when Redux error is present
                formError: props.error ? "" : formState.formError,
            }}
            handleGoogleSignInACB={handleGoogleSignInACB}
            handleEmailAuthACB={handleEmailAuthACB}
            handleInputChangeACB={handleInputChangeACB}
            validatePasswordsRealtimeCB={validatePasswordsRealtimeCB}
        />
    );
}

export const Auth = connect(mapStateToAuthPropsCB, mapDispatchToAuthPropsACB)(AuthPresenter);
