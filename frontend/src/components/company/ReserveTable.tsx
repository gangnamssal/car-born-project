/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TablePagination, TableFooter } from "@mui/material";
import { useState, useEffect } from "react";
import DetailModal from "./DetailModal";
import { useQuery } from "react-query";
import { useAPI } from "../../hooks/useAPI";
import { useLocation } from "react-router-dom";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

interface MapType {
  id: string;
  accountId: string;
  regDt: string;
  bookDt: string;
  carModelNm: string;
  carRegNm: string;
  carVin: string;
  bookStatus: string;
}

const container = css`
  position: relative;
`;

export default function ReserveTable() {
  const [page, setPage] = useState<number>(0);
  const rowsPerPage = 7;
  const isGarage = useLocation().pathname == "/garage/reserve";
  let URL;
  let queryKey;
  if (isGarage) {
    URL = `https://carborn.site/api/repair-shop/book/list/${page + 1}/7`;
    queryKey = "getRepairReserveData";
  } else {
    URL = `https://carborn.site/api/inspector/book/list/${page + 1}/7`;
    queryKey = "getInspectorData";
  }

  const ObjString: any = localStorage.getItem("login-token");

  const option = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(ObjString).value}`,
    },
  };

  const getReserveData = useAPI("get", URL, option);
  const { data, refetch } = useQuery(queryKey, () => getReserveData, {
    cacheTime: 1000 * 300,
    staleTime: 1000 * 300,
    refetchOnWindowFocus: false,
    select: (data) => {
      console.log(data);
      return data.data.message;
    },
    onError: (error: Error) => {
      console.log(error);
    },
    suspense: true,
  });
  useEffect(() => {
    refetch();
  }, [page]);

  const handleChangePage = (e: any, newPage: any) => {
    setPage(() => newPage);
  };

  const options: any = {
    rowStyle: { height: 50 },
  };

  return (
    <div css={container}>
      <TableContainer
        component="div"
        sx={{
          backgroundColor: "rgba(246, 246, 246, 0.85)",
          width: "70vw",
        }}>
        <Table sx={{ minWidth: "70vw", minHeight: "60vh" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                완료 여부
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                유저 아이디
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                요청 시간
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                희망 시간
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                차 종
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                차 번호
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                차대 번호
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                전화 번호
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                자세히 보기
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.content?.map(
              (
                {
                  id,
                  regDt,
                  bookDt,
                  carModelNm,
                  carRegNm,
                  carVin,
                  accountId,
                  bookStatus,
                }: MapType,
                idx: number
              ) => (
                <TableRow
                  key={idx}
                  hover={bookStatus ? false : true}
                  sx={
                    bookStatus
                      ? {
                          backgroundColor: "rgba(166, 166, 166, 0.85)",
                          fontSize: "0.2rem",
                          height: "10px",
                        }
                      : null
                  }>
                  <TableCell component="th" scope="row" align="center">
                    {bookStatus ? (
                      <CheckOutlinedIcon color="error" fontSize="small" />
                    ) : null}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.75rem" }}>
                    {accountId}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.75rem" }}>{regDt}</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem" }}>{bookDt}</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem" }}>
                    {carModelNm}
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.75rem" }}>{carRegNm}</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem" }}>{carVin}</TableCell>
                  <TableCell sx={{ fontSize: "0.75rem" }}>
                    01020100209
                  </TableCell>
                  <TableCell align="center">
                    <DetailModal id={id} status={bookStatus} />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={data?.totalElements}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[]}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
