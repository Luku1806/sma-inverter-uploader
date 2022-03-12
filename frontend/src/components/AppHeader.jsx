import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { AppBar } from "@mui/material";

export default function AppHeader({
  onDrawerButton,
  drawerOpen,
  hasDrawer = false,
}) {
  return (
    <AppBar position="absolute" open={drawerOpen}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        {hasDrawer && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={onDrawerButton}
            sx={{
              marginRight: "36px",
              ...(drawerOpen && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          SMA Solar Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
