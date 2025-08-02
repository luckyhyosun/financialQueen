import { BigButtonLink } from "../components/BigButtonLink";
import { CategorySelector } from "../components/CategorySelector";
import { Suspense } from "../components/Suspense";
import { UserThumbnail } from "../components/UserThumbnail";
import { formatHumanDate } from "../helpers/date";
import "../../styles/form.css";
import { debounceIt } from "../helpers";

export function ForumDetailView({
    title,
    description,
    date,
    categories,
    replies,
    sender,
    isRepliesReady,
    isCurrentTopicNew,
    currentSenderPhoto,
    isReplyFormLoading,
    replyFormValue,
    resetTopicACB,
    dropCurrentTopicNewTagACB,
    handleReplySubmitACB,
    handleReplyFormChangeACB,
    repliesErrorMessage,
    replyFormErrorMessage,
}) {
    return (
        <div className="h-100 position-relative">
            <div className="row mb-2">
                {isCurrentTopicNew && (
                    <div className="text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="d-flex pl-2">
                            <div className="toast-body align-items-center mx-2">Successfully Added A New Topic</div>
                            <button
                                type="button"
                                className="btn-close btn-close-white me-2 m-auto"
                                aria-label="Close"
                                onClick={handleNativeToastClickACB}
                            ></button>
                        </div>
                    </div>
                )}
            </div>
            <div className="row gap-2" style={{ height: "97%" }}>
                <div className="col-md-2 d-none d-md-block">
                    <UserThumbnail imageUrl={sender.img} altText={sender.name} size={60} />
                </div>
                <div className="col-md-9 col-sm-10 py-2 h-75 border border-1 rounded-3 d-flex flex-column">
                    <div className="flex-0">
                        <h6 className="mb-0">{title}</h6>
                        <div className="text-white-50">
                            <span>{sender.name}</span>
                            {date && <span>, {formatHumanDate(date)}</span>}
                        </div>
                        <div className="my-2">
                            <CategorySelector
                                categoryList={categories}
                                selectedCategories={categories}
                                isUsingAllButton={false}
                            />
                        </div>
                        <p className="ml-1">{description}</p>
                    </div>
                    <div className="flex-grow-1 mb-2 overflow-y-auto overflow-x-hidden">
                        {isRepliesReady && replies.length > 0 ? (
                            replies.map(displayReplyItemCB)
                        ) : (
                            <Suspense context="replies" data={replies} error={repliesErrorMessage} />
                        )}
                    </div>
                    <form className="flex-0 d-flex flex-row" onSubmit={handleReplySubmitNativeACB}>
                        <div className="flex-0 align-self-center">
                            <UserThumbnail imageUrl={currentSenderPhoto} size={40} altText="user img" />
                        </div>
                        <div className="position-relative flex-grow-1 mx-1">
                            <textarea
                                value={replyFormValue}
                                id="replyComment"
                                placeholder="Leave a comment"
                                className="form-control bg-transparent text-white h-10 px-3 rounded-pill text-center resize-none"
                                onChange={handleReplyChangeNativeACB}
                            />
                            <div className="invalid-feedback d-block position-absolute top-100 start-50 translate-middle text-center mt-3">
                                {replyFormErrorMessage}
                            </div>
                        </div>
                        <div className="flex-0 align-self-center">
                            <button
                                className="btn btn-light flex-0 rounded-pill"
                                disabled={!isRepliesReady || isReplyFormLoading || replyFormValue === ""}
                            >
                                {isReplyFormLoading ? "Sending.." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="position-absolute bottom-0 end-0">
                <BigButtonLink
                    symbol="/images/icons/retake.svg"
                    text="Back to Forum"
                    handleOnClick={handleBigButtonClickACB}
                />
            </div>
        </div>
    );

    function handleNativeToastClickACB(e) {
        e.preventDefault();
        dropCurrentTopicNewTagACB();
    }

    function handleBigButtonClickACB() {
        resetTopicACB();
        if (isCurrentTopicNew) {
            dropCurrentTopicNewTagACB();
        }
    }

    function displayReplyItemCB({ id, text, sender, createdAt }) {
        return (
            <div key={`reply-${id}`} className="d-flex">
                <div className="h-60 w-60">
                    <UserThumbnail imageUrl={sender.img} size={40} altText={sender.name} />
                </div>
                <div className="mx-3">
                    <p className="mb-0">{text}</p>
                    <div className="text-white-50">
                        <span>{sender.name}</span>
                        {createdAt && <span>, {formatHumanDate(createdAt)}</span>}
                    </div>
                </div>
            </div>
        );
    }

    function handleReplyChangeNativeACB(e) {
        debounceIt(handleReplyFormChangeACB(e.target.value), 500);
    }

    function handleReplySubmitNativeACB(e) {
        e.preventDefault();
        const {
            replyComment: { value },
        } = e.target.elements;
        handleReplySubmitACB(value);
    }
}
