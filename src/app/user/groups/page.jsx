'use client'
import EmptyState from "@/componets/EmptyState";
import Loader from "@/componets/loader/Loader";
import { usemyGroups } from "@/hooks/groups";
import Link from "next/link";
import React from "react";

function GroupsPage() {
  const { data, isLoading, error } = usemyGroups();
  const groups = data?.groups || [];

  if (isLoading) return <Loader />
  if (error) return <EmptyState message={"Videolar hozircha mavjud emas"} />

  return (
    <div
      style={{
        background: 'url(/userProfile.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      className="py-20 px-4 sm:px-6 text-white min-h-screen"
    >
      <h1 className="text-2xl sm:text-3xl font-bold mb-10 text-center mt-10">
        Mening Guruhlarim
      </h1>

      {groups.length === 0 ? (
        <p className="text-gray-400 text-center text-lg">
          Hali hech qaysi guruhga qo‘shilmagansiz.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div
              key={group?.id}
              className="bg-transparent backdrop-blur-3xl border-2 border-gray-400 p-5 rounded-2xl shadow-lg transition hover:border-white"
            >
              <h2 className="text-xl font-semibold mb-3 break-words">{group?.name}</h2>

              <p className="text-gray-400 mb-1 text-base sm:text-lg">
                O‘qituvchi: <span className="text-white">{group?.teacher}</span>
              </p>
              <p className="text-gray-400 mb-1 text-base sm:text-lg">
                Ishtirokchilar: <span className="text-white">{group?.students} ta</span>
              </p>
              <p className="text-gray-400 mb-1 text-base sm:text-lg">
                Yaratilgan: <span className="text-white">{group?.createdAt}</span>
              </p>

              <Link href={`/user/groups/${group?.id}`}>
                <button
                  onClick={() => localStorage.setItem("groupname", group?.name)}
                  className="mt-4 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-medium w-full sm:w-auto"
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
