'use client'
import EmptyState from "@/componets/EmptyState";
import Loader from "@/componets/loader/Loader";
import { usemyGroups } from "@/hooks/groups";
import Cookies from "js-cookie";
import Link from "next/link";
import React from "react";

function GroupsPage() {
    const { data, isLoading, error } = usemyGroups();
    const groups = data?.groups

    const setGroupname = (groupname) => {
        localStorage.setItem('groupname', groupname)
    }

    if (isLoading) return <Loader />
    if (error) return <EmptyState message={"Videolar hozircha mavjud emas"} />

    return (
        <div style={{
            background: 'url(/userProfile.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center'
        }} className="pt-20 px-6 text-white min-h-screen bg-gray-900">
            <h1 className="text-3xl font-bold mb-12 text-center mt-12">Mening Guruhlarim</h1>

            {groups.length === 0 ? (
                <p className="text-gray-400">Hali hech qaysi guruhga qo‘shilmagansiz.</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {groups?.map((group) => (
                        <div
                            key={group?.id}
                            className="bg-transparent backdrop-blur-3xl border-2 border-gray-400 p-5 rounded-2xl shadow-lg  transition">
                            <h2 className="text-xl font-semibold mb-2">{group?.name}</h2>

                            <p className="text-gray-400 mb-1 text-xl">
                                O‘qituvchi: {group?.teacher}
                            </p>
                            <p className="text-xl text-gray-400 mb-1">
                                Ishtirokchilar: {group?.students} ta
                            </p>
                            <p className="text-xl text-gray-400 mb-1">
                                Yaratilgan: {group?.createdAt}
                            </p>

                            <Link href={`/user/groups/${group?.id}`}>
                                <button
                                    onClick={() => localStorage.setItem("groupname", group?.name)}
                                    className="mt-4 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-medium"
                                >
                                    Guruhga kirish
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default GroupsPage;
