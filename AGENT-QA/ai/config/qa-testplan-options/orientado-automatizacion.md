# Estrategia: Orientado a Automatización

## Resumen
Plan de pruebas enfocado en automatización continua y validación en pipelines CI/CD.

## Cuándo usar
Cuando el proyecto:
- tiene alta frecuencia de despliegues
- requiere regresión continua
- trabaja con DevOps
- necesita escalabilidad QA

## Reglas del plan de pruebas
1. Priorizar escenarios automatizables.
2. Definir:
   - alcance manual
   - alcance automatizado
3. Clasificar pruebas:
   - smoke
   - regression
   - integration
   - API
4. Integrar ejecución en CI/CD.
5. Definir manejo de datos de prueba.
6. Identificar dependencias técnicas.
7. Establecer métricas de automatización.

## Tipos de prueba sugeridos
- Automated regression
- API automation
- UI automation
- Smoke automation
- Integration automation

## Métricas sugeridas
- % automatización
- Tiempo de ejecución
- Flaky tests
- Cobertura automática

## Salida esperada
- Estrategia automatizada
- Cobertura automática
- Riesgos manuales
- Integración CI/CD
- Priorización de automatización