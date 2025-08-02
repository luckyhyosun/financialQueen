function Footer({ className }) {
    return (
        <footer className={`text-white py-2 ${className}`}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <p className="mb-0 small">Once Upon a Budget</p>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <p className="mb-0 small">© 2025 Once Upon a Budget</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export { Footer };