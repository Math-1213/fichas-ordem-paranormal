import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { Button, Form, Stack } from "react-bootstrap";

const AtmospherePlayer = ({ currentTrackUrl }) => {
  const audioRef = useRef(new Audio());
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    // 1. SEMPRE para o áudio anterior antes de qualquer coisa
    audio.pause();

    if (!currentTrackUrl) {
      audio.src = ""; // Limpa a fonte
      setIsPlaying(false);
      return;
    }

    // 2. Só agora define a nova música
    audio.src = currentTrackUrl;
    audio.loop = true;

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.warn("Autoplay bloqueado: aguardando interação.");
        setIsPlaying(false);
      });

    // Cleanup: Se o componente for destruído, mata o som
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [currentTrackUrl]);

  if (!currentTrackUrl) return null;
  
  useEffect(() => {
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  return (
    <Stack
      direction="horizontal"
      gap={2}
      className="px-2 py-1 rounded-pill"
      style={{ backgroundColor: "#1c212b", border: "1px solid #2a2f3e" }}
    >
      <Button
        variant="link"
        className="p-0 text-white"
        onClick={() => {
          isPlaying ? audioRef.current.pause() : audioRef.current.play();
          setIsPlaying(!isPlaying);
        }}
      >
        {isPlaying ? <Pause size={14} /> : <Play size={14} />}
      </Button>

      <Button
        variant="link"
        className="p-0 text-white"
        onClick={() => setIsMuted(!isMuted)}
      >
        {isMuted || volume === 0 ? (
          <VolumeX size={14} />
        ) : (
          <Volume2 size={14} />
        )}
      </Button>

      <Form.Range
        style={{ width: "70px", height: "4px" }}
        min={0}
        max={1}
        step={0.01}
        value={isMuted ? 0 : volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
      />
    </Stack>
  );
};

export default AtmospherePlayer;
