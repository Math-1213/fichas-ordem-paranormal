import { useMemo, useState } from "react";
import { Card, Stack, Badge, Form } from "react-bootstrap";

/**
 * Definição estética das Tags de habilidades.
 * Divide as tags entre 'origem' (quem deu o poder) e 'uso' (como ele funciona).
 * @constant
 */
const TAG_STYLES = {
  // ORIGEM
  origem: { bg: "secondary", label: "Origem" },
  classe: { bg: "primary", label: "Classe" },
  trilha: { bg: "info", label: "Trilha" },
  transcender: { bg: "danger", label: "Transcender" },
  outros: { bg: "dark", label: "Outros" },

  // USO/TIPO
  combate: { bg: "danger", label: "Combate" },
  investigacao: { bg: "warning", label: "Investigação" },
  social: { bg: "success", label: "Social" },
  exploracao: { bg: "info", label: "Exploração" },
  ritual: { bg: "primary", label: "Ritual" },
  suporte: { bg: "secondary", label: "Suporte" },
  passivo: { bg: "dark", label: "Passivo" },
  reacao: { bg: "success", label: "Reação" },
};

/**
 * Remove acentos e converte para minúsculo para buscas otimizadas.
 * @param {string} text
 * @returns {string} Texto normalizado.
 */
function normalize(text = "") {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Aba de Habilidades e Poderes.
 * Oferece um sistema de busca textual e filtragem por categorias (tags).
 * * @component
 * @param {Object} props
 * @param {Character} props.character - Instância do personagem contendo a lista de poderes.
 */
export default function PoderesTab({ character }) {
  const [search, setSearch] = useState("");
  const [activeTags, setActiveTags] = useState(new Set());

  const poderes = character.poderes ?? [];

  /**
   * Extrai e ordena todas as tags únicas presentes nos poderes do personagem.
   * Memorizado para evitar re-processamento em cada render.
   */
  const availableTags = useMemo(() => {
    const set = new Set();
    poderes.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [poderes]);

  /**
   * Lógica de Filtragem:
   * 1. Filtra por texto (Título ou Descrição) ignorando acentos.
   * 2. Filtra por Tags (Lógica AND: deve conter TODAS as tags selecionadas).
   */
  const filteredPoderes = useMemo(() => {
    const query = normalize(search);

    return poderes.filter((poder) => {
      const textMatch =
        !query ||
        normalize(poder.titulo).includes(query) ||
        normalize(poder.descricao).includes(query);

      if (!textMatch) return false;

      if (activeTags.size === 0) return true;
      const poderTags = poder.tags ?? [];
      return Array.from(activeTags).every((t) => poderTags.includes(t));
    });
  }, [poderes, search, activeTags]);

  /**
   * Gerencia a seleção/deseleção de filtros de tag.
   */
  function toggleTag(tag) {
    setActiveTags((prev) => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  }

  /**
   * Renderiza uma Badge baseada no mapeamento de estilos.
   */
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
          fontSize: clickable ? "0.75rem" : "0.7rem",
          transition: "opacity 0.2s",
        }}
        onClick={clickable ? () => toggleTag(tag) : undefined}
      >
        {cfg?.label ?? tag}
      </Badge>
    );
  }

  return (
    <Card style={{ backgroundColor: "#161a22", border: "1px solid #2a2f3e" }}>
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
        {/* Campo de Busca Visual Dark */}
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

        {/* Filtros Ativos */}
        {availableTags.length > 0 && (
          <div style={{ marginBottom: "1rem" }}>
            <div
              style={{
                fontSize: "0.75rem",
                color: "#9aa0b3",
                marginBottom: "0.35rem",
              }}
            >
              FILTRAR POR CATEGORIA:
            </div>
            <div>{availableTags.map((t) => renderTag(t, true))}</div>
          </div>
        )}

        {/* Lista de Cards de Poderes */}
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
                <div className="d-flex justify-content-between align-items-start">
                  <strong style={{ fontSize: "1.05rem", color: "#fff" }}>
                    {poder.titulo}
                  </strong>
                </div>

                {poder.tags?.length > 0 && (
                  <div style={{ margin: "0.4rem 0 0.6rem" }}>
                    {poder.tags.map((t) => renderTag(t))}
                  </div>
                )}

                <div
                  style={{
                    whiteSpace: "pre-wrap",
                    fontSize: "0.9rem",
                    color: "#d0d3e0",
                    lineHeight: "1.5",
                  }}
                >
                  {poder.descricao}
                </div>
              </Card.Body>
            </Card>
          ))}

          {/* Estado Vazio */}
          {filteredPoderes.length === 0 && (
            <div
              className="text-center py-4"
              style={{ color: "#9aa0b3", fontSize: "0.9rem" }}
            >
              Nenhuma habilidade encontrada para os critérios selecionados.
            </div>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}
