import { connect } from "react-redux";
import { ForumNewView } from "../views/ForumNewView";
import { mapDispatchToForumNewProps, mapStateToForumNewProps } from "../maps/forumMap";

export const ForumNew = connect(mapStateToForumNewProps, mapDispatchToForumNewProps)(ForumNewView);
