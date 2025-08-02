import { Link } from "react-router-dom";
import "../../styles/bigButtonLink.css";

export function BigButtonLink({ symbol, text, url, handleOnClick }) {
    return (
        <div className="d-flex flex-column text-center" style={{ width: 84 }}>
            <div className="mb-2">
                {url && (
                    <Link to={url} className="btn btn-outline-light btn-lg rounded-circle border-4 button-image">
                        <img src={symbol} />
                    </Link>
                )}
                {url == null && (
                    <button
                        className="btn btn-outline-light btn-lg rounded-circle border-4 button-image"
                        onClick={handleNativeClickACB}
                    >
                        <img src={symbol} />
                    </button>
                )}
            </div>
            <span className="lh-sm">{text}</span>
        </div>
    );
    function handleNativeClickACB(e) {
        e.preventDefault();
        handleOnClick();
    }
}
