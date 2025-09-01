'use client'
import React, { useState } from 'react'
import { ThumbsUp } from 'lucide-react'
import { useGetVideo, uselikeVideo } from '@/hooks/videoLessons'
import Loader from '@/componets/loader/Loader'
import EmptyState from '@/componets/EmptyState'
import { MdOutlineOndemandVideo } from "react-icons/md";

function page() {
    // ------------ Get video hook ------------
    const { data, isLoading, error } = useGetVideo()
    const videos = data

    const likeVideoMutation = uselikeVideo()
    const handleLike = (id) => {
        likeVideoMutation.mutate(id)
    }

    if (isLoading) return <Loader />
    if (error) return <EmptyState message={"Videolar hozircha mavjud emas"} />


    return (
        <div className="min-h-screen px-6 pt-30 pb-10 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
            <h1 className="text-3xl mb-6 font-bold flex items-center gap-4"><MdOutlineOndemandVideo size={40} /> Video darslar</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map(video => (
                    <div
                        key={video?.id}
                        className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700"
                    >
                        <div className="aspect-video">
                            <iframe
                                className="w-full h-full"
                                src={video?.embed}
                                title={video?.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        <div className="p-4">
                            <h2 className="text-lg font-semibold mb-1">{video?.title}</h2>
                            <p className="text-sm text-gray-400 mb-2">📅 {video?.date}</p>
                            <p className="text-sm text-gray-300 mb-4">{video?.description}</p>

                            <button
                                onClick={() => handleLike(video?.id)}
                                className="flex items-center gap-1 text-blue-400 hover:text-blue-300"
                            >
                                <ThumbsUp size={18} /> {video?.likes}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default page
