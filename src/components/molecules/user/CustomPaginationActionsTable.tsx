import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

//defining column interface
interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
}

//defining props interface
interface Props {
  columns: Column[];
  rows: Record<string, any>[]; //indicates that each row in rows is an object whose keys are of type string and whose values ​​can be of any data type.
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const StickyHeadTable: React.FC<Props> = ({
  columns,
  rows,
  totalPages,
  onPageChange,
  isLoading,
}) => {
  const [page, setPage] = React.useState(0); //current page
  const rowsPerPage = 7;

  const handlePageChange = (newPage: number) => {
    //changing the page and passing it to parent through onpagechange
    setPage(newPage);
    onPageChange(newPage);
  };

  return (
    <div>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          backgroundColor: "#242C39",
          borderRadius: "10px",
          borderColor: "#313A4B",
          borderWidth: "1px",
        }}
      >
        <TableContainer
          sx={{
            maxHeight: { xl: "812px" },
          }}
        >
          <Table>
            {/*Initializing Table Header*/}
            <TableHead>
              <TableRow sx={{ height: "65px" }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || "left"}
                    style={{ minWidth: column.minWidth }}
                    sx={{
                      color: "#ABABAB",
                      font: "700",
                      fontSize: "14px",
                      lineHeight: "18.2px",
                      borderBottom: "1px solid #313A4B",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    align="center"
                    sx={{ color: "white" }}
                  >
                    Loading more data...
                  </TableCell>
                </TableRow>
              ) : (
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) //depends of which page we are in it slice 7 of the data
                  .map((row, rowIndex) => (
                    <TableRow //making a tablerow for each item
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={rowIndex}
                      sx={{ height: "65px" }}
                    >
                      {columns.map((column) => {
                        //making a tablecol for each row

                        const value = row[column.id]; //value of each cell
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{
                              color: "white",
                              font: "400",
                              fontSize: { lg: "14px", xs: "12px" },
                              lineHeight: { lg: "18.2px", xs: "16px" },
                              borderBottom: "1px solid #313A4B",
                              padding: { xl: "25px", lg: "20px", md: "4px" },
                            }}
                          >
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/*pagination*/}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "10px",
        }}
      >
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            onClick={() => handlePageChange(i)}
            sx={{
              height: "34px",
              width: "34px",
              margin: "0 5px",
              color: page === i ? "#FFFFFF" : "#ABABAB",
              backgroundColor: page === i ? "#40A578" : "transparent",
              borderColor: page === i ? "" : "#313A4B",
              borderWidth: page === i ? "" : "1px",
              borderStyle: page === i ? "" : "solid",
              borderRadius: "100%",
              "&:hover": {
                backgroundColor: page === i ? "#40A578" : "transparent",
              },
            }}
          >
            {i + 1}
          </Button>
        ))}
      </Box>
    </div>
  );
};

export default StickyHeadTable;
