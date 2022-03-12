import Typography from "@mui/material/Typography";
import Title from "./Title";
import Paper from "@mui/material/Paper";

export default function Inverter({
  name,
  time,
  current,
  today,
  total,
  temperature,
  hoursOfFeed,
  hoursOfOperation,
  status,
}) {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: 260,
      }}
    >
      <Title>Inverter: {name}</Title>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Aktualisiert: {time}
      </Typography>
      <Typography color="text.primary" sx={{ flex: 1 }}>
        Aktuell: {current?.toFixed(3)} kW
      </Typography>
      <Typography color="text.primary" sx={{ flex: 1 }}>
        Heute: {today?.toFixed(3)} kWh
      </Typography>
      <Typography color="text.primary" sx={{ flex: 1 }}>
        Gesamt: {total?.toFixed(3)} kWh
      </Typography>
      <Typography color="text.primary" sx={{ flex: 1 }}>
        Temperatur: {temperature?.toFixed(2)} C°
      </Typography>
      <Typography color="text.primary" sx={{ flex: 1 }}>
        Betrieb: {hoursOfOperation?.toFixed(3)} Stunden
      </Typography>
      <Typography color="text.primary" sx={{ flex: 1 }}>
        Eingespeist: {hoursOfFeed?.toFixed(3)} Stunden
      </Typography>
      <Typography color="text.primary" sx={{ flex: 1 }}>
        Status: {status}
      </Typography>
    </Paper>
  );
}
