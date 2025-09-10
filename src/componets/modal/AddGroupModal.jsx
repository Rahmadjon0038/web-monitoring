'use client'
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { usegetAllusers } from "@/hooks/auth";
import { SquarePlus } from "lucide-react";
import { useaddGroup } from "@/hooks/groups";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%", // mobil uchun deyarli to‘liq
  maxWidth: 800, // katta ekranlarda 800px dan oshmaydi
  maxHeight: "90vh", // balandlikdan chiqib ketmasin
  bgcolor: "rgba(255, 255, 255, 0.05)",
  color: "#fff",
  borderRadius: "16px",
  backdropFilter: "blur(15px) saturate(180%)",
  WebkitBackdropFilter: "blur(15px) saturate(180%)",
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  p: 4,
  overflowY: "auto", // uzun bo‘lsa scroll
};

export default function AddGroupModal({ groupId, children }) {
  const { data, isLoading, error } = usegetAllusers();
  const users = data?.users;
  const addGroupMutation = useaddGroup();

  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (id) => {
    const addData = {
      groupId,
      userId: id,
    };
    addGroupMutation.mutate(addData);
  };

  if (error) return "Ma’lumot mavjud emas";

  return (
    <div className="relative">
      <span onClick={() => setOpen(true)}>{children}</span>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography
            variant="h6"
            mb={2}
            textAlign="center"
            sx={{ fontWeight: "bold", letterSpacing: 1 }}
            className="flex items-center gap-2"
          >
            Guruhga qo‘shish
          </Typography>

          {/* Jadval scroll qilinadigan bo‘ldi */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[500px]">
              <thead className="bg-gray-800 text-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left">Id</th>
                  <th className="px-4 py-3 text-left">Ism</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-center">Qo‘shish</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr
                    key={user?.id}
                    className="border-b border-gray-700 hover:bg-gray-800 transition"
                  >
                    <td className="px-4 py-3 font-medium">{user?.id}</td>
                    <td className="px-4 py-3 font-medium">{user?.name}</td>
                    <td className="px-4 py-3">{user?.email}</td>
                    <td className="text-center">
                      <SquarePlus
                        onClick={() => handleSubmit(user?.id)}
                        className="cursor-pointer mx-auto text-blue-400 hover:text-blue-500 transition"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
