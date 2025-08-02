class NavigationService {
    navigate;

    constructor() {
        this.navigate = null;
    }

    // Set the navigate function only once
    setNavigate(fn) {
        if (this.navigate) {
            return;
        }
        this.navigate = fn;
    }

    // Perform the navigation
    navigateTo(path) {
        if (this.navigate) {
            this.navigate(path);
        } else {
            console.error("Navigate function is not set. Failed to navigate");
        }
    }
}

// Singleton instance of the NavigationService
const navigationService = new NavigationService();

export default navigationService;
