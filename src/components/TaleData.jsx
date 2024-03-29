import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { useLocalStorage } from '../helperHooks/useHelperHook'



const height = '80vh'

const TableData = ({ isLoading, isRefetching, data, columns, rows, myheight }) => {
	const [pageSize, setPageSize] = useLocalStorage({ key: 'pageSize', initialValue: 10 })

	return (
		<>
			<DataGrid
				loading={isLoading || isRefetching}
				rows={data}
				columns={columns}
				disableSelectionOnClick
				disableVirtualization
				pageSize={pageSize}
				onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
				rowsPerPageOptions={[10, 25, 50, 100]}
				sx={{
					height: myheight || height,
					maxHeight: "70vh",
				}}
			/>
		</>
	)
}

export default TableData