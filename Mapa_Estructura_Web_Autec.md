# Mapa de estructura del sitio actual — Autec S.A. (autec.ec)

Documento de relevamiento (auditoría de contenido y estructura) del sitio existente, para usar como insumo al definir la arquitectura de la nueva web. No incluye recomendaciones de diseño ni de rediseño: solo describe qué existe hoy, cómo está organizado y qué datos/funcionalidades maneja cada sección.

Fecha de relevamiento: 8 de septiembre de 2026.

---

## 1. Estructura global (presente en todas las páginas)

### 1.1 Header / Navegación principal
- Logo "Autec" + tagline "Impulsando al Ecuador".
- Menú: **Home** | **Vehículos** (desplegable) | **PosVenta** | **Contáctanos**
- Submenú de "Vehículos" (dropdown): **FOTON**, **JMC**, **VENTURA** — cada uno enlaza a una página de marca.

### 1.2 Footer (idéntico en Home, FOTON, JMC, VENTURA y PosVenta; versión ligeramente distinta en Contáctanos)
- Bloque "Contáctanos": teléfono fijo y celular.
- Bloque "Post Venta": teléfono/extensión de posventa y de taller.
- Bloque "Ubicación": dirección de matriz Quito.
- Bloque "Horarios de Atención": Lunes a Viernes 08:30–17:30, Sábados 09:00–13:00.
- Logo Autec repetido.
- Iconos de redes sociales: Facebook, Instagram, WhatsApp (el ícono de WhatsApp abre un chat directo a +593 994100500 con mensaje predefinido "Hola, quiero más información").

### 1.3 Patrón repetido de "Contáctanos" (formulario de leads)
Aparece embebido en Home, FOTON, JMC y VENTURA (no en la página "Contáctanos" ni en "PosVenta"). Campos:
- Nombre* / Apellidos
- Teléfono*
- Correo electrónico*
- Modelo (dropdown con el catálogo completo de vehículos de las 3 marcas, ver sección 4)
- Comentario o mensaje
- Botón "Enviar"

---

## 2. Mapa de páginas y secciones

### 2.1 Home (`/`)
1. **Carrusel hero** — rotación de ~11 slides, uno por cada modelo de vehículo (mezcla de las 3 marcas). Cada slide trae: nombre del modelo (título grande), imagen del vehículo sobre fondo fotográfico, y un bloque de ficha rápida con especificaciones técnicas en texto libre (varían según el vehículo: motor, frenos, inyección, potencia, transmisión, tracción, cabina, dirección, etc.). Navegación con flechas izquierda/derecha e indicadores (dots).
2. **Sección "Nosotros"** — título + un párrafo institucional: constitución de Autec S.A. como Sociedad Anónima el 30/09/1999, objeto social (comercialización, venta, compra, exportación e importación de productos de la industria automotriz).
3. **Sección "Vehículos"** — título + 3 tarjetas de marca (FOTON, JMC, VENTURA), cada una con imagen representativa y nombre de marca, enlazando a su página respectiva.
4. **Sección "Contáctanos" (formulario de leads)** — ver patrón en 1.3.
5. **Footer** — ver 1.2.

### 2.2 Vehículos → FOTON (`/foton/`)
1. **Carrusel hero** con 3 modelos: *Auman 270*, *Auman 460*, *Auman 350*. Cada slide: nombre del modelo, ficha de especificaciones (ej. Combustible, Motor, Transmisión, Tracción, Capacidad de arrastre, Caja, Potencia/Torque), y botón **"Ficha técnica"** (descarga/enlace, aparentemente a un PDF por modelo).
2. **Texto descriptivo de marca** — párrafo sobre FOTON (marca de vehículos comerciales, camiones, soluciones de transporte) + llamado a la acción "Cotiza con nosotros el vehículo ideal para ti".
3. **Formulario de Contáctanos** — mismo patrón que Home (1.3).
4. **Footer**.

### 2.3 Vehículos → JMC (`/jmc/`)
1. **Carrusel hero** con 7–8 modelos: *Van Touring / Van Touring Pro*, *Vigus Work HI-RIDE*, *Vigus Plus Pro*, *Gran Avenue*, *Conquer 6.5Ton*, *Carrying Plus 5Ton*, *Carrying Plus 3.45Ton*, *Carrying Plus 2.8Ton*. Mismo patrón: nombre + ficha de specs + botón "Ficha técnica".
2. **Texto descriptivo de marca** — motores 100% japoneses (Isuzu), sistema de inyección Common Rail Bosch, reducción de emisiones + CTA de cotización.
3. **Formulario de Contáctanos**.
4. **Footer**.

### 2.4 Vehículos → VENTURA (`/ventura/`)
1. **Carrusel hero** con al menos 1 modelo identificado (*Ventura R6*, furgoneta/van escolar de 18 pasajeros) repetido en 3 slides con imágenes distintas. Ficha de specs (Motor tecnología Toyota, frenos ABS+EBD, sistema de combustión, espejos con direccionales, aire acondicionado delantero/posterior, volante regulable, cinturones de 3 puntos) + botón "Ficha técnica".
2. **Texto descriptivo/cita destacada** — diseño para 18 pasajeros, motor 3.000cc 150HP inyección directa Common Rail Euro III, aire acondicionado, bloqueo central, radio con pantalla táctil.
3. **Formulario de Contáctanos**.
4. **Footer**.

> Nota: el dropdown "Modelo" del formulario de leads (compartido en todo el sitio) no lista modelos de Ventura explícitamente — solo trae modelos de FOTON y JMC. Confirmar con el cliente si esto es un dato faltante a corregir en la nueva web.

### 2.5 PosVenta (`/posventa/`)
1. **Hero "Talleres Autec"** — imagen + párrafo: equipamiento y herramientas, personal calificado, mantenimiento preventivo, correctivo y de colisiones.
2. **Texto introductorio** — el equipo de PosVenta arma planes de mantenimiento personalizados; CTA "Consulta nuestros planes de mantenimiento preventivo y correctivo para tu flota".
3. **Sección "Servicios" — "Mantenimiento preventivo y correctivo"** — grilla de 12 íconos con etiqueta, sin descripción adicional:
   - Cambio de aceite motor
   - Cambio de filtros de motor
   - Cambio de aceite de transmisión
   - Cambio de aceite de diferenciales
   - Cambio de bandas de motor
   - Cambio de sensores eléctricos
   - Cambio de baterías
   - Cambio de embrague de ventilador
   - Cambio de bujías
   - Cambio de tambores de freno
   - Cambio de turbo
   - Cambio de radiador, intercooler y condensador
4. **Sección de "Beneficios" (sin título visible capturado, 4 tarjetas con ícono + título + texto)**:
   - **Herramientas y personal calificado** — personal técnico certificado en las marcas representadas.
   - **Personalización del servicio** — análisis previos de las unidades, mantenimiento predictivo, portafolio a medida.
   - **Valor** — precios competitivos en mano de obra y repuestos.
   - **Respaldo** — bodegas con stock de repuestos, garantía de 6 meses en mano de obra y 1 año en repuestos desde el montaje.
5. **"Contactos del área PosVenta"** — teléfonos específicos de posventa y taller.
6. **Footer**.

### 2.6 Contáctanos (`/contactanos/`)
1. **Encabezado "Contáctanos"** + foto (asesor con auriculares) + bloque de teléfonos: general, Ventas, Pos venta, Taller.
2. **Horarios de Atención**.
3. **Ubicación** — dirección de texto + **mapa embebido de Google Maps** interactivo centrado en la matriz Quito.
4. **Footer** (versión con los mismos datos que el resto del sitio).

> Nota: esta es la única página de contacto que **no** incluye el formulario de leads (a diferencia de Home/FOTON/JMC/VENTURA). Definir si la nueva web debe unificar esto.

---

## 3. "Nosotros" — alcance actual
No es una página independiente: hoy es solo una sección corta dentro del Home (ver 2.1.2). Si la nueva web amerita una página "Nosotros" completa (historia, misión/visión, valores, equipo, alianzas de marca), es contenido a expandir — hoy el sitio original solo tiene un párrafo institucional.

---

## 4. Catálogo de vehículos — modelo de datos observado

El contenido de vehículos no sigue una ficha técnica estandarizada (cada modelo muestra atributos distintos), pero se puede modelar como:

```
Marca (FOTON | JMC | VENTURA)
 └── Modelo (nombre)
      ├── Imagen(es) del vehículo
      ├── Especificaciones técnicas (lista de pares atributo–valor, variable por vehículo)
      │     Ejemplos de atributos usados: Motor, Combustible, Frenos, Inyección,
      │     Transmisión, Tracción, Potencia/Torque/HP, Caja, Capacidad de arrastre,
      │     Suspensión, Dirección, Cabina, N° de pasajeros/asientos, Velocidad
      └── "Ficha técnica" (enlace/descarga, aparenta ser PDF por modelo)
```

**Listado de modelos detectado (vía dropdown del formulario + navegación de páginas de marca):**

| Marca | Modelos |
|---|---|
| FOTON | Auman 270, Auman 460, Auman 350 |
| JMC | Van Touring (Pro), Vigus Work HI-RIDE, Vigus Plus Pro, Gran Avenue, Conquer 6.5Ton, Carrying Plus 5Ton, Carrying Plus 3.45Ton, Carrying Plus 2.8Ton |
| VENTURA | R6 (18 pasajeros) — único modelo confirmado en el sitio actual |

---

## 5. Formularios

### 5.1 Formulario de leads / cotización (Home, FOTON, JMC, VENTURA)
Campos: Nombre* (con subcampo Apellidos), Teléfono*, Correo electrónico*, Modelo (dropdown con el catálogo de la tabla anterior), Comentario o mensaje, botón Enviar. No se identificó confirmación visual de envío ni política de privacidad/checkbox de consentimiento en el formulario actual.

### 5.2 Contáctanos (`/contactanos/`)
No tiene formulario propio; solo información de contacto directo (teléfonos), horario, dirección y mapa.

---

## 6. Funcionalidades / integraciones detectadas
- **WhatsApp Business**: enlace directo (`wa.me`) con mensaje prellenado, disponible como ícono en el footer de todas las páginas.
- **Redes sociales**: Facebook e Instagram (íconos en footer, enlazan a los perfiles de la empresa).
- **Google Maps embebido**: solo en la página Contáctanos.
- **Carruseles de producto**: mecanismo repetido en Home y en las 3 páginas de marca, con navegación por flechas y dots.
- **Descarga de fichas técnicas**: botón por modelo de vehículo (aparente PDF), en las páginas de marca.

---

## 7. Observaciones de datos (para saneamiento, no de diseño)
Detectadas al comparar la misma información repetida en distintas páginas — útil para que la nueva web centralice estos datos en una sola fuente:

- El teléfono principal difiere entre el footer general ("02 2807830") y la página Contáctanos ("(02) 2804502").
- La extensión de WhatsApp/celular de Post Venta aparece como "+593 997066729" en el footer y "(+593) 997066739" en la página Contáctanos (último dígito distinto).
- El dropdown de modelos del formulario no incluye los modelos de VENTURA.
- La página Contáctanos no ofrece el mismo formulario de cotización que el resto del sitio.
- "Nosotros" es solo un párrafo corto embebido en Home, sin página propia.

---

## 8. Resumen del mapa de navegación actual

```
Home
├── (sección) Nosotros
├── (sección) Vehículos → FOTON / JMC / VENTURA
├── (sección) Formulario de contacto/cotización
└── Footer

Vehículos (dropdown)
├── FOTON      → hero carrusel (3 modelos) + descripción + formulario
├── JMC        → hero carrusel (7-8 modelos) + descripción + formulario
└── VENTURA    → hero carrusel (1 modelo, 3 slides) + descripción + formulario

PosVenta
├── Hero "Talleres Autec"
├── Intro planes de mantenimiento
├── Servicios (12 ítems)
├── Beneficios (4 ítems)
└── Contactos del área

Contáctanos
├── Teléfonos (general / ventas / posventa / taller)
├── Horarios
├── Ubicación + Mapa embebido
└── Footer
```

---

*Este documento describe el contenido y la estructura del sitio autec.ec tal como existe hoy. No propone jerarquía de información nueva, secciones adicionales ni decisiones de diseño — eso queda a criterio del proyecto de rediseño.*
