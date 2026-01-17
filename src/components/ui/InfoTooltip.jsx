import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Info } from "lucide-react";

const InfoTooltip = ({
  content,
  placement = "top",
  children,
  iconSize = 16,
  iconColor = "#0dcaf0",
}) => {
  const parseContent = (text) => {
    if (typeof text !== "string") return text;
    // Quebramos por linha para processar as listas separadamente
    const lines = text.split("\n");

    return lines.map((line, lineIdx) => {
      const isListItem = line.trim().startsWith("-");
      const cleanLine = isListItem ? line.trim().substring(1).trim() : line;

      // Regex que já tínhamos (Cores e Negrito)
      const regex =
        /(?:#(\*\*|)(.*?)\1#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}))|(?:\*\*(.*?)\*\*)/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(cleanLine)) !== null) {
        if (match.index > lastIndex) {
          parts.push(cleanLine.substring(lastIndex, match.index));
        }
        if (match[3]) {
          const isBold = match[1] === "**";
          const contentText = match[2];
          const hexColor = `#${match[3]}`;
          parts.push(
            <span
              key={match.index}
              style={{
                color: hexColor,
                fontWeight: isBold ? "bold" : "normal",
              }}
            >
              {contentText}
            </span>
          );
        } else if (match[4]) {
          parts.push(<strong key={match.index}>{match[4]}</strong>);
        }
        lastIndex = regex.lastIndex;
      }
      if (lastIndex < cleanLine.length) {
        parts.push(cleanLine.substring(lastIndex));
      }
      return (
        <div
          key={lineIdx}
          style={{
            display: "flex",
            paddingLeft: isListItem ? "12px" : "0",
            marginBottom: "2px",
          }}
        >
          {isListItem && (
            <span style={{ marginRight: "8px", color: "#0dcaf0" }}>•</span>
          )}
          <div style={{ flex: 1 }}>{parts}</div>
        </div>
      );
    });
  };
  
  const renderTooltip = (props) => (
    <Tooltip
      id="custom-tooltip"
      {...props}
      style={{ ...props.style, zIndex: 9999 }}
    >
      {/* ESTE É O SEGREDO: 
          Injetamos um CSS que força o 'tooltip-inner' a não ter limite de largura 
      */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .tooltip-inner {
          max-width: none !important;
          background-color: rgba(0, 0, 0, 0.9);
          border: 1px solid #444;
        }
      `,
        }}
      />
      <div
        style={{
          whiteSpace: "pre-line",
          textAlign: "left",
          maxWidth: "450px", // Limite real do seu texto
          minWidth: "250px",
          padding: "5px",
          fontSize: "0.85rem",
          lineHeight: "1.4",
        }}
      >
        {parseContent(content)}
      </div>
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement={placement}
      delay={{ show: 200, hide: 400 }}
      overlay={renderTooltip}
    >
      <span
        style={{
          cursor: "help",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          verticalAlign: "middle",
          marginLeft: "6px",
          lineHeight: 1, // Ajustado para centralizar melhor
        }}
      >
        {children || <Info size={iconSize} color={iconColor} />}
      </span>
    </OverlayTrigger>
  );
};

export default InfoTooltip;
