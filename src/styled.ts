import {
  Card as card,
  Toolbar as toolbar,
  InputBase,
} from "@mui/material";
import { styled as muiStyled, alpha } from "@mui/material/styles";
import styled from "styled-components";
import { HTMLAttributes } from "react";

export const Card = styled(card)`
  height: 300px;
  width: 300px;
  margin: 5px 5px;
`;
interface WrapperProps extends HTMLAttributes<HTMLDivElement> {
  darkMode: boolean;
}
export const Wrapper = styled.div.attrs({
})<WrapperProps>`
  flex-direction: row;
  width: 100vw;
  background-color: ${({ darkMode }) => (darkMode ? "#282c34" : "##ffffff")};
`;
export const CardWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100%;
  flex-wrap: wrap;
  overflow-y: scroll;
`;

export const Toolbar = styled(toolbar)`
  display: flex;
  justify-content: space-between;
`;

export const TextField = muiStyled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  position: "relative",

  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
