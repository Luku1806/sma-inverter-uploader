import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  Brush,
  Tooltip,
} from "recharts";

import { randomColor } from "randomcolor";

import Title from "./Title";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

function todayMidnight() {
  return new Date(new Date().setHours(0, 0, 0, 0));
}

function generateDataSets(measurements) {
  return measurements.reduce((tableData, measurement) => {
    const serial = measurement.inverter.serialNumber;
    const measured = measurement.production.current.ac.power["1"];

    const currentEntry = tableData.find(
      ({ time }) => time === new Date(measurement.time)
    );

    if (currentEntry) {
      currentEntry[serial] = measured;
    } else {
      tableData.push({ time: new Date(measurement.time), [serial]: measured });
    }

    return tableData;
  }, []);
}

function indexOfNearestDateTo(today, data) {
  const todayMillis = today.getTime();

  const [nearestIndex] = data.reduce(
    ([nearest, distance], current, index) => {
      const currentMillis = current.time.getTime();
      const currentDistance = Math.abs(todayMillis - currentMillis);

      return currentDistance < distance
        ? [index, currentDistance]
        : [nearest, distance];
    },
    [0, Infinity]
  );

  return nearestIndex;
}

export default function Chart({ inverters, measurements }) {
  const theme = useTheme();

  const tableData = generateDataSets(measurements);

  return (
    <Grid item xs={12}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 560,
        }}
      >
        <Title>Produktion</Title>
        <ResponsiveContainer>
          <LineChart
            data={tableData}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <CartesianGrid strokeDasharray="2 2" />
            <Legend verticalAlign="top" />
            <XAxis
              dataKey={(data) => data.time.toLocaleString()}
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
            />
            <YAxis
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
            >
              <Label
                angle={270}
                position="left"
                style={{
                  textAnchor: "middle",
                  fill: theme.palette.text.primary,
                  ...theme.typography.body1,
                }}
              >
                Produktion (kW)
              </Label>
            </YAxis>
            {inverters.map((inverter) => {
              const color = randomColor({
                luminosity: "dark",
              });
              const serial = inverter.inverter.serialNumber;
              return (
                <Line
                  connectNulls
                  key={serial}
                  name={serial}
                  isAnimationActive={false}
                  type="monotone"
                  dataKey={serial}
                  stroke={color}
                  dot={false}
                />
              );
            })}
            <Tooltip />
            <Brush
              startIndex={indexOfNearestDateTo(todayMidnight(), tableData)}
              dataKey={(data) => data.time.toLocaleString()}
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Grid>
  );
}
