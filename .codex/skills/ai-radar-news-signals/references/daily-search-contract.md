# AI Radar Daily Search Contract Reference

Use this reference when creating or updating an AI Radar daily news snapshot.

## Top-level object

```json
{
  "contractVersion": "1.0.0",
  "radar": {
    "name": "AI Radar",
    "description": "Snapshot diario de senales recientes de inteligencia artificial, normalizadas por fuente, evidencia, impacto, accion y estado."
  },
  "search": {
    "id": "YYYY-MM-DD-ai-news-signals",
    "query": "5 noticias recientes de inteligencia artificial como senales de AI Radar",
    "runDate": "YYYY-MM-DD",
    "timezone": "Etc/UTC",
    "language": "es",
    "requestedFormat": ["fuente", "evidencia", "impacto", "accion", "estado"],
    "sourcePolicy": "Noticias y analisis recientes encontrados en busqueda web; se guarda la URL usada como fuente de evidencia."
  },
  "signals": []
}
```

## Signal object

```json
{
  "id": "stable-kebab-case-id",
  "title": "Titulo de la senal",
  "category": "categoria-kebab-case",
  "source": {
    "name": "Titulo de la fuente",
    "publisher": "Publisher",
    "url": "https://example.com/article",
    "type": "news"
  },
  "evidence": {
    "summary": "Resumen de la evidencia principal.",
    "observations": ["Observacion concreta que sostiene la senal."]
  },
  "impact": {
    "level": "high",
    "summary": "Por que importa.",
    "affectedAreas": ["modelos", "producto", "regulacion"]
  },
  "action": {
    "recommendation": "Que hacer con esta senal.",
    "nextSteps": ["Paso siguiente concreto."]
  },
  "status": {
    "label": "Etiqueta humana",
    "stage": "watch",
    "confidence": "medium"
  }
}
```

## Enumerations

- `source.type`: `news`, `analysis`, `report`, `index`
- `impact.level`: `low`, `medium`, `high`, `very_high`
- `status.stage`: `watch`, `alert`, `active`, `developing`, `strategic_exploration`
- `status.confidence`: `low`, `medium`, `high`
