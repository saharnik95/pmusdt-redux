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

interface Column {
  id: string; // Column identifier
  label: string; // Header label
  minWidth?: number; // Minimum width
  align?: "right" | "left" | "center"; // Alignment
  format?: (value: any) => string | JSX.Element; // Optional format function
}

interface Props {
  columns: Column[]; // Columns configuration
  rows: Record<string, any>[]; // Data rows
}

const StickyHeadTable: React.FC<Props> = ({ columns, rows }) => {
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 7; // Fixed rows per page

  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
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
        <TableContainer sx={{ maxHeight: 812 }}>
          <Table>
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
                      borderBottom: "1px solid #313A4B", // Border style
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={rowIndex}
                    sx={{
                      height: "65px", // Adjust row height here
                    }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
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
                            padding: { xl: "25px", lg: "20px", md: "10px" },
                          }}
                        >
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "10px",
          backgroundColor: "",
        }}
      >
        {/* Pagination buttons */}
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
              boxShadow: page === i ? "" : "",

              borderRadius: "100%",
              "&:hover": {
                backgroundColor: "",
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
