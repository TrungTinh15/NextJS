"use client";
import { useTrackContext } from "@/lib/track.wrapper";
import { useHasMounted } from "@/utils/customHook";
import { Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const AppFooter = () => {
  const hasMounted = useHasMounted();
  const playerRef = useRef(null);
  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;
  if (!hasMounted) return <></>; //fragment
  //@ts-ignore
  if (currentTrack?.isPlaying) {
    //@ts-ignore
    playerRef?.current?.audio?.current.play();
  } else {
    //@ts-ignore
    playerRef?.current?.audio?.current.pause();
  }

  return (
    <div style={{ marginTop: 50 }}>
      <AppBar
        position="fixed"
        sx={{
          top: "auto",
          bottom: 0,
          background: "#f2f2f2",
        }}
      >
        <Container
          sx={{
            display: "flex",
            gap: 10,
            ".rhap_main": {
              gap: "30px",
            },
          }}
        >
          <AudioPlayer
            layout="horizontal-reverse"
            ref={playerRef}
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`}
            volume={0.5}
            onPlay={() => setCurrentTrack({ ...currentTrack, isPlaying: true })}
            onPause={() =>
              setCurrentTrack({ ...currentTrack, isPlaying: false })
            }
            // other props here
            style={{
              boxShadow: "unset",
              background: "#f2f2f2",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "center",
              minWidth: 100,
            }}
          >
            <div style={{ color: "#ccc" }}>Eric</div>
            <div style={{ color: "black" }}>Who am I ?</div>
          </div>
        </Container>
      </AppBar>
    </div>
  );
};

export default AppFooter;
