'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Save, Check, Minus, Plus } from 'lucide-react';
import { usegetMonthStudents, usescoreMonthStudents } from '@/hooks/month';
import axios from 'axios';
import Loader from '@/componets/loader/Loader';

function Page() {
    const { id, month } = useParams();
    const { data, isLoading, error } = usegetMonthStudents(month);
    //  score student add
    const scoreMonthStudentsMutation = usescoreMonthStudents()

    const [students, setStudents] = useState([]);
    const [savingId, setSavingId] = useState(null);
    const [savedId, setSavedId] = useState(null);

    // Data kelganda state ga set qilamiz
    useEffect(() => {
        if (data?.length) setStudents(data);
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
        scoreMonthStudentsMutation.mutate({ monhtId: month, studentId, score })
    };

    if (isLoading) return <Loader />
    if (error) return <div className="text-red-500 p-10">❌ Xatolik: {error.message}</div>;

    return (
        <div
            className="min-h-screen pt-25 px-6 text-white"
            style={{
                background: 'url(/userProfile.jpeg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="mx-12">
                <h1 className="text-3xl font-bold mb-6 text-center">📅 Oy: {month}</h1>

                <div className="space-y-4">
                    {students.map(s => (
                        <div
                            key={s.id}
                            className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/20 transition"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-white/15 flex items-center justify-center text-lg font-bold">
                                    {s.name?.[0]?.toUpperCase() || "U"}
                                </div>
                                <div>
                                    <div className="font-semibold">{s.name}</div>
                                    <div className="text-xs text-gray-300">ID: {s.id}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
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
                                    className="w-24 text-center px-3 py-2 rounded-lg text-white"
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
                                            <Check size={18} />
                                            Saqlandi
                                        </>
                                    ) : (
                                        <>
                                            <Save size={18} />
                                            {savingId === s.id ? "Saqlanmoqda..." : "Saqlash"}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Page;
