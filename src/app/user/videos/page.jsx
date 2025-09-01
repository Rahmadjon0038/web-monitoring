'use client'

import React, { useState } from 'react'
import { ThumbsUp } from 'lucide-react'

function page() {
    const [videos, setVideos] = useState([
        {
            id: 1,
            title: "Elman Antigeroy",
            description: "Bu darsda mexanikaning asosiy tushunchalari bilan tanishasiz.",
            embed: "https://www.youtube.com/embed/VnXovgiuYCw",
            date: "2025-01-20",
            likes: 12
        },
        {
            id: 2,
            title: "Jah Kahlib",
            description: "Ushbu videoda Nyutonning uchta asosiy qonunini o‘rganasiz.",
            embed: "https://www.youtube.com/embed/io-BG2YhXrA",
            date: "2025-02-01",
            likes: 8
        },
        {
            id: 3,
            title: "Alan dran",
            description: "Ushbu videoda Nyutonning uchta asosiy qonunini o‘rganasiz.",
            embed: "https://www.youtube.com/embed/fLUowJ1x3yc",
            date: "2025-02-01",
            likes: 8
        },
    ]);

    const handleLike = (id) => {
        setVideos(videos.map(v =>
            v.id === id ? { ...v, likes: v.likes + 1 } : v
        ));
    };

    return (
        <div className="min-h-screen px-6 pt-20 pb-10 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
            <h1 className="text-3xl font-bold mb-8">🎥 Video darslar</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map(video => (
                    <div
                        key={video.id}
                        className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700"
                    >
                        <div className="aspect-video">
                            <iframe
                                className="w-full h-full"
                                src={video.embed}
                                title={video.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        <div className="p-4">
                            <h2 className="text-lg font-semibold mb-1">{video.title}</h2>
                            <p className="text-sm text-gray-400 mb-2">📅 {video.date}</p>
                            <p className="text-sm text-gray-300 mb-4">{video.description}</p>

                            <button
                                onClick={() => handleLike(video.id)}
                                className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
                            >
                                <ThumbsUp size={18} /> {video.likes}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default page
