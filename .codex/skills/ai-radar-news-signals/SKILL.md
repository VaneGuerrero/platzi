---
name: ai-radar-news-signals
description: Convertir noticias recientes de inteligencia artificial en señales estructuradas de AI Radar. Usar cuando el usuario pida noticias de IA, últimas novedades, señales, radar, fuente/evidencia/impacto/acción/estado, o guardar una búsqueda diaria de noticias como JSON.
---

# AI Radar News Signals

## Flujo principal

1. **Confirmar actualidad con búsqueda web** cuando el usuario pida noticias recientes, últimas noticias, hoy, esta semana, o cualquier dato temporal.
2. **Seleccionar señales, no solo titulares**: priorizar noticias con impacto en producto, modelos, regulación, infraestructura, seguridad, negocio o adopción.
3. **Normalizar cada noticia** con estos campos:
   - `fuente`: publisher, título/enlace y tipo de fuente.
   - `evidencia`: resumen verificable y observaciones que justifican la señal.
   - `impacto`: nivel (`low`, `medium`, `high`, `very_high`), áreas afectadas y por qué importa.
   - `acción`: recomendación y próximos pasos concretos.
   - `estado`: etiqueta operativa, etapa y confianza.
4. **Explicar inferencias**: separar lo que dice la fuente de lo que se infiere como impacto o acción.
5. **Citar fuentes** con enlaces cuando la respuesta sea conversacional.
6. **Guardar JSON diario** si el usuario pide persistir, guardar, snapshot, contrato o archivo.

## Criterios de selección

Priorizar una noticia como señal si cumple al menos uno:

- Cambia costos, disponibilidad o capacidad de infraestructura de IA.
- Afecta modelos frontera, agentes, benchmarks, entrenamiento o evaluación.
- Tiene impacto regulatorio, legal, de seguridad, privacidad o menores.
- Cambia la estrategia de una empresa importante o una plataforma usada por builders.
- Indica adopción real, despliegue comercial o riesgo operativo.

Evitar señales basadas solo en hype, demos sin evidencia, rumores sin fuente clara o duplicados de una misma noticia.

## Estados recomendados

- `watch`: relevante para seguimiento, sin acción inmediata.
- `alert`: riesgo o cambio que requiere atención.
- `active`: regulación, lanzamiento o evento con fecha/efecto operativo claro.
- `developing`: producto, iniciativa o competencia todavía en desarrollo.
- `strategic_exploration`: señal temprana de alto potencial pero madurez incierta.

## Guardado como JSON diario

Si existe `contracts/ai-radar-daily-search.schema.json`, usarlo como contrato. Si no existe, crearlo antes de guardar el snapshot.

Ruta recomendada para snapshots:

```text
snapshots/daily/YYYY-MM-DD-ai-news-signals.json
```

El JSON debe incluir:

- `contractVersion`
- `radar`
- `search`
- `signals[]`

Cada señal debe incluir `id`, `title`, `category`, `source`, `evidence`, `impact`, `action` y `status`.

Ver detalles del contrato en `references/daily-search-contract.md`.

## Validación mínima

Antes de finalizar cambios de archivos JSON:

```bash
python -m json.tool contracts/ai-radar-daily-search.schema.json >/tmp/schema.pretty
python -m json.tool snapshots/daily/YYYY-MM-DD-ai-news-signals.json >/tmp/signals.pretty
```

Si se modifica el repositorio, revisar `git status --short`, hacer commit y preparar PR según las instrucciones activas del entorno.
