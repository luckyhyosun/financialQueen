export function UserThumbnail({ imageUrl, size, altText }) {
    return (
        <>
            <img
                src={imageUrl && imageUrl != "" ? imageUrl : "/images/login/ArielProfilePicture.png"}
                className="object-fit-cover rounded-circle mw-5 mh-5"
                style={{ height: size ?? 60, width: size ?? 60 }}
                alt={altText ?? "user-image"}
                key={"user-image-" + altText}
            />
        </>
    );
}
