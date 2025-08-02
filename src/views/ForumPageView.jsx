import { Outlet } from "react-router-dom";
import { Suspense } from "../components/Suspense";
import { CategorySelector } from "../components/CategorySelector";
import { formatHumanDate } from "../helpers/date";
import { UserThumbnail } from "../components/UserThumbnail";

export function ForumPageView({
    isTopicsReady,
    topics,
    topicsErrorMessage,
    selectTopicACB,
    topicCategories,
    selectedCategories,
    selectedTopicID,
    selectForumCategoryACB,
    unselectForumCategoryACB,
    selectAllForumCategoryACB,
}) {
    return (
        <main className="container-fluid w-100 h-100 text-white">
            <div className="container mh-100 h-100 pt-5 pb-1">
                <div className="row mh-100 h-100 overflow-y-auto">
                    <div className="col-md-5 h-60 d-sm-block d-md-none">
                        <Outlet />
                    </div>
                    <div className={`h-100 flex-column col-md-7 ${selectedTopicID ? "d-none" : ""} d-md-flex`}>
                        <h2>Categories</h2>
                        <CategorySelector
                            categoryList={topicCategories}
                            selectedCategories={selectedCategories}
                            selectCategoryACB={selectForumCategoryACB}
                            removeCategoryACB={unselectForumCategoryACB}
                            selectAllCategoryACB={selectAllForumCategoryACB}
                        />
                        <h2>Talks</h2>
                        <div className="flex-grow-1 overflow-y-auto overflow-x-hidden">
                            {(!isTopicsReady || topics.length < 1) && (
                                <Suspense context="Topics" data={topics} error={topicsErrorMessage} />
                            )}
                            {isTopicsReady && topics.map(displayTopicItemCB)}
                        </div>
                    </div>
                    <div className="col-md-5 h-100 d-none d-sm-none d-md-block">
                        <Outlet />
                    </div>
                </div>
            </div>
        </main>
    );

    function displayTopicItemCB({ id, title, sender, date }) {
        return (
            <div key={id} className="d-flex py-2">
                <div className="h-60 w-60">
                    <UserThumbnail imageUrl={sender.img} size={60} />
                </div>
                <div className="px-3 d-flex">
                    <div className="py-0 px-1 align-top">•</div>
                    <div className="row">
                        <a className="h5 col-9 text-truncate" onClick={handleTopicSelectionACB} href="#">
                            {title}
                        </a>
                        <div className="text-white-50">
                            <span>{sender.name}</span>
                            {date && <span>, {formatHumanDate(date)}</span>}
                        </div>
                    </div>
                </div>
            </div>
        );

        function handleTopicSelectionACB(e) {
            e.preventDefault();
            selectTopicACB(id);
            window.location.hash = "/forum";
        }
    }
}
