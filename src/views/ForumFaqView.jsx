import { BigButtonLink } from "../components/BigButtonLink";
import "../../styles/heading.css";

export function ForumFaqView(props) {
    return (
        <div className="h-100 position-relative">
            <h2 className="page-heading">Welcome To The Magical Forum!</h2>
            <div className="row">
                <div className="row my-2">
                    <p className="text-white-75">
                        Here, questions are the beginning of every great adventure. Whether you're chasing dreams,
                        exploring new ideas, crossing uncharted waters, or embracing who you truly are.
                    </p>
                    <p className="text-white-75">
                        Here, every voice matters, and every story has the power to inspire. Big or small, bold or
                        curious, just ask away!
                    </p>
                    <p className="text-white-75">
                        But magic grows when we lift each other. If you see a question you can help with, just jump in!
                        Your insight might be just what someone need.
                    </p>
                </div>
                <div className="row">
                    <h5>
                        <i className="bi bi-stars text-warning"></i>
                        <span className="mx-2">Let the conversation sparkle!</span>
                        <i className="bi bi-stars text-warning"></i>
                    </h5>
                </div>
            </div>
            <div className="position-absolute bottom-0 end-0">
                <BigButtonLink
                    symbol="/images/icons/plus.svg"
                    handleOnClick={handleNewFormClickACB}
                    text="Ask Question"
                />
            </div>
        </div>
    );

    function handleNewFormClickACB() {
        props.resetNewTopicFormACB();
        window.location.hash = "/forum/new";
    }
}
