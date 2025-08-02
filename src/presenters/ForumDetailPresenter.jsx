import { ForumDetailView } from "../views/ForumDetailView";
import { connect } from "react-redux";
import { mapDispatchToForumDetailProps, mapStateToForumDetailProps } from "../maps/forumMap";
import { ForumFaqView } from "../views/ForumFaqView";

function ForumDetailRender({ id, ...props }) {
    // render faq by default if no topic selected
    if (id === null) return <ForumFaqView {...props} />;
    return <ForumDetailView {...props} />;
}

export const ForumDetail = connect(mapStateToForumDetailProps, mapDispatchToForumDetailProps)(ForumDetailRender);
