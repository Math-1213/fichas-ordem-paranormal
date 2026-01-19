import styled, { keyframes, css } from "styled-components";
import { Col, Form, InputGroup } from "react-bootstrap";

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
  background: ${(props) => (props.$primary ? CyberTheme.blue : "transparent")};
  color: ${(props) => (props.$primary ? "#000" : "#aaa")};
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

export const StatusGauge = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid ${(props) => props.color || CyberTheme.blue}44;
  border-left: 4px solid ${(props) => props.color || CyberTheme.blue};
  padding: 15px;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background: linear-gradient(
      90deg,
      ${(props) => props.color || CyberTheme.blue},
      transparent
    );
    opacity: 0.5;
  }

  input {
    background: transparent;
    border: none;
    color: #fff;
    font-size: 2rem;
    font-weight: 900;
    width: 100%;
    font-family: "JetBrains Mono", monospace;
    outline: none;
    text-align: right;
  }
`;

export const DefenseTextArea = styled.textarea`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid ${CyberTheme.border};
  color: #fff;
  width: 100%;
  padding: 10px;
  font-size: 0.85rem;
  font-family: "JetBrains Mono", monospace;
  transition: 0.3s;
  border-radius: 0;

  &:focus {
    outline: none;
    border-color: ${(props) => props.focusColor || CyberTheme.blue};
    background: rgba(0, 242, 255, 0.05);
  }
`;

export const AttributeGroup = styled.div`
  margin-bottom: 2rem;
  border: 1px solid ${CyberTheme.border};
  background: rgba(0, 0, 0, 0.2);

  .group-header {
    background: ${(props) => props.color || CyberTheme.blue}22;
    padding: 8px 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid ${(props) => props.color || CyberTheme.blue}44;

    span {
      font-family: "JetBrains Mono", monospace;
      font-weight: 900;
      font-size: 0.75rem;
      letter-spacing: 2px;
      color: ${(props) => props.color || CyberTheme.blue};
    }
  }
`;

export const SkillCard = styled.div`
  padding: 12px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.2s;
  height: 100%; /* Garante que a borda lateral preencha tudo */
  background: ${(props) =>
    props.isActive ? "rgba(255, 255, 255, 0.03)" : "transparent"};

  .skill-info {
    flex: 1;
    margin-right: 10px;
    .skill-name {
      font-family: "JetBrains Mono", monospace;
      font-weight: 900;
      font-size: 0.9rem; /* Nome um pouco maior */
      color: ${(props) => (props.isActive ? "#fff" : CyberTheme.textMuted)};
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }
`;

// Estilo para criar a divisória entre as colunas da grid
export const GridDivider = styled(Col)`
  border-bottom: 1px solid ${CyberTheme.border};

  /* Adiciona borda direita apenas em telas maiores que mobile */
  @media (min-width: 768px) {
    &:not(:last-child) {
      border-right: 1px solid ${CyberTheme.border};
    }
  }

  /* Ajuste específico para 3 colunas (LG) para evitar borda na última da linha */
  @media (min-width: 992px) {
    &:nth-child(3n) {
      border-right: none;
    }
  }
`;

export const InputsWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  flex-shrink: 0; /* Impede que os inputs diminuam se o nome da perícia for longo */
`;

export const SkillInputBox = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid ${(props) => (props.isActive ? props.color : "#1a222f")};
  padding: 4px 0; /* Padding vertical apenas */
  width: 65px; /* LARGURA FIXA PARA SIMETRIA TOTAL */
  flex-shrink: 0;

  label {
    font-size: 0.5rem;
    color: ${(props) => props.color || CyberTheme.blue};
    margin: 0;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  input {
    background: transparent;
    border: none;
    color: #fff;
    font-size: 1rem;
    font-family: "JetBrains Mono", monospace;
    width: 100%;
    outline: none;
    text-align: center;
    font-weight: bold;
    padding: 0;
  }
`;

export const ConfidentialFolder = styled.div`
  background: #050505; /* Um pouco mais escuro para as cores saltarem */
  border: 1px solid #ff005544;
  padding: 30px;
  position: relative;
  overflow: hidden;
  min-height: 500px;
  box-shadow: inset 0 0 50px rgba(255, 0, 85, 0.05);

  .classified-tape {
    content: "CLASSIFIED - TOP SECRET";
    position: absolute;
    top: 50px;
    right: -70px;
    background: #ff0055;
    color: #000;
    font-weight: 900;
    font-size: 0.75rem;
    padding: 8px 60px;
    transform: rotate(45deg);
    z-index: 10;
    box-shadow: 0 0 20px rgba(0, 242, 255, 0.2);
    text-transform: uppercase;
  }

  .watermark {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-30deg);
    font-size: 15rem;
    font-weight: 900;
    color: rgba(255, 0, 85, 0.03);
    pointer-events: none;
    z-index: 1;
    user-select: none;
  }

  .confidential-header {
    border-bottom: 2px solid #ff0055;
    margin-bottom: 20px;
    padding-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    /* Adiciona um reflexo ciano na linha vermelha */
    box-shadow: 0 4px 10px -5px rgba(0, 242, 255, 0.3);
  }

  .confidential-subtitle {
    font-family: "JetBrains Mono", monospace;
    color: #00f2ff;
    font-size: 0.75rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: bold;
    text-shadow: 0 0 8px rgba(0, 242, 255, 0.5);
  }
`;

export const EnigmaTextArea = styled.textarea`
  background: transparent;
  border: none;
  border-left: 2px solid #ff005522;
  color: #ffb3c1;
  width: 100%;
  font-family: "JetBrains Mono", monospace;
  font-size: 1rem;
  line-height: 1.6;
  padding: 15px;
  outline: none;
  position: relative;
  z-index: 5;
  min-height: 400px;
  resize: vertical;

  &:focus {
    background: rgba(255, 0, 85, 0.02);
    border-left: 2px solid #ff0055;
  }

  &::placeholder {
    color: #561123;
  }
`;

export const CyberInputGhost = styled.input`
  background: transparent;
  border: none;
  color: #fff;
  font-family: "JetBrains Mono", monospace;
  font-weight: bold;
  font-size: 1rem;
  width: 100%;
  outline: none;
  text-transform: uppercase;
  letter-spacing: 1px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
`;

export const ActionModuleCard = styled.div`
  background: #0a0f18;
  border: 1px solid #1a222f;
  margin-bottom: 15px;
  position: relative;
  transition: all 0.2s ease;
  /* O corte no canto inferior direito */
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - 15px),
    calc(100% - 15px) 100%,
    0 100%
  );

  &:hover {
    border-color: ${(props) => props.typeColor || "#3b82f6"}88;
    transform: translateX(5px);
    box-shadow: -5px 0 0 ${(props) => props.typeColor || "#3b82f6"};
  }

  .module-header {
    background: rgba(255, 255, 255, 0.02);
    padding: 8px 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .module-number {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.65rem;
    color: #000;
    background: ${(props) => props.typeColor || "#3b82f6"};
    padding: 2px 10px;
    font-weight: 900;
    margin-right: 15px;
  }
`;

export const CyberInputMiniSelect = styled(Form.Select)`
  background: #000 !important;
  color: #fff !important;
  border: 1px solid #1a222f !important;
  border-radius: 0 !important;
  font-family: "JetBrains Mono", monospace !important;

  /* Aumento de tamanho e peso */
  font-size: 0.9rem !important;
  font-weight: 800 !important;
  height: 40px !important; /* Altura mais robusta */
  padding: 0 15px !important;

  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${CyberTheme.blue} !important;
    box-shadow: 0 0 15px ${CyberTheme.blue}44 !important;
    background: #050505 !important;
  }

  option {
    background: #0c121d;
    color: #fff;
    font-weight: bold;
    padding: 10px;
  }
`;

export const ActionDeleteButton = styled.button`
  background: transparent;
  border: none;
  color: #444;
  transition: 0.3s;
  padding: 5px;

  &:hover {
    color: ${CyberTheme.red};
    filter: drop-shadow(0 0 5px ${CyberTheme.red});
  }
`;

export const CyberInput = styled(Form.Control)`
  background: rgba(0, 0, 0, 0.6) !important;
  border: 1px solid ${CyberTheme.border} !important;
  color: #fff !important;
  font-family: "JetBrains Mono", monospace !important;
  font-size: 0.9rem !important;
  border-radius: 0 !important;
  padding: 8px 12px !important;
  transition: all 0.3s ease !important;

  &:focus {
    background: rgba(0, 0, 0, 0.8) !important;
    border-color: ${(props) => props.focusColor || CyberTheme.blue} !important;
    box-shadow: 0 0 10px ${(props) => props.focusColor || CyberTheme.blue}33 !important;
    color: #fff !important;
  }

  &::placeholder {
    color: ${CyberTheme.textMuted} !important;
    opacity: 0.5;
  }
`;

export const CyberInputGroup = styled(InputGroup)`
  .input-group-text {
    background: #000 !important;
    border: 1px solid ${CyberTheme.border} !important;
    border-right: none !important;
    border-radius: 0 !important;
    color: ${CyberTheme.blue};
  }

  input {
    border-left: none !important;
  }
`;
