"use client";

import React from "react";

interface SketchfabEmbedProps {
    url: string;
    title: string;
}

export function SketchfabEmbed({ url, title }: SketchfabEmbedProps) {
    // Extract UID from URL
    // Example: https://sketchfab.com/3d-models/model-name-uid
    // or https://sketchfab.com/models/uid
    const getUid = (url: string) => {
        try {
            const parts = url.split("/");
            const lastPart = parts[parts.length - 1];
            // If last part is just the UID (no dashes usually for /models/uid format, but /3d-models/name-uid has dashes)
            if (url.includes("/models/")) {
                return lastPart;
            }
            if (url.includes("/3d-models/")) {
                const nameParts = lastPart.split("-");
                return nameParts[nameParts.length - 1];
            }
            return lastPart;
        } catch (e) {
            return "";
        }
    };

    const uid = getUid(url);

    if (!uid) return null;

    return (
        <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg bg-muted">
            <iframe
                title={title}
                frameBorder="0"
                allowFullScreen
                // mozallowfullscreen="true"
                // webkitallowfullscreen="true"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                xhr-spatial-tracking="execution-while-out-of-viewport"
                execution-while-not-rendered="true"
                web-share="true"
                src={`https://sketchfab.com/models/${uid}/embed`}
                className="w-full h-full"
            ></iframe>
        </div>
    );
}
