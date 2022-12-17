import { ContentCopy } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getDecryptPass } from '../../api/auth'

const RenderPassword = ({ value, props }) => {
	const { token } = useSelector(state => state.user)

	const copyPassword = async () => {
		const { data, error } = await getDecryptPass(value, token)
		if (error) return toast.error(error)
		try {
			await navigator.clipboard.writeText(data)
			toast.success('Password copied Successfully')
		} catch (error) {
			toast.error('Password copy failed' + error.message)
		}
	}
	return (
		<Button variant="contained" {...props} color="primary" size="small" startIcon={<ContentCopy />} onClick={copyPassword} >copy</Button>
	)
}
export default RenderPassword