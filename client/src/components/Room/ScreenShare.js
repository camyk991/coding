import { useEffect, useRef } from "react";
import { useClient, getScreenVideoTrack } from "./settings";

export default function ScreenShare(props) {
  let screenTracks;
  const client = useClient();
  const { tracks: videoTrack, users } = props;

  const { isScreenSharing, ifScreenShared, setIfScreenShared } = props;

  const getScreenSharingVideoTrack = (tracks) => {
    if (Array.isArray(tracks)) {
      return tracks[0];
    } else {
      return tracks;
    }
  };

  //this line asks for permission
  if (isScreenSharing) {
    const { ready, tracks } = getScreenVideoTrack();
    screenTracks = tracks;
    setIfScreenShared(true);
  }

  const tracksRef = useRef(screenTracks);

  useEffect(() => {
    tracksRef.current = screenTracks;
  }, [screenTracks]);

  const screenTrack = getScreenSharingVideoTrack(screenTracks);

  if (screenTracks) {
    //works but also doesn't refresh and it only updates for others, we still see our camera instead of screen
    client.unpublish([videoTrack[1]]);
    client.publish(screenTrack);

    //1-video, 0-audio
    //videoTrack[1] = screenTrack; //now we can see our screen as well
  }

  if (!isScreenSharing) {
    if (ifScreenShared) {
      client.unpublish(screenTrack);
      client.publish([videoTrack[1]]);
    }
  }

  return <div className="ScreenShare" style={{ display: "none" }}></div>;
}
