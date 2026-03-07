
import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";

export default function FaceExpression({ onMoodDetected }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);
    const initializedRef = useRef(false); // ✅ guard flag

    const [expression, setExpression] = useState("Detecting...");

    useEffect(() => {
        if (initializedRef.current) return; // ✅ only init once
        initializedRef.current = true;

        init({ landmarkerRef, videoRef, streamRef });

        return () => {
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }
            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    const handleDetect = () => {
        detect({
            landmarkerRef,
            videoRef,
            setExpression: (mood) => {
                setExpression(mood);
                if (onMoodDetected) onMoodDetected(mood);
            }
        });
    };

    return (
        <div className="face-expression">
            <video
                ref={videoRef}
                className="face-expression__video"
                playsInline
            />
            <button
                id="face-detect-trigger"
                className="face-expression__hidden-btn"
                onClick={handleDetect}
            >
                Detect
            </button>
        </div>
    );
}