import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

import Chart from "./components/Chart";
import Inverter from "./components/Inverter";
import Production from "./components/Production";
import AppHeader from "./components/AppHeader";
import { useEffect, useState } from "react";
import {
  fetchInverters,
  fetchProduction,
  fetchProductionMeasurements,
} from "./api";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
  const [production, setProduction] = useState(null);
  const [inverters, setInverters] = useState(null);
  const [measurements, setMeasurements] = useState(null);

  useEffect(() => {
    async function loadProduction() {
      try {
        const fetchedProduction = await fetchProduction();
        setProduction(fetchedProduction);
      } catch {}
    }

    if (!production) {
      loadProduction();
    }
  }, [production]);

  useEffect(() => {
    async function loadInverters() {
      try {
        const fetchedInverters = await fetchInverters();
        setInverters(fetchedInverters);
      } catch {}
    }

    if (!inverters) {
      loadInverters();
    }
  }, [inverters]);

  useEffect(() => {
    async function loadMeasurements() {
      try {
        const fetchedInverters = await fetchProductionMeasurements();
        setMeasurements(fetchedInverters);
      } catch {}
    }

    if (!measurements) {
      loadMeasurements();
    }
  }, [measurements]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppHeader />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {production && generateProductionTile(production)}
              {inverters && measurements && (
                <Chart inverters={inverters} measurements={measurements} />
              )}
              {inverters && generateInverterTiles(inverters)}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

function generateProductionTile(production) {
  return (
    <Grid item xs={12}>
      <Production
        current={production.current.ac}
        today={production.today}
        total={production.total}
      />
    </Grid>
  );
}

function generateInverterTiles(inverters) {
  return inverters.map((inverter) => (
    <Grid item xs={12} md={6} lg={4}>
      <Inverter
        name={inverter.inverter.serialNumber}
        time={new Date(inverter.time).toLocaleString()}
        current={inverter.production.current.ac.power["1"] / 1000}
        today={inverter.production.today}
        total={inverter.production.total}
        temperature={inverter.inverter.temperature}
        hoursOfOperation={inverter.hoursOfOperation}
        hoursOfFeed={inverter.hoursOfFeed}
        status={inverter.inverter.status}
      />
    </Grid>
  ));
}

export default function Dashboard() {
  return <DashboardContent />;
}
