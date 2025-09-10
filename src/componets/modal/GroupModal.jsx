'use client'
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useRole } from "@/context/userContext";
import { usecreateGroup } from "@/hooks/groups";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",             // kichik ekranlarda 90%
    maxWidth: 420,            // katta ekranlarda 420px dan oshmaydi
    bgcolor: "rgba(255, 255, 255, 0.05)",
    color: "#fff",
    borderRadius: "16px",
    backdropFilter: "blur(15px) saturate(180%)",
    WebkitBackdropFilter: "blur(15px) saturate(180%)",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    p: { xs: 2, sm: 4 },      // padding responsive
};

export default function GroupModal({ children }) {
    const createGroupMutation = usecreateGroup();
    const { username } = useRole();
    const [open, setOpen] = React.useState(false);
    const [form, setForm] = React.useState({
        name: "",
        description: "",
        teacher: username || "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name.trim()) {
            alert("Sarlavha majburiy!");
            return;
        }
        if (!form.description.trim()) {
            alert("Tavsif majburiy!");
            return;
        }

        createGroupMutation.mutate(form);
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
                        Yangi guruh yaratish
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                name="name"
                                label="Sarlavha"
                                variant="outlined"
                                value={form.name}
                                onChange={handleChange}
                                InputProps={{
                                    style: { color: "#fff" },
                                }}
                                InputLabelProps={{ style: { color: "#bbb" } }}
                                fullWidth
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
                                fullWidth
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
                                fullWidth
                                sx={{
                                    mt: 1,
                                    bgcolor: "#1976d2",
                                    borderRadius: "12px",
                                    fontWeight: "bold",
                                    textTransform: "none",
                                    "&:hover": { bgcolor: "#1565c0" },
                                }}
                            >
                                Yaratish
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
