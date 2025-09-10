'use client'
import React from 'react'
import { Edit, Trash2, ThumbsUp } from 'lucide-react'
import { usedeleteVideo, useGetVideo, uselikeVideo } from '@/hooks/videoLessons';
import EmptyState from '@/componets/EmptyState';
import Loader from '@/componets/loader/Loader';
import { FaPlusCircle } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import Videomodal from '@/componets/modal/Modal';

function Page() {
    // ------------ Get video hook ------------
    const { data, isLoading, error } = useGetVideo()
    const videos = data
    // --------------Delete video hook --------------
    const deleteVideo = usedeleteVideo()

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
    if (error) return "Qandaydur xatolik"

    return (
        <div className="min-h-screen px-4 sm:px-6 pt-24 sm:pt-28 pb-10 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3 sm:gap-4">
                    <MdOutlineOndemandVideo size={3} className="sm:size-10" /> Video darslar
                </h1>
                <Videomodal>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md flex items-center gap-2 text-sm sm:text-base">
                        <FaPlusCircle /> Yangi video qo‘shish
                    </button>
                </Videomodal>
            </div>

            {/* Videos Grid */}
            {videos.length === 0 ? (
                <EmptyState message={"Hozircha video darslar mavjud emas"} />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos?.map(video => (
                        <div
                            key={video?.id}
                            className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 flex flex-col"
                        >
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
                            <div className="p-4 flex flex-col flex-grow">
                                <h2 className="text-lg font-semibold mb-1 line-clamp-1">{video?.title}</h2>
                                <p className="text-xs sm:text-sm text-gray-400 mb-2">📅 {video?.date}</p>
                                <p className="text-sm text-gray-300 mb-4 line-clamp-2">{video?.description}</p>

                                {/* Actions */}
                                <div className="mt-auto flex justify-between items-center">
                                    <div className="flex gap-3">
                                        <Videomodal editVideo={video} edit={true}>
                                            <button className="text-green-400 hover:text-green-300 flex items-center gap-1 text-sm">
                                                <Edit size={16} /> Tahrirlash
                                            </button>
                                        </Videomodal>
                                        <button
                                            onClick={() => handleDelete(video?.id)}
                                            className="text-red-400 hover:text-red-300 flex items-center gap-1 text-sm"
                                        >
                                            <Trash2 size={16} /> O‘chirish
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => handleLike(video?.id)}
                                        className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm"
                                    >
                                        <ThumbsUp size={16} /> {video?.likes}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Page
