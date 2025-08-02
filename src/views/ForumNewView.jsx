import { UserThumbnail } from "../components/UserThumbnail";
import { CategorySelector } from "../components/CategorySelector";
import { BigButtonLink } from "../components/BigButtonLink";
import "../../styles/form.css";

export function ForumNewView({
    isLoading,
    currentUserPhoto,
    currentUserName,
    availableCategories,
    selectedCategories,
    selectFormCategoryACB,
    unselectFormCategoryACB,
    submitTopicACB,
    formErrorMessages,
}) {
    return (
        <div className="h-100 position-relative">
            <h3>New Topic</h3>
            <div className="d-flex">
                <div className="flex-0 p-4">
                    <UserThumbnail imageUrl={currentUserPhoto} altText={currentUserName} />
                </div>
                <form className="flex-1" onSubmit={handleNativeFormSubmitACB}>
                    <div className="form-group my-2 form-inline">
                        <label htmlFor="topicTitle" className="sr-only">
                            Topic
                        </label>
                        <input
                            className={`form-control bg-transparent text-white${isLoading ? "-50" : ""}`}
                            id="topicTitle"
                            type="text"
                            disabled={isLoading}
                        />
                        {formErrorMessages.title && (
                            <div className="invalid-feedback d-block">{formErrorMessages.title}</div>
                        )}
                    </div>
                    <div className="form-group my-2 has-validation">
                        <div className="sr-only">Categories</div>
                        <CategorySelector
                            categoryList={availableCategories}
                            selectedCategories={selectedCategories}
                            selectCategoryACB={selectFormCategoryACB}
                            removeCategoryACB={unselectFormCategoryACB}
                            isUsingAllButton={false}
                            isButtonDisabled={isLoading}
                        />
                        {formErrorMessages.category && (
                            <div className="invalid-feedback d-block">{formErrorMessages.category}</div>
                        )}
                    </div>
                    <div className="form-group my-2 has-validation">
                        <label htmlFor="topicQuestion" className="sr-only">
                            Question
                        </label>
                        <textarea
                            className={`form-control bg-transparent text-white${isLoading ? "-50" : ""} resize-none`}
                            type="textarea"
                            rows={5}
                            id="topicQuestion"
                            disabled={isLoading}
                        />
                        {formErrorMessages.description && (
                            <div className="invalid-feedback d-block">{formErrorMessages.description}</div>
                        )}
                    </div>
                    <button className="btn btn-light" disabled={isLoading}>
                        {isLoading ? "Submitting..." : "Submit"}
                    </button>
                    {formErrorMessages?.submission && (
                        <span className="text-error">{formErrorMessages.submission}</span>
                    )}
                </form>
            </div>

            <div className="position-absolute bottom-0 end-0">
                <BigButtonLink symbol="/images/icons/retake.svg" url="/forum" text="Back to Forum" />
            </div>
        </div>
    );

    function handleNativeFormSubmitACB(e) {
        e.preventDefault();
        const {
            topicTitle: { value: topicTitleValue },
            topicQuestion: { value: topicQuestionValue },
        } = e.target.elements;
        submitTopicACB(topicTitleValue, topicQuestionValue);
    }
}
