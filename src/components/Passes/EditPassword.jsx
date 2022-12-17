import { Box, Button, Modal, Paper, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { toast } from 'react-toastify'
import { usePasswordUpdateHook } from '../api/usePasswordHook'
import { modalStyle } from '../utils'

const EditPassword = ({ el }) => {
	const [open, setOpen] = React.useState(false)
	const [form, setForm] = React.useState({ title: el.name, username: el.username, email: el.email, password: '' })
	const { mutateAsync, isLoading } = usePasswordUpdateHook()

	const toggle = () => setOpen(prev => !prev)
	const handleSubmit = async () => {

		try {
			const { title, username, email, password } = form
			const body = { name: title, username, email }
			if (password) body.password = password
			await mutateAsync({id: el._id, password: body})
			toast.success('Password updated successfully')
			toggle()
		} catch (error) {
			toast.error(error?.response?.data?.message || error?.response?.data?.error || 'Something went wrong')
		}
	}

	return (
		<>
			<Button variant="contained" color="success" size="small" onClick={toggle}>Edit</Button>
			<Modal open={open} onClose={toggle} >
				<Box sx={{ ...modalStyle, p: 4, width: 500, maxWidth: "95vw" }} component={Paper}>
					<Box sx={{ pb: 1 }}>
						<Typography variant="h6" component="h2" >EDIT PASSWORD</Typography>
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
						<Button variant="contained" color="primary" fullWidth onClick={handleSubmit} >Edit </Button>
					</Stack>
				</Box>
			</Modal>
		</>
	)
}

export default EditPassword