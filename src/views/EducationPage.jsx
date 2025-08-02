export function EducationPageView(props) {
    return (
        <div className="h-100 overflow-auto" style={{ height: "100vh", overflowY: "auto" }}>
            <main className="container-fluid py-5 text-white">
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-12 col-md-8">
                            <h3 className="mt-4">Podcast</h3>
                            <div className="d-flex flex-nowrap gap-3 overflow-auto pb-2">
                                {props.bookLoading && props.podcastsLoading ? (
                                    <p>Loading podcasts...</p>
                                ) : (
                                    props.podcasts.map((podcast) => (
                                        <div key={podcast.id} className="flex-shrink-0" style={{ width: "100px" }}>
                                            <img
                                                src={podcast.images?.[0]?.url}
                                                alt={podcast.name}
                                                className="img-fluid rounded cursor-pointer"
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    objectFit: "cover",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                    props.handlePodcastClick(
                                                        podcast.description,
                                                        podcast.external_urls.spotify,
                                                        podcast.name
                                                    );
                                                }}
                                            />
                                        </div>
                                    ))
                                )}
                            </div>

                            <h3 className="mt-4">Book</h3>
                            <div className="d-flex flex-nowrap gap-3 overflow-auto pb-2">
                                {props.books.map((book, idx) => (
                                    <div key={idx} className="flex-shrink-0">
                                        <img
                                            src={`/images/resources/${book.img}`}
                                            alt={`Book ${idx}`}
                                            className="img-fluid rounded cursor-pointer"
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                objectFit: "cover",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => {
                                                props.handleBookClick(book.title);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>

                            <h3 className="mt-4">Article</h3>
                            <div className="d-flex flex-nowrap gap-3 overflow-auto pb-2">
                                {props.articles.map((article, idx) => (
                                    <div key={idx} className="flex-shrink-0">
                                        <img
                                            src={`/images/resource/${article.img}`}
                                            alt={`Article ${idx}`}
                                            className="img-fluid rounded cursor-pointer"
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                objectFit: "cover",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => {
                                                props.handleArticleClick(article.title);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-12 col-md-4 text-center">
                            <h2 className="mb-4 text-start">{props.selectedTitle || "Description"}</h2>
                            <div
                                className="p-3 border rounded text-start btn-outline-light"
                                style={{
                                    height: "400px",
                                    overflowY: "auto",
                                    maxHeight: "60vh",
                                    minHeight: "300px",
                                }}
                            >
                                {props.selectedPodcastDescription ? (
                                    <>
                                        <div
                                            className="small"
                                            dangerouslySetInnerHTML={{
                                                __html: props.selectedPodcastDescription.replace(/\n/g, "<br>"),
                                            }}
                                        />
                                        <div className="mt-3 text-center">
                                            {props.selectedPodcastUrl && (
                                                <a
                                                    href={props.selectedPodcastUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-light btn-sm"
                                                >
                                                    {props.selectedPodcastUrl.includes("spotify")
                                                        ? "Listen to Podcast"
                                                        : props.selectedPodcastUrl.includes("books")
                                                          ? "Check out Book"
                                                          : "Check out Article"}
                                                </a>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <small>Click on an item to see its description.</small>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Add some bottom padding so content doesn't get cut off */}
                <div style={{ height: "100px" }}></div>
            </main>
        </div>
    );
}
