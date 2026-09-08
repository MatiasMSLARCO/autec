# Análisis de referencia visual/UX — TURAH (turah.com)

Documento de referencia para el rediseño de la web de Autec. Analiza en profundidad la web de TURAH (Masterpieces of Classic Car Restoration) que el cliente eligió como modelo de "cómo quiere que quede" la nueva web: identidad visual, tipografía, layout, componentes, animaciones/microinteracciones y arquitectura de páginas. Es un documento técnico-descriptivo para pasar al agente de programación, no una propuesta de diseño propia.

Fecha de relevamiento: 8 de septiembre de 2026.

---

## 1. Stack técnico detectado (para replicar el comportamiento, no necesariamente el mismo stack)

- **Plataforma**: Webflow (marcado, CDN `cdn.prod.website-files.com`, patrones de clases típicos de Webflow).
- **Smooth scroll**: **Lenis** (librería de scroll suave/inercial) — es la responsable de la sensación "cinematográfica" al hacer scroll.
- **Animaciones scroll-driven**: patrón típico de **GSAP + ScrollTrigger** (pinning de secciones, reveal progresivo, parallax) — no se detectó el objeto global `gsap`, pero el comportamiento observado (secciones "pineadas", transiciones de superposición, carrusel horizontal controlado por scroll) es el resultado característico de ScrollTrigger o una librería equivalente basada en scroll.
- **Formularios**: Finsweet Attributes (`formsubmit`) + **Cloudflare Turnstile** como captcha invisible/checkbox en formularios de contacto.
- **Área de membresía**: **Memberstack** — gestiona login/registro para la sección "Time Capsule" (inventario exclusivo solo para usuarios aprobados).
- **Tipografías**: fuente variable custom **"Montserrat Variable Custom"** (texto general) y una fuente display llamada **"Balgin"** (usada en titulares grandes, geométrica/condensada, con una "A" que parece un triángulo — es la que da el aire "automotriz/lujo" al wordmark TURAH y a los títulos).
- **Analítica/tracking**: Google Tag Manager, Facebook Pixel, Cookie-Script (banner de cookies).

---

## 2. Identidad visual

### 2.1 Paleta de color (variables CSS reales del sitio)
Paleta prácticamente monocromática (blanco / negro / grises) con un **acento azul grisáceo** usado con mucha moderación (para la segunda palabra de titulares tipo "OUR MODELS", líneas destacadas, algún detalle):

| Uso | Valor |
|---|---|
| Negro base | `#000000` |
| Casi negro (fondos oscuros de secciones) | `#131313` / `#2e2e2e` |
| Grises intermedios | `#3b3b3b`, `#505050`, `#686868`, `#969696`, `#9b9b9b`, `#c2c2c2` |
| Gris claro (fondos de sección) | `#e4e4e4`, `#f5f5f5` |
| Blanco | `#ffffff` |
| Azul acento primario | `#51a6d8` (y variantes más claras: `#6eb5df`, `#a8d3ec`, `#c5e1f2`, `#dcedf7`) |
| Azul secundario (muy claro, casi de fondo) | `#eff7fb`, `#b1d5eb`, `#bedcee`, `#cbe3f2`, `#d8eaf5` |

**Patrón de uso real observado**: el azul casi nunca se usa como fondo o botón; se usa como **color de la segunda mitad de un titular de dos palabras** (ej. "OUR **MODELS**", "CLASSICS **REINTERPRETED**", "CONNECTING **PAST**.") para crear jerarquía tipográfica dentro del mismo título, y en textos secundarios sobre fondo oscuro. El resto de la interfaz es blanco/negro/grises puros — muy "editorial", nada de colores saturados.

### 2.2 Tipografía
- **Titulares (display)**: fuente condensada/geométrica en mayúsculas, trazo fino en el logo ("TURAH" con la A triangular) y grueso/bold en titulares de sección. Interletrado amplio en el wordmark, interletrado normal-ajustado en titulares de impacto.
- **Texto de cuerpo**: sans-serif geométrica (Montserrat) en tamaño pequeño-mediano, gris medio sobre fondo claro o gris claro sobre fondo oscuro — nunca negro/blanco puro para párrafos, para suavizar el contraste.
- **Micro-etiquetas** (kickers): palabras cortas en mayúsculas, letter-spacing amplio, tamaño pequeño, encima de cada titular de sección (ej. "PROCESS", "HISTORY", "UPGRADES", "OUR VALUES", "OUR PURPOSE") — patrón repetido en todo el sitio como convención de "eyebrow" antes de cada H2.
- **Números/estadísticas**: se usan como texto plano dentro de una grilla de datos, no como "counters" animados grandes (ej. ficha técnica del W113: años de producción, unidades producidas, etc.), formateados con separador de miles.

### 2.3 Logotipo y marca de agua
- El wordmark "TURAH" aparece constantemente como **marca de agua fija**: un logo pequeño, centrado horizontalmente, que permanece visible en la parte superior de la pantalla durante todo el scroll (independientemente de la sección), incluso cuando el menú principal no está visible. Es un elemento de "ambientación de marca" separado del header funcional.
- También se usa el wordmark **gigante en outline** (solo contorno, sin relleno) como elemento decorativo de fondo en varias secciones (hero, model detail, footer) — tipografía enorme que ocupa casi todo el ancho, en un tono apenas más oscuro/claro que el fondo, puramente decorativo.

---

## 3. Comportamiento del header/navegación (patrón clave a replicar)

Este es uno de los elementos más distintivos del sitio:

1. **Header completo** (con todos los links: MODELS, PRESS, INVENTORY, TIME CAPSULE — a la izquierda — y SHOP, CONFIGURATOR, ABOUT, CONTACT — a la derecha, con el logo centrado) solo aparece:
   - Siempre visible sobre el hero inicial (fondo transparente sobre el video/imagen).
   - Al hacer **scroll hacia arriba** en cualquier punto de la página (aparece flotante con fondo semitransparente/oscuro sobre el contenido).
   - Se **oculta automáticamente al hacer scroll hacia abajo** (patrón "hide on scroll down, show on scroll up"), dejando la pantalla más limpia para leer/mirar imágenes.
2. **El wordmark "TURAH" central** (sin los links) permanece **fijo/pegado (sticky)** en la parte superior durante todo el scroll, funcionando como recordatorio de marca incluso cuando el menú de navegación está oculto.
3. En el footer final, el menú vuelve a aparecer completo, en versión oscura, junto con el wordmark gigante en outline y el texto legal.

---

## 4. Animaciones y microinteracciones identificadas

### 4.1 Scroll suave (Lenis)
Todo el desplazamiento de la página tiene inercia/easing (no es scroll nativo del navegador) — sensación "premium", cinematográfica.

### 4.2 Hero con video/imagen de fondo + texto superpuesto
La portada usa una imagen/video a pantalla completa (auto de época circulando por una carretera rural) con el wordmark gigante semitransparente superpuesto. Efecto de profundidad: el texto parece estar "sobre" la escena, no plano.

### 4.3 Carrusel de modelos con scroll-jacking (pinned horizontal gallery)
En "OUR MODELS": la sección se "clava" (pin) en el viewport mientras el usuario sigue haciendo scroll, y ese scroll adicional anima horizontalmente una fila de autos (4 vehículos vistos de frente) hasta que uno se selecciona/amplía y se transforma en una vista de perfil a pantalla completa con su ficha técnica (Type, Built in, Class, Enhanced) y botones de navegación prev/next + "Read more". Solo al terminar esa animación interna se libera el scroll y continúa la página normal.

### 4.4 Transiciones de secciones por superposición ("overlap reveal")
Varias secciones con imagen de fondo a pantalla completa (parallax sutil) se apilan de forma que la siguiente sección "sube" y tapa progresivamente a la anterior a medida que se hace scroll, en vez de un corte simple — da sensación de profundidad tipo capas.

### 4.5 Mosaico de imágenes en diagonal
Entre la sección de "Purpose" y "How We Work" hay una transición hecha con **imágenes recortadas en diagonal** (clip-path anguloso) que se combinan como un collage asimétrico — recurso visual muy característico y diferenciador, usado como "puente" entre bloques de contenido.

### 4.6 Tipografía outline gigante de fondo
En la página de detalle de modelo (`/model/w113`), el nombre "MERCEDES BENZ" aparece en letras enormes solo con contorno (sin relleno) detrás de una foto del auto vista desde arriba — recurso repetido como firma visual de la marca.

### 4.7 Proceso numerado con imagen alternada
En "HOW WE WORK": 5 pasos (01–05), cada uno con número + título en dos colores (blanco/gris-azul) + párrafo a la izquierda, e imagen a la derecha — el bloque de imagen se ancla (sticky) mientras el texto del paso activo cambia, o cada paso trae su propia imagen en scroll normal (secuencia vertical con separador de línea fina entre pasos).

### 4.8 Tarjetas de auto destacado (showcase / "Selected offers")
Cada auto destacado ocupa casi una pantalla completa: imagen grande con una franja negra semitransparente en la parte inferior que contiene marca + modelo + botón "CHECK CAR" (botón outline, esquinas rectas, hover probablemente invierte a relleno sólido).

### 4.9 Botones — estilo consistente
Dos variantes:
- **Sólido oscuro** (fondo gris oscuro casi negro, texto blanco, mayúsculas, sin bordes redondeados) — usado como CTA primario ("READ MORE", "OUR MODELS", "ALL OUR CARS").
- **Outline** (borde fino blanco/negro, fondo transparente, texto en mayúsculas) — usado sobre imágenes/fondos oscuros o como CTA secundario ("CHECK CAR", "ABOUT US", "CONTACT").
Ambos son rectangulares (sin border-radius), con letter-spacing amplio — refuerza el carácter "automotriz/técnico" de la marca.

### 4.10 Blog/news cards con hover de flecha
En "Compelling Stories" y en Press, cada artículo tiene una miniatura + título + fecha + tiempo de lectura, y un ícono de flecha diagonal (↗) junto al título que sugiere que el hover anima la flecha o el link.

---

## 5. Arquitectura del sitio (mapa de páginas)

```
Home (/)
├── Hero (video + wordmark)
├── Our Models (carrusel pinned horizontal, 4 modelos)
├── Traditional Craftsmanship / About teaser (imagen + CTA)
├── Discover Luxury / Inventory teaser (imagen + CTA)
├── Classics Reinterpreted
│   ├── Our Values (2 columnas de texto)
│   └── Our Purpose (slider de 3 slides, mosaico diagonal de imágenes)
├── How We Work — Process (5 pasos numerados 01-05)
├── Our Cars — Selected Offers (2 autos destacados + "All our cars")
├── Our Artisan's / Our Vision (texto + imagen)
├── Compelling Stories (3 artículos recientes, blog teaser)
└── Footer (wordmark gigante + nav + disclaimer legal)

MODELS (/models)
└── Nosotros modelos → tarjetas → Model detail (/model/[slug])
     ├── Hero con nombre de modelo
     ├── "A legend reborn" (texto introductorio)
     ├── History (texto + datos de producción)
     ├── Power and Performance (ingenieros, año, unidades, features destacadas — grilla de datos)
     ├── "Where dreams take the wheel" (bloque de imágenes de detalle)
     ├── Upgrades (grilla de 7 paquetes de personalización: Audio, Handling, Styling, Comfort, Lifestyle, Lighting, Performance)
     └── CTA final ("A timeless masterpiece")

INVENTORY (/inventory)
├── Hero
├── Filtro por modelo (W111 / W113 / W121 / W460 — tarjetas clicables)
├── Grid de unidades disponibles (tarjeta: foto, nombre, 3 mini-stats con ícono, botón "More information")
└── Inventory detail (/inventory/[slug])
     ├── Hero con nombre completo del auto + botón "Inquire"
     ├── Ficha técnica en grilla (Registered, Transmission, Exterior, Interior, Horsepower, Mileage, Motor, Displacement, Guarantee, Vehicle ID, Equipment, Availability)
     ├── Descripción larga
     ├── Galería "About this model"
     └── "Similar cars you might like"

PRESS (/press)
├── Featured article (destacado grande)
└── Listado de artículos con filtro por categoría (Production / Facility / Press) — imagen, título, fecha, tiempo de lectura

ABOUT (/about)
├── Hero ("Explore our story")
├── Leadership / Vision / Philosophy (3 bloques temáticos: Innovation, Iconic Models, Impeccable Craftsmanship)
├── Your Vision, Our Mission
└── The TURAH Standard / Rediscover Freedom (cierres tipo statement)

CONTACT (/contact)
├── Hero ("Get in touch")
└── Formulario: First name, Last name, Car model (select), Location (select), checkbox de consentimiento RGPD, botón submit
    + datos de contacto directo (oficinas US, email, teléfono)

CONFIGURATOR (/configurator) — placeholder "Coming soon" con CTA a Contact
SHOP (/shop) — placeholder "Coming soon" (lifestyle/merchandising)

TIME CAPSULE (acceso restringido)
├── /login-account — login (email/password) para clientela seleccionada, con link a "Request access"
└── /request-access — formulario de solicitud de acceso (nombre, email, teléfono, motivo) a un "inventario exclusivo"
```

---

## 6. Componentes reutilizables identificados (para un design system)

1. **Header dual**: nav completo (hide/show on scroll) + wordmark sticky central.
2. **Hero full-bleed**: imagen/video + overlay + título grande + kicker + CTA.
3. **Kicker + H2** (eyebrow label en mayúsculas + título de sección, a veces con segunda palabra en azul acento).
4. **Botón sólido** y **botón outline** (ambos rectangulares, mayúsculas, letter-spacing amplio).
5. **Tarjeta de modelo** (imagen del auto + nombre + specs en 4 columnas + CTA) — usada en home y en el listado de modelos.
6. **Grilla de ficha técnica** (pares label/valor en mayúsculas pequeñas + valor debajo) — reutilizada en model detail e inventory detail.
7. **Paso de proceso numerado** (número + título bicolor + texto + imagen).
8. **Tarjeta de inventario** (imagen, nombre superpuesto, 3 iconos+dato, botón "More information").
9. **Tarjeta de artículo/blog** (imagen, categoría, título con flecha, fecha, tiempo de lectura).
10. **Formulario de contacto** con selects estilizados (sin bordes, solo línea inferior) y checkbox de consentimiento legal.
11. **Footer** con wordmark gigante en outline, nav secundaria y texto legal en gris pequeño.
12. **Widget flotante de redes sociales** (Facebook, LinkedIn/Instagram) fijo en el borde derecho de la pantalla, con fondo negro, visible en todas las páginas.

---

## 7. Tono de copy / voz de marca
- Titulares en mayúsculas, frases cortas y contundentes ("A LEGEND REBORN", "WHERE DREAMS TAKE THE WHEEL", "FREEDOM STARTS WITH TURAH").
- Vocabulario de lujo/exclusividad: "bespoke", "masterpiece", "legacy", "timeless elegance", "discerning", "curated".
- Storytelling en primera persona de marca ("At TURAH, our purpose is rooted in...").
- Datos técnicos reales y verificables como argumento de autoridad (año de producción, unidades fabricadas, ingenieros involucrados).

---

## 8. Consideraciones para trasladar este lenguaje visual a un sitio nuevo (notas técnicas, no de diseño)
Para que el agente de programación pueda estimar el esfuerzo, vale la pena que sepa que replicar esta experiencia requiere:
- Una librería de scroll suave (Lenis o similar) + una librería de animación basada en scroll (GSAP/ScrollTrigger o equivalente en el framework elegido) para: pin de secciones, parallax, reveal progresivo y el carrusel horizontal controlado por scroll.
- Video o secuencias fotográficas de alta calidad para los fondos de hero (el efecto solo funciona con material audiovisual/fotográfico profesional).
- Una fuente display condensada tipo "Balgin" (o alternativa con personalidad similar) con licencia adecuada, más una sans-serif geométrica variable para el cuerpo.
- Un sistema de fichas técnicas estructurado (par label/valor) reutilizable entre distintos tipos de contenido (modelos, inventario).
- Definir si se necesita capa de "acceso exclusivo" (login + solicitud de acceso) como la de "Time Capsule", ya que implica backend de autenticación/roles, no solo maquetación.

---

*Este documento describe en detalle la web de referencia (turah.com) tal como existe hoy — su estructura, componentes y animaciones — para que sirva de especificación de estilo al momento de rediseñar la web de Autec. No define qué contenido específico de Autec va en cada sección; eso se decide en el mapa de contenido de Autec (documento separado ya entregado).*
