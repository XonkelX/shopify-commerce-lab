# Estado general del Shopify Commerce Lab

**Fecha de corte:** 19 de septiembre de 2026

**Alcance:** lo implementado y verificado en las fases 0–9 del Evidence Kit; no equivale a un lanzamiento comercial ni a una garantía de producción.

## Resumen ejecutivo

El proyecto tiene implementaciones reales de las fases 0–9, pero **no cumple todavía todas las puertas estrictas de evidencia del prompt**. Hay un [repositorio público](https://github.com/XonkelX/shopify-commerce-lab), una [galería para compradores](../shopify/README.md), un tema Shopify **no publicado** y una app que ejecutó GraphQL y webhooks reales en la tienda de desarrollo. Falta publicar los tres estados «antes» de los bugs y grabar el flujo completo del configurador. La [auditoría estricta](strict-acceptance-audit.md) separa implementación de aceptación.

Esto constituye evidencia creíble para trabajos Shopify **acotados**, pero no un Evidence Kit totalmente cerrado según la secuencia del `.md`. Lo prioritario es cerrar primero las imágenes antes/después y el video de configuración; después, hacer que la app sea revisable sin túnel local.

## Qué se cumplió

| Fase | Resultado comprobado | Evidencia principal |
|---|---|---|
| 0 — Infraestructura | Repositorio aislado, tema Skeleton, flujo seguro hacia tema no publicado y Theme Check reproducible. | [Reporte](phase-0-completion.md) |
| 1 — Sección personalizada | Comparador configurable en Theme Editor, bloques reordenables y diseño desktop/móvil. | [Prueba para compradores](../shopify/custom-section.md) · [Reporte](phase-1-completion.md) |
| 2 — PDP avanzado | Variantes reales, precio, media, disponibilidad, URL, carrito AJAX, metafields y metaobject. | [Prueba](../shopify/advanced-pdp.md) · [Reporte](phase-2-completion.md) |
| 3 — Corrección de bugs | Tres defectos reales corregidos; faltan capturas durables de los tres estados antes. **INCOMPLETA** bajo el prompt. | [Caso](../case-studies/bug-fix-lab.md) · [Reporte](phase-3-completion.md) |
| 4 — Configurador | Personalización validada en carrito; falta video real del flujo. **INCOMPLETA** como paquete de evidencia. | [Prueba](../shopify/product-configurator.md) · [Reporte](phase-4-completion.md) |
| 5 — Lógica de compra | Calculadora de cajas completas, límites, estados sin inventario y cantidad correcta en carrito. | [Prueba](../shopify/cart-purchase-logic.md) · [Reporte](phase-5-completion.md) |
| 6 — Carrito | Drawer AJAX con cantidad, eliminación, subtotal autoritativo, errores, móvil y teclado. | [Caso](../case-studies/cart-engineering.md) · [Reporte](phase-6-completion.md) |
| 7 — Calidad | Theme Check limpio, nueve mediciones Lighthouse, accesibilidad práctica, correcciones y automatización. | [Prueba](../shopify/performance-qa.md) · [Reporte](phase-7-completion.md) |
| 8 — Portafolio | Seis páginas con capturas reales y clips de estados; **INCOMPLETA** por brechas de fases 3/4 y acceso gated. | [Hub](../shopify/README.md) · [Reporte](phase-8-completion.md) |
| 9 — Integración | App React Router con GraphQL/webhooks reales, PostgreSQL y panel; **INCOMPLETA** bajo el prerequisito formal de fase 8. | [Caso](../case-studies/inventory-sync-monitor.md) · [Reporte](phase-9-completion.md) |

### Pruebas técnicas y de entrega más fuertes

- **Storefront:** todos los módulos de tema se probaron en la tienda Oniel Lab y se subieron al tema de evidencia `155175092398`, que permanece **sin publicar**. No se afirma que el tema de producción haya sido modificado.
- **Calidad:** el cierre de fase 7 registró Theme Check sobre 45 archivos con cero errores, advertencias o supresiones; medianas de tres ejecuciones Lighthouse por página; pruebas de teclado/accesibilidad y límites documentados. El workflow alojado en GitHub pasó posteriormente en los commits de fase 9.
- **App:** el producto QA `PHASE9-QA-001` estaba fuera de todos los canales de venta. Un webhook real provocó la corrección de inventario **4 → 16** mediante Admin GraphQL. El webhook provocado por esa escritura registró **16 → 16, omitido**, sin bucle.
- **Recuperación:** se vieron dos respuestas 503 del almacén simulado y éxito en el tercer intento. Un fallo de tres intentos quedó visible sin mutar inventario. El primer error real de esquema GraphQL se conservó en el log, se corrigió y Shopify reintentó el mismo evento hasta procesarlo.
- **Persistencia y seguridad de eventos:** Prisma/PostgreSQL conserva corridas, intentos y webhooks; pruebas de integración cubren reclamo de eventos fallidos, supresión de duplicados y omisión si la cantidad ya coincide. La concurrencia duplicada se probó localmente, no como una carrera observada en Shopify.
- **Código/evidencia pública:** [fuente y documentación](https://github.com/XonkelX/shopify-commerce-lab), [capturas de la app](../shopify/assets/inventory-sync-dashboard.png), [log de reintentos](../shopify/assets/inventory-sync-retry.png) y [webhooks](../shopify/assets/inventory-sync-webhooks.png). El [video de fase 9](../shopify/assets/inventory-sync-evidence-walkthrough.mp4) es una secuencia de capturas reales, **no una grabación de interacción en vivo**. Las [nuevas capturas durables](strict-acceptance-audit.md#evidence-added-in-this-pass) cierran parte de las brechas visuales.

## Qué falta para una entrega más sólida

### Prioridad 1 — Cerrar las puertas estrictas del storefront

1. Reconstruir en un tema no publicado los tres estados previos desde `049ab5c^`, etiquetarlos claramente como reconstrucciones y guardarlos junto a las tres nuevas capturas posteriores.
2. Grabar una interacción real completa del configurador hasta el carrito, sin exponer credenciales ni ventanas privadas.
3. Revalidar el hub y sus enlaces para un comprador externo; el preview puede pedir contraseña y no debe presentarse como público irrestricto.

### Prioridad 2 — Cerrar la dependencia del entorno local

1. Desplegar la app y PostgreSQL en un entorno persistente con secretos, migraciones y URL HTTPS estables. No publicar un conector de inventario como operativo antes de definir permisos, propiedad de datos y recuperación.
2. Verificar instalación/autenticación, lectura GraphQL y recepción de webhooks **después de reiniciar** el servicio; registrar resultados y procedimiento de rollback.
3. Añadir monitoreo y alertas para fallos de webhook/sync, con una ruta operativa para reintentar o investigar eventos retenidos.
4. Grabar un video corto de interacción real: abrir app, mostrar un caso QA controlado, reintento y log. El clip actual sigue siendo útil, pero no sustituye esa demostración.

**Criterio de cierre:** un evaluador autorizado puede abrir una app estable sin ejecutar `shopify app dev`; una prueba QA posterior a reinicio entrega webhook, sincroniza o se omite correctamente y deja un registro inspeccionable.

### Prioridad 3 — Mejorar la inspección pública

- Mantener el [hub](../shopify/README.md), el `README` principal y el [mapa de trabajos](job-mapping.md) sincronizados con los logros de fase 9. Este documento es el panorama completo; las páginas cortas siguen siendo la entrada para un posible cliente.
- El [nuevo gate CI de la app](https://github.com/XonkelX/shopify-commerce-lab/actions/runs/35472771079) ya pasó en GitHub (instalación, typecheck, unit tests, lint y build); incorporar integración con PostgreSQL al CI solo si se añade un servicio de prueba reproducible. La prueba de integración actual sigue siendo local.
- Preparar una demostración revisable sin compartir credenciales de Shopify: video real y capturas bastan para la primera inspección; acceso al admin solo para quien esté autorizado.

### Opcional, solo si coincide con el trabajo que quieres vender

- Conectar un almacén sandbox real y documentar contratos de datos, paginación, mapeos de SKU/ubicación y discrepancias.
- Añadir cola de trabajos, reconciliación programada, replay controlado y alertas si el alcance exige volumen o tolerancia a fallos mayores.
- Crear pruebas separadas para bundles, suscripciones, Shopify Functions, checkout extensions o Plus **solo** si quieres postular a esas categorías. No son requisitos para vender los módulos actuales.
- Incorporar resultados de clientes, tráfico o conversión únicamente cuando existan y se puedan atribuir/verificar; no inventar métricas.

## Qué sería «perfecto» para este proyecto

No significa construir todas las funciones posibles. Significa que cada promesa de la portada pueda comprobarse en menos de dos minutos con una ruta clara: **problema → comportamiento real → código → pruebas → límites**. Para el objetivo actual, el storefront ya tiene esa forma. El punto todavía débil es la permanencia y operación de la app. Una vez resuelta la prioridad 1 y grabado el flujo en vivo, conviene detener la expansión y usar la evidencia para postular a trabajos acotados.

## Límites que deben seguir explícitos

- El tema de evidencia no está publicado y sus previews pueden pedir contraseña; no presentar la tienda como lanzamiento productivo.
- La app usa un almacén simulado y, en la evidencia actual, un túnel de desarrollo; no prometer sincronización empresarial ni disponibilidad 24/7.
- No hay prueba de ventas, clientes pagadores, mejora de conversión ni Core Web Vitals de campo en producción.
- No reclamar App Store, multi-tenant SaaS, Functions, checkout extensions, bundles, suscripciones o arquitectura Plus a partir de estas fases.

## Veredicto

**Implementaciones sustanciales y reales; Evidence Kit estricto todavía incompleto.** El siguiente paso de mayor retorno es cerrar el antes/después y el video de flujo, y luego despliegue durable + verificación operativa de la app. No hace falta otra fase de features.
