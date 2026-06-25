# Contexto de Negocio - Nexus CRM

## Estado

Contexto inicial registrado.

## Nombre del proyecto

Nexus CRM

## Objetivo de negocio

Centralizar y organizar toda la informacion comercial de empresas y contactos en una sola plataforma, permitiendo mejorar el seguimiento comercial, reducir duplicidad de datos, facilitar la trazabilidad de actividades y obtener metricas e insights para apoyar la toma de decisiones del negocio.

El sistema busca reemplazar procesos manuales manejados actualmente en multiples archivos Excel y mejorar el control operativo y comercial de la informacion.

## Dominio funcional

CRM B2B enfocado en gestion comercial e inteligencia de negocio.

El sistema esta orientado principalmente a:

- gestion de empresas
- gestion de contactos
- seguimiento comercial
- registro de actividades
- dashboards
- trazabilidad
- calidad de datos
- segmentacion e insights comerciales

## Usuarios involucrados

| Usuario | Necesidad principal |
|---|---|
| Gerencia | Visualizacion de metricas, dashboards, insights e indicadores comerciales para toma de decisiones; tambien configuracion del sistema, permisos, usuarios y administracion general como super admin. |
| Equipo comercial | Gestion de empresas, contactos, actividades y seguimiento comercial. |
| Analistas | Validacion de informacion, revision de calidad de datos, duplicados y seguimiento operativo. |

## Funcionalidades principales

- Gestion de empresas.
- Gestion de contactos.
- Asociacion de contactos a empresas.
- Registro de actividades comerciales.
- Dashboard comercial con KPIs.
- Visualizacion de insights y metricas.
- Carga masiva de informacion desde Excel.
- Gestion y validacion de duplicados.
- Filtros y preferencias de visualizacion.
- Segmentacion por sector o fuente de contacto.
- Alertas y seguimiento comercial.
- Control de calidad de correos corporativos y personales.

## Flujo funcional principal

1. Registro o importacion de empresas y contactos.
2. Validacion de informacion.
3. Almacenamiento.
4. Asociacion de contactos a empresas.
5. Registro de actividades comerciales.
6. Seguimiento y actualizacion.
7. Visualizacion de metricas e insights.
8. Generacion de alertas o acciones comerciales.

El sistema permitira gestionar el ciclo comercial desde la adquisicion del contacto hasta su seguimiento y analisis.

## Restricciones conocidas

- Actualmente la informacion se maneja en multiples archivos Excel y existe dispersion de datos.
- Existe riesgo alto de duplicados, inconsistencias, falta de trazabilidad y perdida de seguimiento comercial.
- Las reglas funcionales todavia no estan completamente definidas y muchas decisiones deben validarse con el negocio.
- El equipo de desarrollo es junior, por lo que se requiere una arquitectura simple, mantenible y escalable.
- El MVP debe ser controlado y no incluir todas las funcionalidades desde el inicio.

## Integraciones conocidas

- Importacion de Excel mediante carga masiva.
- Registro de fuente de contacto: LinkedIn, referidos, ferias, llamadas, Excel, campanas y otros.
- Manejo de correos corporativos y personales.
- Posibles integraciones futuras aun no definidas.
- Posibles automatizaciones y notificaciones futuras.

## Criticidad funcional

Alta.

El sistema manejara informacion comercial, seguimiento de clientes, trazabilidad, dashboards gerenciales, metricas de negocio y calidad de datos.

Ademas, soportara procesos importantes del negocio y centralizara informacion critica para operacion y toma de decisiones.

## Informacion funcional identificada

### Fuente de contacto

El sistema debe registrar la fuente mediante la cual se obtuvo un contacto.

Ejemplos confirmados:

- LinkedIn.
- Importacion Excel.
- Referido.
- Llamada.
- Feria.
- Campana.
- Otros.

### Calidad de correos

La calidad de los correos es importante para el negocio.

El sistema debe diferenciar:

- correos corporativos
- correos personales

Tambien podrian existir preferencias para visualizar unicamente ciertos tipos de correos.

### Metricas e insights

Las metricas e insights deben permitir analizar:

- calidad de contactos
- distribucion por sectores
- fuentes de adquisicion
- seguimiento comercial
- actividad comercial

Algunas metricas todavia requieren validacion funcional con el negocio.

## Posibles epicas iniciales

- Gestion de Empresas.
- Gestion de Contactos.
- Gestion de Actividades.
- Dashboard e Insights.
- Carga Masiva de Informacion.
- Gestion de Duplicados.
- Seguridad y Roles.
- Alertas y Seguimiento Comercial.

## Posibles entidades identificadas

- Empresa.
- Contacto.
- Actividad.
- Usuario.
- Rol.
- Fuente de Contacto.
- Sector.
- Duplicado.
- Metrica.
- Preferencia de Usuario.
- Dashboard.
- Notificacion.

## Pendientes por definir

- Flujo comercial exacto.
- Reglas de seguimiento.
- Definicion de estados.
- Logica de duplicados.
- KPIs definitivos.
- Roles exactos.
- Automatizaciones.
- Reglas de alertas.
- Permisos.
- Alcance final del MVP.
- Prioridades funcionales.
- Reglas de negocio detalladas.
- Comportamiento esperado del dashboard e insights.

## Fuente del contexto

Informacion proporcionada por la usuaria en conversacion el 2026-05-28.

---

# Complemento funcional validado desde mockup y refinamiento de backlog

## Estado de madurez

El proyecto ya cuenta con un primer refinamiento funcional validado a partir del mockup navegable y la estructura inicial de backlog.

Se identificaron los modulos principales del sistema, sus capacidades funcionales, los flujos de negocio y la distribucion preliminar en epicas, features e historias de usuario.

Este complemento amplia el contexto de negocio original y debe usarse como insumo para analisis de HU, enriquecimiento funcional, planes de prueba, casos de prueba y matrices de trazabilidad.

## Modulos funcionales identificados

A partir del mockup se identifican los siguientes modulos funcionales:

1. Seguridad y acceso.
2. Empresas.
3. Contactos.
4. Actividades comerciales.
5. Importacion masiva.
6. Gestion de duplicados.
7. Dashboard gerencial.
8. Insights y analisis.
9. Centro de alertas.
10. Preferencias y configuracion.

## Modelo funcional del sistema

El CRM gira alrededor de cuatro entidades principales:

### Empresa

Representa organizaciones con las que existe o puede existir una relacion comercial.

Informacion relevante:

- Nombre.
- Sector.
- Estado.
- Contactos asociados.
- Fecha de creacion.
- Ultima interaccion.
- Actividad reciente.

Reglas de negocio confirmadas:

- El estado `Sin seguimiento` es el termino formal a usar en el sistema; no se usa `Abandonada` como estado principal.
- El estado `Sin seguimiento` se calcula de forma parametrizable por Gerencia.
- Para el MVP, el umbral inicial configurado puede ser 30 dias sin actividad.
- El sistema puede manejar un estado adicional `Prioritaria` para empresas, tambien parametrizable.

### Contacto

Representa personas asociadas a una empresa.

Informacion relevante:

- Nombre.
- Cargo.
- Empresa asociada.
- Correo.
- Telefono.
- Estado.
- Fuente de contacto.

Reglas de negocio confirmadas:

- Un contacto debe estar asociado a una sola empresa en el MVP.
- No se permite que un contacto pertenezca a dos o mas empresas al mismo tiempo.
- El correo corporativo y el correo personal deben poder distinguirse por dominio.
- El contacto puede existir sin estado obligatorio al inicio, si el negocio lo permite por configuracion.

### Actividad comercial

Representa cualquier interaccion realizada por el equipo comercial.

Tipos identificados:

- Correo.
- Llamada.
- Reunion.
- LinkedIn.
- WhatsApp.
- Nota.

Cada actividad debe permitir:

- Responsable.
- Fecha.
- Empresa relacionada.
- Contacto relacionado.
- Descripcion.
- Seguimiento.

### Usuario

Representa los usuarios internos del CRM.

Tipos identificados:

- Gerencia.
- Comercial.
- Analista.

Reglas confirmadas:

- No existe un rol Administrador separado para Nexus CRM.
- Gerencia actua como super admin del sistema y tiene todos los permisos.
- Comercial tiene acceso limitado a las funcionalidades esenciales para su cargo comercial.
- Analista se enfoca en carga de datos, importacion de Excel y actividades necesarias para validar datos importados; no requiere acceso a dashboards, insights ni funciones gerenciales.

## Flujo funcional principal validado

1. Registrar o importar empresas y contactos.
2. Validar estructura y calidad de datos.
3. Detectar duplicados.
4. Asociar contactos a empresas.
5. Registrar actividades comerciales.
6. Programar seguimientos.
7. Consultar historial comercial.
8. Visualizar indicadores.
9. Analizar insights.
10. Gestionar alertas.
11. Configurar preferencias personales.

## Estados funcionales identificados

### Empresa

Posibles estados:

- Activa.
- Inactiva.
- Sin seguimiento.

### Contacto

Posibles estados:

- Activo.
- Inactivo.

### Actividad

Posibles estados:

- Registrada.
- Pendiente de seguimiento.
- Completada.

### Alerta

Posibles estados:

- Pendiente.
- Leida.
- Descartada.

## Calidad de datos

La calidad de datos es una capacidad central del sistema.

El CRM debe permitir:

- Identificacion de registros duplicados.
- Validacion de registros incompletos.
- Diferenciacion entre correos corporativos y personales.
- Seguimiento de inconsistencias.
- Control de calidad de la base comercial.

## Importacion masiva

La importacion masiva se ejecuta mediante un flujo guiado.

Etapas identificadas:

1. Carga de archivo.
2. Previsualizacion.
3. Mapeo de columnas.
4. Deteccion de problemas.
5. Resumen de importacion.
6. Confirmacion.

Capacidades requeridas:

- Validar estructura.
- Detectar columnas vacias.
- Detectar duplicados.
- Detectar inconsistencias.
- Mapear campos del Excel con campos internos del CRM.
- Mostrar resumen de resultados.
- Importar unicamente registros validos.

## Gestion de duplicados

El sistema contara con un modulo dedicado para revision de duplicados.

Capacidades identificadas:

- Detectar coincidencias.
- Agrupar registros similares.
- Mostrar porcentaje de similitud.
- Comparar registros.
- Visualizar detalles.
- Fusionar registros.
- Mantener registros separados.

La deteccion podra apoyarse en:

- Nombre.
- Correo.
- Telefono.
- Ubicacion.
- Empresa.

Las reglas exactas deberan definirse durante refinamiento.

## Dashboard gerencial

El dashboard tiene como objetivo ofrecer una vista consolidada de la operacion comercial.

Indicadores identificados:

- Total empresas.
- Total contactos.
- Empresas sin seguimiento.
- Duplicados pendientes.
- Correos corporativos.
- Correos personales.
- Actividades mensuales.
- Empresas contactadas recientemente.

Elementos visuales identificados:

- KPIs.
- Graficos de tendencia.
- Actividad reciente.
- Empresas mas activas.
- Alertas operativas.

## Insights y analisis

Modulo orientado a inteligencia comercial.

Indicadores identificados:

- Empresas abandonadas.
- Contactos saturados.
- Seguimientos vencidos.
- Calidad de correos.
- Fuente de contactos.
- Distribucion por sector.
- Actividad comercial mensual.

Objetivo:

Identificar oportunidades, riesgos y comportamientos relevantes de la base comercial.

## Centro de alertas

Modulo dedicado a la gestion de alertas operativas.

Alertas identificadas:

- Empresas sin seguimiento.
- Contactos saturados.
- Duplicados pendientes.
- Empresas con correos personales.
- Eventos definidos por reglas de negocio.

Acciones permitidas:

- Consultar.
- Marcar como leida.
- Descartar.
- Navegar al elemento relacionado.

## Preferencias y configuracion

Cada usuario podra personalizar el comportamiento del CRM.

### Apariencia

- Tema claro.
- Tema oscuro.
- Automatico.
- Densidad de informacion.

### Empresas

- Mostrar empresas recientes.
- Ocultar empresas inactivas.
- Resaltar empresas sin seguimiento.

### Contactos

- Mostrar contactos recientes.
- Advertir contactos saturados.
- Ocultar contactos inactivos.

### Dashboard

- Mostrar tendencia de actividad.
- Mostrar distribucion por sector.
- Mostrar empresas abandonadas.

### Notificaciones

- Duplicados detectados.
- Empresas sin seguimiento.
- Importaciones completadas.

## Consideraciones para MVP

El MVP debe priorizar:

- Seguridad y acceso.
- Empresas y contactos.
- Actividades comerciales.
- Importacion masiva.
- Gestion de duplicados.
- Dashboard gerencial basico.

Los modulos de Insights, Alertas avanzadas y Preferencias pueden implementarse de forma incremental en fases posteriores si existen restricciones de tiempo o capacidad.

## Fuente del complemento

Informacion proporcionada por la usuaria mediante texto adjunto el 2026-06-01.
