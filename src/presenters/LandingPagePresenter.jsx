import { connect } from "react-redux";
import { LandingPageView } from "../views/LandingPageView.jsx";
import { mapDispatchToLandingProps } from "../maps/landingMap.js";

export const LandingPage = connect(null, mapDispatchToLandingProps)(LandingPageView);
