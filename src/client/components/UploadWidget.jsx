import React, { useEffect, useState } from "react";

function UploadWidget({ uwConfig, setPublicId }) {
    const [widget, setWidget] = useState(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.async = true;

        script.onload = () => {
            setWidget(window.cloudinary.createUploadWidget(
                uwConfig,
                (error, result) => {
                    if (!error && result && result.event === "success") {
                        console.log("Done! Here is the image info: ", result.info);
                        setPublicId(result.info.public_id);
                    }
                }
            ));
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [uwConfig, setPublicId]);

    const openWidget = () => {
        if (widget) widget.open();
    };

    return (
        <button
            id="upload_widget"
            className="cloudinary-button"
            onClick={openWidget}
        >
            Upload
        </button>
    );
}

export default UploadWidget;
