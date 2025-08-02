import { ForumPageView } from "../views/ForumPageView";
import { connect } from "react-redux";
import { mapDispatchToForumProps, mapStateToForumProps } from "../maps/forumMap";

function Forum({ isInitialRender, initialTopicRenderACB, ...props }) {
    if (isInitialRender) initialTopicRenderACB();
    return <ForumPageView {...props} />;
}

export const ForumPage = connect(mapStateToForumProps, mapDispatchToForumProps)(Forum);
