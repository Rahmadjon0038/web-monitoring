'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Save, Check, Minus, Plus } from 'lucide-react';
import { usegetMonthStudents, usescoreMonthStudents } from '@/hooks/month';
import Loader from '@/componets/loader/Loader';
import { useRole } from '@/context/userContext';

function Page() {
  const { id, month } = useParams();
  const { data, isLoading, error } = usegetMonthStudents(month);
  const scoreMonthStudentsMutation = usescoreMonthStudents();
  const { monthName, setMonthName } = useRole();

  const [students, setStudents] = useState([]);
  const [savingId, setSavingId] = useState(null);
  const [savedId, setSavedId] = useState(null);

  // Data kelganda state ga set qilamiz
  useEffect(() => {
    if (data?.length) setStudents(data);
  }, [data]);

  // Top student aniqlash
  useEffect(() => {
    if (!data || data.length === 0) return;
    let topStudent = data[0];
    data.forEach(item => {
      if (item?.score > topStudent.score) topStudent = item;
    });
    localStorage.setItem('toptudent', topStudent?.name);
  }, [data]);

  const handleScoreChange = (studentId, value) => {
    const num = Number(value);
    const safe = Number.isFinite(num) && num >= 0 ? Math.floor(num) : 0;
    setStudents(prev =>
      prev.map(s => (s.id === studentId ? { ...s, score: safe } : s))
    );
  };

  const bump = (studentId, delta) => {
    setStudents(prev =>
      prev.map(s =>
        s.id === studentId
          ? { ...s, score: Math.max(0, (s.score || 0) + delta) }
          : s
      )
    );
  };

  const handleSave = async (studentId, score) => {
    setSavingId(studentId);
    scoreMonthStudentsMutation.mutate(
      { monthId: month, studentId, score },
      {
        onSuccess: () => {
          setSavedId(studentId);
          setTimeout(() => setSavedId(null), 2000);
        },
        onSettled: () => setSavingId(null),
      }
    );
  };

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div className="text-red-500 p-10">❌ Xatolik: {error.message}</div>
    );

  return (
    <div
      className="min-h-screen py-24 px-4 sm:px-6 md:px-12 text-white"
      style={{
        background: 'url(/userProfile.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        📅 Oy: {month}
      </h1>

      <div className="space-y-4">
        {students.map(s => (
          <div
            key={s.id}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-lg p-4 hover:border-white/30 transition"
          >
            {/* Student Info */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
                {s.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <div className="font-semibold">{s.name}</div>
                <div className="text-xs text-gray-300">ID: {s.id}</div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
              <button
                onClick={() => bump(s.id, -2)}
                className="p-2 rounded-lg border border-white/10 hover:border-white/30 bg-white/5 transition"
              >
                <Minus size={18} />
              </button>

              <input
                type="number"
                min={0}
                step={2}
                value={s.score}
                onChange={e => handleScoreChange(s.id, e.target.value)}
                className="w-20 text-center px-3 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                onClick={() => bump(s.id, 2)}
                className="p-2 rounded-lg border border-white/10 hover:border-white/30 bg-white/5 transition"
              >
                <Plus size={18} />
              </button>

              <button
                onClick={() => handleSave(s.id, s.score)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition disabled:opacity-60"
                disabled={savingId === s.id}
              >
                {savedId === s.id ? (
                  <>
                    <Check size={18} /> Saqlandi
                  </>
                ) : savingId === s.id ? (
                  'Saqlanmoqda...'
                ) : (
                  <>
                    <Save size={18} /> Saqlash
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
