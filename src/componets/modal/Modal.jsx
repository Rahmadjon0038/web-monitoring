'use clinet'
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { usesetVideo } from "@/hooks/videoLessons";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 420,
    bgcolor: "rgba(255, 255, 255, 0.05)", // yarim shaffof fon
    color: "#fff",
    borderRadius: "16px",
    backdropFilter: "blur(15px) saturate(180%)", // blur va saturatsiya
    WebkitBackdropFilter: "blur(15px) saturate(180%)", // safari support
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)", // yumshoq soyali
    border: "1px solid rgba(255, 255, 255, 0.18)",
    p: 4,
};

export default function Videomodal({ children }) {
    const setVideoMutation = usesetVideo();
    const [open, setOpen] = React.useState(false);
    const [form, setForm] = React.useState({
        title: "",
        description: "",
        embed: "",
        date: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Hozirgi sanani olish (YYYY-MM-DD formatida)
        const today = new Date().toISOString().split("T")[0];

        const newData = { ...form, date: today };

        console.log(newData);
        setVideoMutation.mutate(newData)

        setOpen(false);
        setForm({ title: "", description: "", embed: "" });
    };

    return (
        <div>
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
                        <MdOutlineOndemandVideo size={26} /> Yangi dars qo‘shish
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                name="title"
                                label="Sarlavha"
                                variant="outlined"
                                value={form.title}
                                onChange={handleChange}
                                InputProps={{
                                    style: { color: "#fff" },
                                }}
                                InputLabelProps={{ style: { color: "#bbb" } }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                                        "&:hover fieldset": { borderColor: "#1976d2" },
                                        "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                                    },
                                }}
                            />
                            <TextField
                                name="description"
                                label="Tavsif"
                                variant="outlined"
                                value={form.description}
                                onChange={handleChange}
                                multiline
                                rows={3}
                                InputProps={{
                                    style: { color: "#fff" },
                                }}
                                InputLabelProps={{ style: { color: "#bbb" } }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                                        "&:hover fieldset": { borderColor: "#1976d2" },
                                        "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                                    },
                                }}
                            />
                            <TextField
                                name="embed"
                                label="YouTube embed link"
                                variant="outlined"
                                value={form.embed}
                                onChange={handleChange}
                                InputProps={{
                                    style: { color: "#fff" },
                                }}
                                InputLabelProps={{ style: { color: "#bbb" } }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                                        "&:hover fieldset": { borderColor: "#1976d2" },
                                        "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                                    },
                                }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    mt: 1,
                                    bgcolor: "#1976d2",
                                    borderRadius: "12px",
                                    fontWeight: "bold",
                                    textTransform: "none",
                                    "&:hover": { bgcolor: "#1565c0" },
                                }}
                            >
                                Qo‘shish
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
