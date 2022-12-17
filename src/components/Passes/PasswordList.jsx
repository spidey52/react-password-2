import { Download } from "@mui/icons-material";
import { Container, Box, Paper, Stack, TextField, Typography, Icon, IconButton, Modal } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../store/user_slice";
import { usePassworListdHook } from "../api/usePasswordHook";
import TableData from "../TaleData";
import DeletePassword from "./DeletePassword";
import EditPassword from "./EditPassword";
import RenderPassword from "./helpers/RenderPassword";
import Search from "./helpers/RenderSearch";

const columns = [
  // { field: 'id', headerName: 'ID', flex: 1 },
  {
    field: 'name', headerName: 'Name', flex: 1,
    minWidth: 180,
    renderCell: ({ value }) => <Typography variant="button" sx={{ fontWeight: "bold" }} color="primary" >{value}</Typography>
  },
  { field: 'username', headerName: 'Username', flex: 1, minWidth: 180, },
  { field: 'email', headerName: 'Email', flex: 1, minWidth: 180, },
  { field: 'clicks', headerName: 'click', width: 80, },
  {
    field: 'password', headerName: 'Password', width: 120,
    renderCell: ({ value }) => <RenderPassword value={value} />
  },
  {
    field: 'action', headerName: 'Action', flex: 1,
    minWidth: 180,
    renderCell: ({ value }) => <RenderAction value={value} />
  }
]



const RenderAction = ({ value }) => {
  return (
    <Stack direction="row" spacing={1}>
      <EditPassword el={value} />
      <DeletePassword el={value} />
    </Stack>
  )
}


const PasswordList = () => {
  const { search } = useSelector(state => state.user);
  const { isLoading, data, } = usePassworListdHook()
  const handleFilter = (elem) => elem.name.toLowerCase().includes(search.toLowerCase())

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
          <Search />
          <IconButton onClick={downloadOption} color="primary">
            <Download />
          </IconButton>
        </Stack>
      </Box>


      <TableData
        isLoading={isLoading}
        isRefetching={false}
        data={data.filter(handleFilter).map((el, index) => ({
          ...el,
          count: index + 1,
          id: el._id,
          action: el,
        }))}
        columns={columns}
      />

    </Container>
  );
};


export default PasswordList;

