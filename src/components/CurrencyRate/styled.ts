import { Grid, styled } from "@mui/material";

export const Root = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px 15px",
  paddingRight: "0px",
  minHeight: "50px",
  borderRadius: "12px",
  backgroundColor: theme.palette.background.default,
  marginBottom: "20px",
  width: "100%",
}));

export const HeaderGrid = styled(Grid)(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 1,
  paddingBottom: "5px",
  backgroundColor: theme.palette.background.default,
}));

export const FooterGrid = styled(Grid)(({ theme }) => ({
  position: "sticky",
  bottom: 0,
  zIndex: 1,
  paddingTop: "5px",
  backgroundColor: theme.palette.background.default,
}));

export const ContainerGrid = styled(Grid)(({ theme }) => ({
  width: "100%",
  maxHeight: "250px",
  overflowY: "scroll",
  backgroundColor: theme.palette.background.default,
  "&::-webkit-scrollbar": {
    width: "8px",
    height: "8px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.background.default,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "8px",
  },
}));

export const LoadingWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "250px",
  backgroundColor: theme.palette.background.default,
  width: "100%",
  borderRadius: "12px",
}));