'use client'
import React, { useState } from 'react'
import { Edit, Trash2, ThumbsUp } from 'lucide-react'
import { usedeleteVideo, useGetVideo, uselikeVideo } from '@/hooks/videoLessons';
import EmptyState from '@/componets/EmptyState';
import Loader from '@/componets/loader/Loader';
import { FaPlusCircle } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import Videomodal from '@/componets/modal/Modal';
function page() {
    // ------------ Get video hook ------------
    const { data, isLoading, error } = useGetVideo()
    const videos = data
    // --------------Delete video hook --------------
    const deleteVideo = usedeleteVideo()
    // const [videos, setVideos] = useState([
    //     // {
    //     //     id: 1,
    //     //     title: "Elman Antigeroy",
    //     //     description: "Bu darsda mexanikaning asosiy tushunchalari bilan tanishasiz.",
    //     //     embed: "https://www.youtube.com/embed/VnXovgiuYCw",
    //     //     date: "2025-01-20",
    //     //     likes: 12
    //     // },
    //     // {
    //     //     id: 2,
    //     //     title: "Jah Kahlib",
    //     //     description: "Ushbu videoda Nyutonning uchta asosiy qonunini o‘rganasiz.",
    //     //     embed: "https://www.youtube.com/embed/io-BG2YhXrA",
    //     //     date: "2025-02-01",
    //     //     likes: 8
    //     // },
    //     // {
    //     //     id: 3,
    //     //     title: "Alan dran",
    //     //     description: "Ushbu videoda Nyutonning uchta asosiy qonunini o‘rganasiz.",
    //     //     embed: "https://www.youtube.com/embed/fLUowJ1x3yc",
    //     //     date: "2025-02-01",
    //     //     likes: 8
    //     // }, 
    //     {
    //         id: 4,
    //         title: "Alan Walker - Play",
    //         description: "Ushbu videoda Nyutonning uchta asosiy qonunini o‘rganasiz.",
    //         embed: "https://www.youtube.com/embed/YQRHrco73g4",
    //         date: "2025-02-01",
    //         likes: 8
    //     },
    // ]);
    // //   

    // Like bosilganda ishlaydi
    const handleDelete = (id) => {
        deleteVideo.mutate(id)
    }

    // --------------- Like video ------------
    const likeVideoMutation = uselikeVideo()
    const handleLike = (id) => {
        likeVideoMutation.mutate(id)
    }

    if (isLoading) return <Loader />
    if (error) return "qandeydur xatolik"

    return (
        <div className="min-h-screen px-6 pt-30 pb-10 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold flex items-center gap-4"><MdOutlineOndemandVideo size={40} /> Video darslar</h1>
                <Videomodal>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md  flex items-center gap-2">
                        <FaPlusCircle /> Yangi video qo‘shish
                    </button>
                </Videomodal>
            </div>

            {/* Videos Grid */}
            {videos.length == 0 ? <EmptyState message={"Hozircha video darslar mavjud emas"} /> :

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos?.map(video => (
                        <div
                            key={video?.id}
                            className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
                            {/* Video */}
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

                            {/* Info */}
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-1">{video?.title}</h2>
                                <p className="text-sm text-gray-400 mb-3">📅 {video?.date}</p>
                                <p className="text-sm text-gray-300 mb-4">{video?.description}</p>

                                {/* Actions */}
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-3">
                                        <button className="text-green-400 hover:text-green-300 flex items-center gap-1">
                                            <Edit size={18} /> Tahrirlash
                                        </button>
                                        <button onClick={() => handleDelete(video?.id)} className="text-red-400 hover:text-red-300 flex items-center gap-1">
                                            <Trash2 size={18} /> O‘chirish
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => handleLike(video?.id)}
                                        className="flex items-center gap-1 text-blue-400 hover:text-blue-300">
                                        <ThumbsUp size={18} /> {video?.likes}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default page
