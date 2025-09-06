'use client'

import React from 'react';
import { Plus, Users, Edit, Trash2, Eye, UserPlus } from 'lucide-react';
import { usedeleteGroup, usegetGroups } from '@/hooks/groups';
import GroupModal from '@/componets/modal/GroupModal';
import Loader from '@/componets/loader/Loader';
import AddGroupModal from '@/componets/modal/AddGroupModal';
import Link from 'next/link';

function page() {
  const { data, isLoading, error } = usegetGroups()
  const groups = data?.groups

  // ------------ delete group muatate -------------
  const deleteGroupMutation = usedeleteGroup();


  const deleteGroup = (id) => {
    deleteGroupMutation.mutate(id)
  }


  if (isLoading) return <Loader />
  if (error) return 'maluomt mavjud emas'

  return (
    <div style={{
      background: 'url(/userProfile.jpeg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }} className="min-h-screen px-6 pt-25 bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">📚 Guruhlar</h1>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl shadow-lg transition">
          <Plus size={20} />
          <GroupModal>
            Yangi Guruh
          </GroupModal>
        </button>
      </div>

      {/* Groups List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups?.map((group) => (
          <div
            key={group?.id}
            className="bg-transparent p-6 rounded-2xl shadow-lg hover:shadow-2xl transition flex flex-col justify-between border backdrop-blur-2xl border-gray-400"
          >
            {/* Group Header */}
            <div>
              <h2 className="text-xl font-bold text-white mb-2">id: {group?.id}</h2>
              <h2 className="text-xl font-bold text-white mb-2">{group?.name}</h2>
              <p className="text-gray-400 text-sm mb-2">👨‍🏫 O‘qituvchi: {group?.teacher}</p>
              <p className="text-gray-400 text-sm mb-2">📅 Yaratilgan: {group?.createdAt}</p>
              {/* <p className="text-gray-400 text-sm ">🔑 Guruh kodi: <span className="text-yellow-400 font-mono">{group?.code}</span></p> */}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-2 mt-4 text-gray-300">
              <Users size={18} />
              <span>{group?.students} ta o‘quvchi</span>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-700">
              <Link href={`/admin/groups/${group?.id}`}>
                <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition">
                  <Eye size={18} /> Ko‘rish
                </button>
              </Link>
              <button className="flex items-center gap-1 text-green-400 hover:text-green-300 transition">
                <Edit size={18} /> Tahrirlash
              </button>
              <button onClick={() => deleteGroup(group?.id)} className="flex items-center gap-1 text-red-400 hover:text-red-300 transition">
                <Trash2 size={18} /> O‘chirish
              </button>

            </div>

            {/* Add Student */}
            <div className="mt-4">
              <AddGroupModal groupId={group?.id}>
                <button className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-xl transition">
                  <UserPlus size={18} />
                  O‘quvchi qo‘shish
                </button>
              </AddGroupModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
