import { ContentCopy, CopyAll, Delete, Download, Edit } from "@mui/icons-material";
import { Container, Box, Button, CircularProgress, Paper, Stack, TextField, Typography, Icon, IconButton, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getDecryptPass } from "../api/auth";
import { usePassworListdHook } from "../api/usePasswordHook";
import TableData from "../TaleData";
import { modalStyle } from "../utils";

const columns = [
  // { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'name', headerName: 'Name', flex: 1, renderCell: ({ value }) => <Typography variant="button" sx={{ fontWeight: "bold" }} color="primary" >{value}</Typography> },
  { field: 'username', headerName: 'Username', flex: 1, },
  { field: 'email', headerName: 'Email', flex: 1, },
  { field: 'password', headerName: 'Password', width: 120, renderCell: ({ value }) => <RenderPassword value={value} /> },
  { field: 'action', headerName: 'Action', flex: 1, renderCell: ({ value }) => <RenderAction value={value} /> }
]

const RenderPassword = ({ value }) => {
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
    <Button variant="contained" color="primary" size="small" startIcon={<ContentCopy />} onClick={copyPassword} >copy</Button>
  )
}

const RenderAction = ({ value }) => {


  return (
    <Stack direction="row" spacing={1}>
      <Button variant="contained" color="success" size="small">Edit</Button>
      <Button variant="contained" color="error" size="small">Delete</Button>
    </Stack>
  )
}


const PasswordList = () => {
  const [value, setValue] = useState('');
  const { isLoading, data, } = usePassworListdHook()

  const handleFilter = (elem) => elem.name.toLowerCase().includes(value.toLowerCase())

  const downloadOption = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)]), {
      type: "text/plain",
    });
    a.setAttribute("download", "password.json");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Container sx={{ my: 2, p: 1 }} component={Paper}>

      <Box sx={{ py: 1, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{}}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Password List</Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <TextField size="small" value={value} onChange={(e) => setValue(e.target.value)} label="Search" variant="outlined" />
          <IconButton onClick={downloadOption} color="primary">
            <Download />
          </IconButton>
        </Stack>
      </Box>


      <TableData
        isLoading={isLoading}
        isRefetching={false}
        data={data.filter(handleFilter).map(el => ({
          ...el,
          id: el._id,
          action: el,
        }))}
        columns={columns}
      />

    </Container>
  );
};


export default PasswordList;

