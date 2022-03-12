import { Fragment } from "react";

import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import Paper from "@mui/material/Paper";

function preventDefault(event) {
  event.preventDefault();
}

export default function Production({ current, today, total }) {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        //height: 240,
      }}
    >
      <Title>Produktion</Title>
      <Typography display={"inline"} variant="h6">
        Aktuell: {current?.toFixed(2)} kW
      </Typography>
      <Typography component="p" variant="h6">
        Heute: {today?.toFixed(2)} kWh
      </Typography>
      <Typography component="p" variant="h6">
        Gesamt: {total?.toFixed(2)} kWh
      </Typography>
    </Paper>
  );
}
