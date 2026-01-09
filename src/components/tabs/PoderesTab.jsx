import { useMemo, useState } from "react";
import { Card, Stack, Badge, Form, Row, Col } from "react-bootstrap";

const TAG_STYLES = {
  // ORIGEM
  origem: { bg: "secondary", label: "Origem", group: "origem" },
  classe: { bg: "primary", label: "Classe", group: "origem" },
  trilha: { bg: "info", label: "Trilha", group: "origem" },
  transcender: { bg: "danger", label: "Transcender", group: "origem" },
  outros: { bg: "dark", label: "Outros", group: "origem" },

  // USO
  combate: { bg: "danger", label: "Combate", group: "uso" },
  investigacao: { bg: "warning", label: "Investigação", group: "uso" },
  social: { bg: "success", label: "Social", group: "uso" },
  exploracao: { bg: "info", label: "Exploração", group: "uso" },
  ritual: { bg: "primary", label: "Ritual", group: "uso" },
  suporte: { bg: "secondary", label: "Suporte", group: "uso" },
  passivo: { bg: "dark", label: "Passivo", group: "uso" },
  reacao: { bg: "success", label: "Reação", group: "uso", textDark: true },
};

function normalize(text = "") {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function PoderesTab({ character }) {
  const [search, setSearch] = useState("");
  const [activeTags, setActiveTags] = useState(new Set());

  const poderes = character.poderes ?? [];

  /* =========================
     TAGS DISPONÍVEIS
  ========================= */
  const availableTags = useMemo(() => {
    const set = new Set();
    poderes.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [poderes]);

  /* =========================
     FILTRO
  ========================= */
  const filteredPoderes = useMemo(() => {
    const query = normalize(search);

    return poderes.filter((poder) => {
      // TEXTO
      const textMatch =
        !query ||
        normalize(poder.titulo).includes(query) ||
        normalize(poder.descricao).includes(query);

      if (!textMatch) return false;

      // TAGS
      if (activeTags.size === 0) return true;

      const poderTags = poder.tags ?? [];
      return Array.from(activeTags).every((t) => poderTags.includes(t));
    });
  }, [poderes, search, activeTags]);

  function toggleTag(tag) {
    setActiveTags((prev) => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  }
  function renderTag(tag, clickable = false) {
    const cfg = TAG_STYLES[tag.toLowerCase()];
    const active = activeTags.has(tag);

    return (
      <Badge
        key={tag}
        bg={cfg?.bg ?? "secondary"}
        className="me-1 mb-1"
        style={{
          opacity: clickable && !active ? 0.45 : 1,
          cursor: clickable ? "pointer" : "default",
        }}
        onClick={clickable ? () => toggleTag(tag) : undefined}
      >
        {cfg?.label ?? tag}
      </Badge>
    );
  }

  return (
    <Card
      style={{
        backgroundColor: "#161a22",
        border: "1px solid #2a2f3e",
      }}
    >
      <Card.Header
        style={{
          backgroundColor: "#1e2330",
          borderBottom: "1px solid #2a2f3e",
          fontWeight: 600,
        }}
      >
        Habilidades & Poderes
      </Card.Header>

      <Card.Body>
        {/* 🔎 BUSCA */}
        <Form.Control
          placeholder="Buscar por nome ou descrição..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-3"
          style={{
            backgroundColor: "#0f1220",
            color: "#e6e6e6",
            border: "1px solid #2a2f3e",
          }}
        />

        {/* 🏷️ FILTRO DE TAGS */}
        {availableTags.length > 0 && (
          <div style={{ marginBottom: "1rem" }}>
            <div
              style={{
                fontSize: "0.75rem",
                color: "#9aa0b3",
                marginBottom: "0.25rem",
              }}
            >
              Filtrar por tags
            </div>
            <div>{availableTags.map((t) => renderTag(t, true))}</div>
          </div>
        )}

        {/* 📦 LISTA */}
        <Stack gap={3}>
          {filteredPoderes.map((poder) => (
            <Card
              key={poder.id}
              style={{
                backgroundColor: "#1e2330",
                border: "1px solid #2a2f3e",
              }}
            >
              <Card.Body>
                <strong style={{ fontSize: "1rem" }}>{poder.titulo}</strong>

                {poder.tags?.length > 0 && (
                  <div style={{ margin: "0.35rem 0 0.5rem" }}>
                    {poder.tags.map((t) => renderTag(t))}
                  </div>
                )}

                <div
                  style={{
                    whiteSpace: "pre-wrap",
                    fontSize: "0.9rem",
                    color: "#d0d3e0",
                    lineHeight: "1.4",
                  }}
                >
                  {poder.descricao}
                </div>
              </Card.Body>
            </Card>
          ))}

          {filteredPoderes.length === 0 && (
            <div
              style={{
                fontSize: "0.85rem",
                color: "#9aa0b3",
                textAlign: "center",
              }}
            >
              Nenhuma habilidade encontrada com os filtros atuais.
            </div>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}
