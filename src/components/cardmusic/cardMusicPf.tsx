"use client";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PauseIcon from "@mui/icons-material/Pause";
import { useTrackContext } from "@/lib/track.wrapper";
export default function CardMusicPf({ data }: { data: any }) {
  const theme = useTheme();
  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;
  // console.log(currentTrack);
  // console.log(data);
  return (
    <Card sx={{ display: "flex", height: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {data.title || "No Title"}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            {data.description || "No Description"}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          {data._id === currentTrack._id && currentTrack.isPlaying == true ? (
            <IconButton
              aria-label="play/pause"
              onClick={() => setCurrentTrack({ ...data, isPlaying: false })}
            >
              <PauseIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
          ) : (
            <IconButton
              aria-label="play/pause"
              onClick={() => setCurrentTrack({ ...data, isPlaying: true })}
            >
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
          )}

          <IconButton aria-label="next">
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151, objectFit: "cover" }}
        image={`http://localhost:8000/images/${data.imgUrl}`}
        alt={data.title || "Music cover"}
      />
    </Card>
  );
}
