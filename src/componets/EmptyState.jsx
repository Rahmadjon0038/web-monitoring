import Image from "next/image";
import React from "react";

function EmptyState({ message }) {
    return (
            <div className="flex border rounded-2xl mx-12 border-gray-400 flex-col items-center justify-center py-16 text-center">
                <Image
                    src="/nodata.png" // istasang rasmini qo‘yasan
                    alt="Empty"
                    width={300}
                    height={200}
                />
                <h2 className="text-xl mt-3 font-semibold text-gray-200">
                    {message || "Hozircha ma’lumot yo‘q"}
                </h2>
            </div>
    );
}

export default EmptyState;
