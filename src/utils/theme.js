import { createTheme } from "@mui/material/styles";
import "@fontsource/space-grotesk";

export const darkSecureTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#FFFFFF" },
    secondary: { main: "#BDBDBD" },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
      card: "#2A2A2A",
      input: "#2C2C2C",
    },
    text: {
      primary: "#E0E0E0",
      secondary: "#BDBDBD",
    },
    error: {
      main: "#EF5350",
    },
  },
  typography: {
    fontFamily: "Space Grotesk, sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    body1: { fontWeight: 400 },
    button: { fontWeight: 500, textTransform: "none" },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E1E1E",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          paddingLeft: "8px",
          color: "#BDBDBD",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          backgroundColor: "#2C2C2C",
          "& fieldset": {
            borderColor: "#BDBDBD",
          },
          "&:hover fieldset": {
            borderColor: "#E0E0E0",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#FFFFFF",
          },
          "&.Mui-error fieldset": {
            borderColor: "#EF5350",
          },

          "& .MuiSelect-select": {
            color: "#FFFFFF",
            backgroundColor: "transparent",
          },
          "& .MuiInputLabel-root": {
            color: "#BDBDBD",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#FFFFFF",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#2C2C2C",
            borderRadius: "8px",
            "& fieldset": { borderColor: "#BDBDBD" },
            "&:hover fieldset": { borderColor: "#E0E0E0" },
            "&.Mui-focused fieldset": { borderColor: "#FFFFFF" },
            "&.Mui-error fieldset": { borderColor: "#EF5350" },
          },
          "& input": {
            color: "#FFFFFF",
            backgroundColor: "transparent",
          },
          "& .MuiInputLabel-root": {
            color: "#BDBDBD",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#FFFFFF",
          },
          "& .MuiInputLabel-root.Mui-error": {
            color: "#EF5350",
          },  
          "& .MuiFormHelperText-root": {
            color: "#BDBDBD",
            backgroundColor: "transparent",
            padding: "2px 8px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#121212",
          "&:hover": { backgroundColor: "#E0E0E0" },
        },
      },
    },
  },
});

export const lightSecureTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#000000" },
    secondary: { main: "#757575" },
    background: {
      default: "#FAFAFA",
      paper: "#FFFFFF",
      card: "#F5F5F5",
      input: "#E0E0E0",
    },
    text: {
      primary: "#212121",
      secondary: "#616161",
    },
    error: {
      main: "#D32F2F",
    },
  },
  typography: {
    fontFamily: "Space Grotesk, sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    body1: { fontWeight: 400 },
    button: { fontWeight: 500, textTransform: "none" },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          height: "100%",
          backgroundColor: "transparent",
          borderRadius: "8px",
          "& fieldset": {
            borderColor: "#BDBDBD",
          },
          "&:hover fieldset": {
            borderColor: "#757575",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#000000",
          },
          "&.Mui-error fieldset": {
            borderColor: "#D32F2F",
          },
          "& .MuiSelect-select": {
            color: "#212121",
            backgroundColor: "transparent",
          },
          "& .MuiInputLabel-root": {
            color: "#616161",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#000000",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "transparent",
            borderRadius: "8px",
            "& fieldset": { borderColor: "#BDBDBD" },
            "&:hover fieldset": { borderColor: "#757575" },
            "&.Mui-focused fieldset": { borderColor: "#000000" },
            "&.Mui-error fieldset": { borderColor: "#D32F2F" },
          },
          "& input": {
            color: "#212121",
            backgroundColor: "transparent",
          },

          "& .MuiInputLabel-root.Mui-error": {
            color: "#D32F2F",
          },
          "& .MuiInputLabel-root": {
            color: "#616161",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#000000",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
          color: "#FFFFFF",
          "&:hover": { backgroundColor: "#424242" },
        },
      },
    },
  },
});
