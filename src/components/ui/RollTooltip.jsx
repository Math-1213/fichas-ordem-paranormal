import { OverlayTrigger, Tooltip, Form } from "react-bootstrap";

export default function RollTooltip({
  rolls = [],
  children,
  rollType = "teste",
  critico = 20,
  bonus = 0,
  onBonusChange,
}) {
  const hasRoll = Array.isArray(rolls) && rolls.length > 0;

  const allDiceValues = hasRoll ? rolls.flatMap((r) => r.rolls ?? []) : [];

  const diceTotal = hasRoll
    ? rolls.reduce((s, r) => {
        return s + (r.result ?? 0);
      }, 0)
    : 0;

  const totalFinal = diceTotal + bonus;
  const isCritico = allDiceValues.includes(critico);

  const shakeKeyframes = `
    @keyframes roll-shake {
      0% { transform: translateX(0); }
      25% { transform: translateX(-4px); }
      50% { transform: translateX(4px); }
      75% { transform: translateX(-4px); }
      100% { transform: translateX(0); }
    }
  `;

  // console.log(rolls, rollType, critico, bonus, totalFinal, isCritico)

  return (
    <>
      <style>{shakeKeyframes}</style>

      <OverlayTrigger
        placement="right"
        overlay={
          hasRoll ? (
            <Tooltip
              style={{
                backgroundColor: "#0f1220",
                border: "1px solid #2a2f3e",
                padding: "0.75rem",
                minWidth: "240px",
              }}
            >
              <div
                style={{
                  padding: "0.75rem",
                  animation: isCritico ? "roll-shake 0.35s" : "none",
                }}
              >
                <div style={{ fontSize: "0.75rem", color: "#9aa0b3" }}>
                  Rolagem ({rollType})
                </div>

                {rolls.map((r, i) => (
                  <div key={i} style={{ fontSize: "0.8rem" }}>
                    <span style={{ color: "#9aa0b3" }}>
                      {r.baseQuantity}{r.dice}:
                    </span>{" "}
                    {r.rolls.map((v, j) => (
                      <span
                        key={j}
                        style={{
                          fontWeight: 700,
                          color: v === critico ? "#facc15" : "#e6e6e6",
                        }}
                      >
                        {v}
                        {j < r.rolls.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                ))}

                <div style={{ marginTop: "0.4rem", fontSize: "0.85rem" }}>
                  Dados:{" "}
                  <strong style={{ color: "#8b5cf6" }}>{diceTotal}</strong>
                </div>

                {onBonusChange && (
                  <Form.Group className="mt-2">
                    <Form.Label
                      style={{ fontSize: "0.7rem", color: "#9aa0b3" }}
                    >
                      Bônus
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      type="number"
                      value={bonus}
                      onChange={(e) => onBonusChange(Number(e.target.value))}
                      style={{
                        backgroundColor: "#161a22",
                        color: "#e6e6e6",
                        border: "1px solid #2a2f3e",
                      }}
                    />
                  </Form.Group>
                )}

                <div style={{ marginTop: "0.5rem" }}>
                  Total:{" "}
                  <strong
                    style={{
                      color: isCritico ? "#facc15" : "#22c55e",
                      fontSize: "1rem",
                    }}
                  >
                    {totalFinal}
                  </strong>
                </div>

                {isCritico && (
                  <div
                    style={{
                      marginTop: "0.3rem",
                      fontSize: "0.75rem",
                      color: "#facc15",
                    }}
                  >
                    ★ CRÍTICO ★
                  </div>
                )}
              </div>
            </Tooltip>
          ) : (
            <Tooltip style={{ fontSize: "0.75rem" }}>Clique para rolar</Tooltip>
          )
        }
      >
        {children}
      </OverlayTrigger>
    </>
  );
}
