import { toast } from "react-toastify"

export const modalStyle = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 2,
}

export const handleError = (error: any) => {
	if (error.response) {
		const { data } = error.response
		if (data.message) {
			toast.error(data.message)
		} else if (data.error) {
			toast.error(data.error)
		}
	} else {
		toast.error('Something went wrong')
	}
}