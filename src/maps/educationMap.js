import { fetchPodcasts, setSelectedPodcastDescription } from "../store/slices/podcastSlice";
import { bookClicked, articleClicked, podcastClicked } from "../store/slices/educationSlice";

export function mapStateToEducationPropsCB(state) {
    return {
        // Podcast state
        podcasts: state.podcasts.podcasts,
        podcastsLoading: state.podcasts.loading,
        podcastsError: state.podcasts.error,
        selectedPodcastDescription: state.podcasts.selectedPodcastDescription,
        selectedPodcastUrl: state.podcasts.selectedPodcastUrl,

        // Book state
        books: state.book.books,
        bookDescription: state.book.bookDescription,
        bookLoading: state.book.loading,
        bookError: state.book.error,

        // Article state
        articles: state.article.articles,

        // Get selectedTitle from education slice (not article slice)
        selectedTitle: state.education.selectedTitle,
    };
}

export function mapDispatchToEducationPropsACB(dispatch) {
    return {
        // Async thunks
        fetchPodcastsACB() {
            dispatch(fetchPodcasts());
        },

        // Sync actions
        handlePodcastClickACB(description, url, title) {
            dispatch(setSelectedPodcastDescription({ description, url }));
            dispatch(podcastClicked({ title }));
        },

        handleBookClickACB(title) {
            dispatch(bookClicked({ title }));
        },

        handleArticleClickACB(title) {
            dispatch(articleClicked({ title }));
        },

        resetDescriptionACB() {
            dispatch(setSelectedPodcastDescription({ description: null, url: null }));
        },
    };
}
