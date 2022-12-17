import { TextField } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { setSearch } from "../../../store/user_slice"

const Search = ({ }) => {
	const [value, setValue] = useState('')
	const dispatch = useDispatch()
	const searchRef = useRef()

	useEffect(() => {
		let id = setTimeout(() => {
			dispatch(setSearch(value))
		}, 300)
		return () => clearTimeout(id)
	}, [value])


	useEffect(() => {

		const handleKeyDown = (e) => {
			console.log(e.key)
			if (e.key === 'Escape') {
				setValue('')
				e.target.blur()
			}
			if (e.key === '/') {
				if (value === '') {
					e.preventDefault()
				}
				searchRef.current.focus()
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [])


	return (
		<TextField
		fullWidth
			autoFocus
			inputRef={searchRef}
			label="Search"
			variant="outlined"
			size="small"
			value={value}
			onChange={(e) => setValue(e.target.value)}
			sx={{ width: '100%' }}
		/>
	)
}

export default Search