import styled, { keyframes, css } from "styled-components";

const scanline = keyframes`
  0% { 
    top: -5%; 
    opacity: 0;
  }
  5% {
    opacity: 0.6;
  }
  95% {
    opacity: 0.6;
  }
  100% { 
    top: 105%; 
    opacity: 0;
  }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;

export const CyberTheme = {
  blue: "#00f2ff",
  red: "#ff0055",
  green: "#00ff00",
  yellow: "#ffee58",
  bg: "#06090f",
  panel: "#0c121d",
  border: "#1a222f",
  textMuted: "#566573",
};

export const MainFrame = styled.div`
  font-family: "Inter", sans-serif;
  background: ${CyberTheme.bg};
  color: #fff;
  min-height: 100vh;
  padding-bottom: 3rem;

  .mono {
    font-family: "JetBrains Mono", monospace;
  }
`;

export const CyberHeader = styled.div`
  background: linear-gradient(90deg, #0c121d 0%, #161d29 50%, #0c121d 100%);
  border-left: 4px solid ${CyberTheme.blue};
  border-bottom: 1px solid ${CyberTheme.border};
  padding: 1rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .status-blink {
    width: 8px;
    height: 8px;
    background: ${CyberTheme.blue};
    border-radius: 50%;
    display: inline-block;
    box-shadow: 0 0 10px ${CyberTheme.blue};
    animation: ${blink} 2s infinite;
  }
`;

export const CRTContainer = styled.div`
  position: relative;
  background: #000;
  border: 2px solid
    ${(props) => (props.hasImage ? CyberTheme.border : "#004400")};
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow:
    inset 0 0 80px rgba(0, 0, 0, 1),
    0 0 15px rgba(0, 255, 0, 0.1);

  /* 1. O Filtro de Cor Verde sobre tudo */
  &::after {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 255, 0, 0.15); /* Tom esverdeado global */
    pointer-events: none;
    z-index: 5;
    mix-blend-mode: overlay; /* Faz a cor interagir com a imagem */
  }

  /* 2. A Grade de Pixels e Scanlines Estáticas */
  &::before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background:
      linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.2) 50%),
      linear-gradient(
        90deg,
        rgba(255, 0, 0, 0.03),
        rgba(0, 255, 0, 0.01),
        rgba(0, 0, 255, 0.03)
      );
    z-index: 6;
    background-size:
      100% 3px,
      3px 100%; /* Cria a malha de CRT */
    pointer-events: none;
  }

  /* 3. A Vinheta (Escurecer os cantos para dar profundidade) */
  .vignette {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.8);
    z-index: 7;
    pointer-events: none;
  }

  .scanline {
    position: absolute;
    left: 0;
    width: 100%;
    height: 15px;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(0, 255, 0, 0.2) 50%,
      transparent
    );
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
    animation: ${scanline} 4s linear infinite;
    z-index: 10;
    pointer-events: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Forçamos a imagem a ficar monocromática/verde e com cara de terminal */
    filter: grayscale(1) brightness(1.2) contrast(1.5) sepia(100%)
      hue-rotate(80deg) saturate(5);
    opacity: 0.7;
  }

  .no-data {
    color: ${CyberTheme.green};
    font-family: "JetBrains Mono", monospace;
    text-shadow: 0 0 8px ${CyberTheme.green};
    z-index: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    text-transform: uppercase;
  }
`;

export const CyberCard = styled.div`
  background: ${CyberTheme.panel};
  border: 1px solid ${CyberTheme.border};
  padding: 1rem;
  position: relative;
`;

export const CyberLabel = styled.label`
  font-size: 0.65rem;
  font-weight: 900;
  color: ${CyberTheme.textMuted};
  text-transform: uppercase;
  letter-spacing: 2px;
  display: block;
  margin-bottom: 5px;
`;

export const CyberButton = styled.button`
  background: ${(props) => (props.primary ? CyberTheme.blue : "transparent")};
  color: ${(props) => (props.primary ? "#000" : "#aaa")};
  border: ${(props) =>
    props.primary ? "none" : `1px solid ${CyberTheme.border}`};
  padding: 8px 20px;
  font-weight: 800;
  font-size: 0.75rem;
  text-transform: uppercase;
  clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
  transition: 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    filter: brightness(1.2);
    transform: translateY(-2px);
    color: ${(props) => (props.primary ? "#000" : "#fff")};
    border-color: ${(props) => (props.primary ? "none" : "#fff")};
  }
`;
