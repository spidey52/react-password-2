import React from "react";
import { Box, Button, Divider, Modal, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { handleError, modalStyle } from "../utils";
import { usePasswordCreateHook } from "../api/usePasswordHook";
import { toast } from "react-toastify";

const CreatePassword = () => {
	const [open, setOpen] = useState(false)
	const [form, setForm] = useState({ title: '', username: '', email: '', password: '' })
	const toggle = () => setOpen(prev => !prev);
	const { mutateAsync } = usePasswordCreateHook()

	const handleSubmit = async () => {
		const { title, username, email, password } = form
		if (!title || !username || !email || !password) return
		try {
			await mutateAsync({ name: title, username, email, password })
			toast.success('Password added successfully')
			setForm({ title: '', username: '', email: '', password: '' })
			toggle();
		} catch (error) {
			console.log(error.message);
			toast.error(error?.response?.data?.message || 'Something went wrong')
		}
	}


	return <>
		<Button color="inherit" size="small" onClick={toggle} >Add Password </Button>
		<Modal open={open} onClose={toggle} keepMounted={true}>
			<Box sx={{ ...modalStyle, p: 4, width: 500, maxWidth: "95vw" }} component={Paper}>
				<Box sx={{ pb: 1 }}>
					<Typography variant="h6" component="h2" >ADD PASSWORD</Typography>

				</Box>

				<Stack spacing={1.5}>
					{
						Object.keys(form).map(key => {
							return <TextField key={key}
								fullWidth
								label={key}
								variant="outlined"
								size="small"
								value={form[key]}
								onChange={e => {
									setForm({ ...form, [key]: e.target.value })
								}}
							/>
						})
					}

					<Button variant="contained" color="primary" fullWidth onClick={handleSubmit} >Add</Button>
				</Stack>
			</Box>
		</Modal>
	</>
}

export default CreatePassword