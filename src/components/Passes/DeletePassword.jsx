import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import { toast } from 'react-toastify';
import { usePasswordDeleteHook } from '../api/usePasswordHook';

const DeletePassword = ({ el }) => {
	const [open, setOpen] = React.useState(false)

	const handleClose = () => setOpen(false);
	const handleOpen = () => setOpen(true);
	const { mutateAsync, isLoading } = usePasswordDeleteHook()

	const handleDelete = async () => {
		try {
			await mutateAsync(el._id)
			toast.info('Password deleted successfully')
		} catch (error) {
			toast.error(error?.response?.data?.message || error.response?.data?.error || 'Something went wrong')
		}
	}

	return (
		<>
			<Button variant="contained" color="error" size="small" onClick={handleOpen}>Delete</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Are you sure?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						You are about to delete the password for <strong>{el.name}</strong>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleDelete} disabled={isLoading} color="error">Delete</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default DeletePassword