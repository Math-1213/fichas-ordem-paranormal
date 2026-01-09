import { OverlayTrigger, Tooltip, Form } from "react-bootstrap";

export default function RollTooltip({
  roll,
  children,
  rollType = "teste",
  critico = 20,
  bonus = 0,
  onBonusChange,
}) {
  if (!roll) return children;
  // Normaliza rolls:
  // - suporta roll antigo: { rolls: number[], result }
  // - suporta roll novo: { rolls: [{ rolls: number[], total }], bonus }

  const rollGroups = Array.isArray(roll.rolls) ? roll.rolls : [];

  const allDice =
    rollGroups.length > 0 && typeof rollGroups[0] === "object"
      ? rollGroups.flatMap((r) => r.rolls)
      : roll.rolls;

  const diceTotal =
    rollGroups.length > 0 && typeof rollGroups[0] === "object"
      ? rollGroups.reduce((sum, r) => sum + r.total, 0)
      : roll.result;

  const baseBonus = roll.bonus ?? 0;

  const isCritico = allDice.includes(critico);

  const shakeKeyframes = `
    @keyframes roll-shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    50% { transform: translateX(4px); }
    75% { transform: translateX(-4px); }
    100% { transform: translateX(0); }
    }
    `;

  return (
    <>
      <style>{shakeKeyframes}</style>

      <OverlayTrigger
        placement="right"
        overlay={
          <Tooltip
            style={{
              backgroundColor: "#0f1220",
              border: "1px solid #2a2f3e",
              padding: "0.75rem",
              minWidth: "220px",
            }}
          >
            <div
              style={{
                padding: "0.75rem",
                animation: isCritico ? "roll-shake 0.35s" : "none",
              }}
            >
              {/* Tipo */}
              <div style={{ fontSize: "0.75rem", color: "#9aa0b3" }}>
                Rolagem ({rollType})
              </div>

              {/* Dados */}
              <div style={{ marginBottom: "0.5rem" }}>
                {allDice.map((r, i) => (
                  <span
                    key={i}
                    style={{
                      fontWeight: 700,
                      color: r === critico ? "#facc15" : "#e6e6e6",
                    }}
                  >
                    {r}
                    {i < roll.rolls.length - 1 && ", "}
                  </span>
                ))}
              </div>

              {/* Resultado */}
              <div style={{ fontSize: "0.85rem" }}>
                Resultado:{" "}
                <strong style={{ color: "#8b5cf6" }}>
                  {diceTotal + baseBonus}
                </strong>
              </div>

              {/* Bônus editável */}
              {onBonusChange && (
                <Form.Group className="mt-2">
                  <Form.Label style={{ fontSize: "0.7rem", color: "#9aa0b3" }}>
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

              {/* Total */}
              <div style={{ marginTop: "0.5rem" }}>
                Total:{" "}
                <strong
                  style={{
                    color: isCritico ? "#facc15" : "#22c55e",
                    fontSize: "1rem",
                  }}
                >
                  {diceTotal + baseBonus + bonus}
                </strong>
              </div>

              {/* Crítico */}
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
        }
      >
        {children}
      </OverlayTrigger>
    </>
  );
}
