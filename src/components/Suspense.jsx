export function Suspense({ context, data, error }) {
    if (error) {
        return (
            <div className="text-center">
                Error Loading {context} : {error}
            </div>
        );
    }

    if (data && data.length === 0) {
        return <div className="text-center">No {context}</div>;
    }
    return <div className="text-center">Loading {context}...</div>;
}
