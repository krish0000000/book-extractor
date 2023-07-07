import { useState, useEffect } from "react";
import book from "../data/book.json";
import { TableContainer, Paper, IconButton } from "@material-ui/core";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Moment from "moment";
import { HeightRounded } from "@mui/icons-material";

const BookList = () => {
  // This variable holds the Book data
  const [tableData, setTableData] = useState([]);
  // This variable holds the Book sorted data
  const [order, setOrder] = useState("ASC");
  // sorting method
  const requestSort = (col) => {
    if (order === "ASC") {
      const sorted = [...tableData].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setTableData(sorted);
      setOrder("DESC");
    }
    if (order === "DESC") {
      const sorted = [...tableData].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setTableData(sorted);
      setOrder("ASC");
    }
  };
  // fetching book data from API
  useEffect(() => {
    fetch("https://extracts.panmacmillan.com/getextracts?titlecontains=s", {
      method: "GET",
      mode: "cors",
      headers: new Headers({
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        "Access-Control-Request-Method": "GET, POST, DELETE, PUT, OPTIONS",
      }),
    })
      .then((response) => {
        setTableData(response.data);
      })
      .catch((error) => {
        setTableData(book.Extracts);
      });
  }, []);
  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ maxWidth: "100%", display: "block", overflow: "auto" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ p: "0 !imporatant" }}>
                <b>ID</b>{" "}
              </TableCell>
              <TableCell align="center">
                <b>Cover</b>
              </TableCell>
              <TableCell align="center" sx={{ maxWidth: "100%" }}>
                <b>Auther</b>
                <IconButton onClick={() => requestSort("author")}>
                  <HeightRounded />
                </IconButton>
              </TableCell>
              <TableCell align="center">
                <b>Biography</b>
              </TableCell>
              <TableCell align="center" sx={{ maxWidth: "100%" }}>
                <b>Title</b>
                <IconButton onClick={() => requestSort("title")}>
                  <HeightRounded />
                </IconButton>
              </TableCell>
              <TableCell align="center" sx={{ maxWidth: "100%" }}>
                <b>Reading Time</b>
                <IconButton
                  onClick={() => requestSort("estimatedReadingTimeMinutes")}
                >
                  <HeightRounded />
                </IconButton>
              </TableCell>
              <TableCell align="center" sx={{ maxWidth: "100%" }}>
                <b>Publication Date</b>
                <IconButton onClick={() => requestSort("publicationDate")}>
                  <HeightRounded />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={row.title}>
                <TableCell align="justify">
                  <b>{index + 1}</b>
                </TableCell>
                <TableCell align="justify">
                  <a
                    href={
                      "https://extracts.panmacmillan.com/extract?isbn=" +
                      row.isbn
                    }
                    target="_blank"
                  >
                    <img src={row.jacketUrl} />
                  </a>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.author}
                </TableCell>
                <TableCell align="justify">
                  <div
                    dangerouslySetInnerHTML={{ __html: row.authorBiography }}
                  ></div>
                </TableCell>
                <TableCell align="left">
                  <a
                    href={
                      "https://extracts.panmacmillan.com/extract?isbn=" +
                      row.isbn
                    }
                    target="_blank"
                  >
                    {row.title}
                  </a>
                </TableCell>
                <TableCell align="justify">
                  {row.estimatedReadingTimeMinutes}
                </TableCell>
                <TableCell align="justify">
                  {Moment(row.publicationDate).format("MM-DD-YYYY")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BookList;
