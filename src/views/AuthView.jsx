import React from "react";

/**
 * Auth View component - Handles rendering the authentication UI
 * @param {Object} props Props from the presenter
 * @returns {JSX.Element} Auth view UI
 */
export function AuthView(props) {
    // UI text based on page type
    const title = props.isSignup ? "Create Account" : "Login";
    const buttonText = props.isSignup ? "Create an account" : "Login";
    const googleText = props.isSignup ? "Sign Up with Google" : "Login with Google";

    return (
        <div className="container-fluid h-100">
            <div className="row h-100 w-100">
                {/* Left side with image - conditionally shows different images based on signup state */}
                <div className="col-12 col-md-6 d-none d-md-flex justify-content-center align-items-center position-relative p-0">
                    <img
                        src={props.isSignup ? "/images/login/account_signUp.png" : "images/login/account_logIn.png"}
                        alt={props.isSignup ? "Sign up illustration" : "Login illustration"}
                        className="img-fluid"
                        style={{ maxWidth: "65%", height: "auto", objectFit: "contain" }}
                    />

                    {/* Text overlay */}
                    <div className="position-absolute text-white text-center" style={{ zIndex: 2 }}>
                        <h1 className="display-5 fw-bold" style={{ fontStyle: "italic" }}>
                            Mirror Mirror
                            <br />
                            on the wall,
                            <br />
                            Who is the richest
                            <br />
                            of them all?
                        </h1>
                    </div>
                </div>

                {/* Right side with form */}
                <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                    <div className="card border-0 bg-transparent">
                        <div className="card-body">
                            <h1 className="card-title fw-bold text-center mb-4 text-white">{title}</h1>

                            {/* Display any auth errors from Redux */}
                            {props.authState.error && (
                                <div className="alert alert-danger text-center mb-3">{props.authState.error}</div>
                            )}

                            {/* Display general form validation errors */}
                            {props.formState.formError && (
                                <div className="alert alert-danger text-center mb-3">{props.formState.formError}</div>
                            )}

                            <div className="d-flex justify-content-center">
                                <button
                                    className="btn btn-light mb-3 d-flex align-items-center justify-content-center rounded-pill w-100"
                                    onClick={props.handleGoogleSignInACB}
                                    disabled={props.authState.isLoading}
                                >
                                    {props.authState.isLoading ? (
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                    ) : (
                                        <img
                                            src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
                                            alt="Google"
                                            style={{ height: "20px", marginRight: "10px" }}
                                        />
                                    )}
                                    {props.authState.isLoading ? "Processing..." : googleText}
                                </button>
                            </div>

                            <div className="d-flex align-items-center my-3">
                                <hr className="flex-grow-1 text-white" />
                                <span className="mx-2 text-white">or</span>
                                <hr className="flex-grow-1 text-white" />
                            </div>

                            <form onSubmit={props.handleEmailAuthACB}>
                                <div className="mb-2 login-form-field d-flex align-items-center">
                                    <label
                                        htmlFor="email"
                                        className="form-label fw-semibold text-white me-2 mb-0 col-3"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control bg-transparent text-white rounded-0"
                                        id="email"
                                        name="email"
                                        placeholder="example@email.com"
                                        value={props.formState.email}
                                        onChange={props.handleInputChangeACB}
                                    />
                                </div>

                                {props.isSignup && (
                                    <div className="mb-3 login-form-field d-flex align-items-center">
                                        <label
                                            htmlFor="name"
                                            className="form-label fw-semibold text-white me-2 mb-0 col-3"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control bg-transparent text-white rounded-0"
                                            id="name"
                                            name="name"
                                            placeholder="name"
                                            value={props.formState.name}
                                            onChange={props.handleInputChangeACB}
                                        />
                                    </div>
                                )}

                                <div className="mb-2 login-form-field d-flex align-items-center">
                                    <label
                                        htmlFor="password"
                                        className="form-label fw-semibold text-white me-2 mb-0 col-3"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control bg-transparent rounded-0 text-white"
                                        id="password"
                                        name="password"
                                        placeholder="6 digits"
                                        value={props.formState.password}
                                        onChange={props.handleInputChangeACB}
                                    />
                                </div>

                                {props.isSignup && (
                                    <div className="mb-2">
                                        <div className="login-form-field d-flex align-items-center">
                                            <label
                                                htmlFor="confirmPassword"
                                                className="form-label fw-semibold text-white me-2 mb-0 col-3"
                                            >
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
                                                className={`form-control bg-transparent rounded-0 text-white ${props.formState.passwordMatchError ? "border-danger" : ""}`}
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                placeholder="6 digits"
                                                value={props.formState.confirmPassword}
                                                onChange={props.handleInputChangeACB}
                                            />
                                        </div>
                                        {/* Password match error display */}
                                        {props.formState.passwordMatchError && (
                                            <div className="text-danger ms-3 ps-3 mt-1" style={{ marginLeft: "25%" }}>
                                                {props.formState.passwordMatchError}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="d-flex justify-content-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 rounded-pill mb-2 bg-white text-black"
                                        style={{ marginTop: "2rem" }}
                                        disabled={
                                            props.authState.isLoading ||
                                            (props.isSignup && props.formState.passwordMatchError)
                                        }
                                    >
                                        {props.authState.isLoading ? "Processing..." : buttonText}
                                    </button>
                                </div>

                                {!props.isSignup ? (
                                    <div className="text-center text-white mt-3">
                                        Don't have an account?{" "}
                                        <a href="/#/signUp" className="text-white fw-bold">
                                            Sign up
                                        </a>
                                    </div>
                                ) : (
                                    <div className="text-center text-white mt-3">
                                        Already have an account?{" "}
                                        <a href="/#/login" className="text-white fw-bold">
                                            Login
                                        </a>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
