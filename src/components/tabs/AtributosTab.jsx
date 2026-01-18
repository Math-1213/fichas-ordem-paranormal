import { useState } from "react";
import Dice from "../../models/Dice";
import RollTooltip from "../ui/RollTooltip";
import { ELEMENT_DATA } from "../../configs/paranormal";

const ATRIBUTOS_LABELS = {
  forca: "FORÇA",
  agilidade: "AGILIDADE",
  intelecto: "INTELECTO",
  presenca: "PRESENÇA",
  vigor: "VIGOR",
};

/**
 * Mapeamento de Atributo para Elemento
 */
const ATRIBUTO_ELEMENTO = {
  forca: "sangue",
  vigor: "sangue",
  intelecto: "conhecimento",
  presenca: "morte",
  agilidade: "energia",
};

const POSICOES = {
  forca: { top: "35%", left: "19%" },
  intelecto: { top: "35%", left: "81%" },
  agilidade: { top: "15%", left: "50%" },
  presenca: { top: "72%", left: "27.5%" },
  vigor: { top: "72%", left: "72%" },
};

export default function AtributosTab({ character }) {
  const atributos = character.atributos;
  const [lastRoll, setLastRoll] = useState(null);
  const [activeAttr, setActiveAttr] = useState(null);

  function handleRoll(nome, valor) {
    const roll = Dice.roll("d20", valor, "teste", 0, 0);
    setLastRoll(roll);
    setActiveAttr(nome);
  }

  return (
    <div className="d-flex justify-content-center align-items-center p-3">
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "500px",
          aspectRatio: "1 / 1",
          backgroundImage: "url('/Sprites/Atributos.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {Object.entries(atributos).map(([nome, valor]) => {
          const isActive = activeAttr === nome;
          const pos = POSICOES[nome];

          // Busca a cor baseada no elemento mapeado
          const elementoChave = ATRIBUTO_ELEMENTO[nome];
          const corElemento = ELEMENT_DATA[elementoChave]?.color || "#ffffff";

          if (!pos) return null;

          return (
            <div
              key={nome}
              style={{
                position: "absolute",
                top: pos.top,
                left: pos.left,
                transform: "translate(-50%, -50%)",
                zIndex: 10,
              }}
            >
              <RollTooltip
                rolls={isActive ? [lastRoll] : null}
                rollType="teste"
                critico={20}
                bonus={0}
              >
                <div
                  onClick={() => handleRoll(nome, valor)}
                  style={{
                    cursor: "pointer",
                    userSelect: "none",
                    transition: "all 0.2s ease",
                    /* HITBOX: Definimos um tamanho fixo para o clique */
                    width: "100px",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "20%", // Opcional: apenas para visualizar área se necessário
                    filter: isActive
                      ? `drop-shadow(0 0 12px ${corElemento})`
                      : "none",
                  }}
                >
                  <div
                    style={{
                      color: corElemento, // Agora usa a cor do elemento
                      fontSize: "3.5rem",
                      fontWeight: "900",
                      lineHeight: "1",
                      textShadow: `0 0 15px ${corElemento}66, 2px 2px 4px #000`,
                      transform: isActive ? "scale(1.1)" : "scale(1)",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    {valor}
                  </div>
                </div>
              </RollTooltip>
            </div>
          );
        })}

        {/* Display do Resultado no Centro */}
        {lastRoll && (
          <div
            style={{
              position: "absolute",
              top: "58%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                fontSize: "0.6rem",
                color: "#aaa",
                letterSpacing: "2px",
              }}
            >
              RESULTADO
            </div>
            <div
              style={{
                fontSize: "1.8rem",
                fontWeight: "bold",
                color: "#4ade80",
                textShadow: "0 0 15px rgba(74,222,128,0.6)",
              }}
            >
              {lastRoll.resultadoFinal}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
