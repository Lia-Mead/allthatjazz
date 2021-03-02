import { useState, useEffect } from "react";

export default function Playlist() {
    const [musicPlaylist, setMusicPlaylist] = useState("");

    let selectMood = [
        {
            name: "Choose a music genre",
            key: "choose",
            value: "choose",
        },
        {
            name: "Morning",
            key: "morning",
            value: "morning",
        },
        {
            name: "Hungry",
            key: "hungry",
            value: "hungry",
        },
        {
            name: "Heart Broken",
            key: "broken",
            value: "broken",
        },
        {
            name: "Dreamy",
            key: "dreamy",
            value: "dreamy",
        },
        {
            name: "Night",
            key: "night",
            value: "night",
        },
    ];

    let src;
    if (musicPlaylist == "morning") {
        src = "https://open.spotify.com/embed/artist/7DWL1f2n0bdG747Hb1SUrC";
    } else if (musicPlaylist == "hungry") {
        src = "https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO2mAKkP";
    } else if (musicPlaylist == "broken") {
        src = "https://open.spotify.com/embed/playlist/14TEPOtQoGj5DYRi146Y9G";
    } else if (musicPlaylist == "dreamy") {
        src = "https://open.spotify.com/embed/playlist/3esJMo2rJbwMDnsm1drCuG";
    } else if (musicPlaylist == "night") {
        src = "https://open.spotify.com/embed/playlist/37i9dQZF1DX4wta20PHgwo";
    }

    return (
        <div className="iframe-box">
            <iframe
                src={src}
                width="300"
                height="80"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
            ></iframe>

            <select
                id="music"
                name="music"
                onChange={(e) => setMusicPlaylist(e.target.value)}
            >
                {selectMood.map((item) => (
                    <option key={item.key} value={item.value} type="text">
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
