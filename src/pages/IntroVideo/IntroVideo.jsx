import "./IntroVideo.css";
import introVideo from "../../assets/video/logo.mp4";

const IntroVideo = ({ onEnd }) => {
  return (
    <div className="intro-video">
      <video
        src={introVideo}
        autoPlay
        muted
        playsInline
        onEnded={onEnd}
      />
    </div>
  );
};

export default IntroVideo;
