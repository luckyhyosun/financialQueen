import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { mapStateToEducationPropsCB, mapDispatchToEducationPropsACB } from "../maps/educationMap";
import { EducationPageView } from "../views/EducationPage";

export function EducationPresenter(props) {
    const books = useSelector((state) => state.book.books);
    const articles = useSelector((state) => state.article.articles);

    /**
     * Initialize data on component mount
     */
    function initializeDataEffectACB() {
        if (!props.podcasts.length && !props.podcastsLoading) {
            props.fetchPodcastsACB();
        }
    }

    /**
     * Lock scroll when this presenter is mounted
     */
    function lockScrollEffectACB() {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }

    /**
     * Handle podcast selection
     */
    function handlePodcastClickCB(description, url) {
        props.handlePodcastClickACB(description, url);
    }

    /**
     * Handle book selection
     */
    function handleBookClickCB(title) {
        props.handleBookClickACB(title);
    }

    /**
     * Handle article selection
     */
    function handleArticleClickCB(title) {
        props.handleArticleClickACB(title);
    }

    /**
     * Handle clearing selection
     */
    function handleClearSelectionCB() {
        props.resetDescriptionACB();
    }

    // Effects
    useEffect(initializeDataEffectACB, []);
    useEffect(lockScrollEffectACB, []);

    return (
        <EducationPageView
            // Podcast props
            podcasts={props.podcasts}
            podcastsLoading={props.podcastsLoading}
            podcastsError={props.podcastsError}
            selectedPodcastDescription={props.selectedPodcastDescription}
            selectedPodcastUrl={props.selectedPodcastUrl}
            // Book props
            books={books}
            bookDescription={props.bookDescription}
            bookLoading={props.bookLoading}
            bookError={props.bookError}
            // Article props
            articles={articles}
            selectedTitle={props.selectedTitle}
            // Event handlers
            handlePodcastClick={handlePodcastClickCB}
            handleBookClick={handleBookClickCB}
            handleArticleClick={handleArticleClickCB}
            handleClearSelection={handleClearSelectionCB}
        />
    );
}

export const Education = connect(mapStateToEducationPropsCB, mapDispatchToEducationPropsACB)(EducationPresenter);
