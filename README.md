# Manual de Indicaciones en Urgencias — app para el teléfono

Aplicación web instalable (PWA). Se agrega a la pantalla de inicio, abre a pantalla
completa con su propio ícono y **funciona sin conexión** una vez instalada.

## Qué trae

- **37 fichas de urgencia** con el reloj de tiempos, las indicaciones en orden y el bloque de lo que no se hace.
- **Hojas modelo dentro de cada ficha**: las 4 hojas escritas completas de esa urgencia, con su escenario y signos vitales, para estudiar el orden y la redacción sin pasar por el desafío.
- **Crisis convulsiva, epilepsia y estado epiléptico** como temas propios, con el umbral de los 5 minutos, la regla de cuándo sí y cuándo no iniciar antiepilépticos, y el estado no convulsivo.
- **Modo desafío con 148 casos** (4 por urgencia), corrector con 1623 claves y 667 errores graves catalogados.
- **Triage automatizado**: categoriza de C1 a C5, dice dónde ubicar al paciente ahora (REA, box con monitor, observación, fast track) y qué destino anticipar (alta, sala, UTI o UCI). Adaptable a 15 motivos de consulta.
- **Hoja base en blanco** con las 16 secciones del orden de indicaciones.
- **Vademécum de 308 entradas** en 24 grupos, con presentación, dosis, indicaciones, mecanismo, efectos adversos y contraindicaciones.
- **Bombas de infusión y nebulizaciones**: cómo se calculan, 23 preparaciones habituales, calculadora de mL/h, y las nebulizaciones con sus dosis, flujos y la regla del retenedor de CO₂.
- **Crisis hipertensiva y síndrome aórtico agudo**, con las metas de presión por cuadro y la regla del betabloqueo antes del vasodilatador.
- **Síndrome coronario separado** en IAM con supradesnivel, IAM sin supradesnivel y angina inestable, más una ficha de enfoque inicial común.
- **Antihipertensivos endovenosos según la patología**: metas por cuadro y 13 fármacos con inicio, duración, dosis y precauciones.
- **Ficha de antibióticos** que se abre en pestaña propia con un botón: microbiología, arsenal por familia, matriz fármaco por fármaco, esquemas empíricos por síndrome y tarjetas de repaso, con buscador y modo examen propios.
- **Del caso a la hoja**: escribes un caso breve y la app sugiere las fichas que encajan, marca lo que cambia la conducta y deja el esqueleto de indicaciones. Con segunda opinión opcional de un modelo de lenguaje.
- **Insulina**: metas, tipos, reglas de cálculo y tres calculadoras.
- **Electrolitos**: potasio, sodio, magnesio, calcio y fósforo, con tres calculadoras.
- Ajustes automáticos por **peso, edad y sexo**.

---

## Instalación

### Opción A — con hosting (recomendada: instalación real y offline)

El service worker necesita `https://`, así que la app tiene que estar servida.
Es gratis y toma un par de minutos.

**Netlify Drop** (lo más rápido, sin cuenta):
1. Entra a `app.netlify.com/drop`
2. Arrastra **toda esta carpeta**
3. Te da una dirección `https://algo.netlify.app` — ábrela en el teléfono

**GitHub Pages** (si prefieres algo permanente):
1. Crea un repositorio y sube estos archivos
2. Settings → Pages → Branch `main`, carpeta `/root`
3. Tu dirección será `https://tu-usuario.github.io/tu-repo/`

Después, en el teléfono:

- **Android (Chrome)**: aparece solo el aviso "Instalar", o menú ⋮ → *Instalar aplicación*
- **iPhone (Safari)**: botón Compartir → *Añadir a pantalla de inicio*
  (en iOS tiene que ser **Safari**; Chrome en iPhone no instala PWAs)

Al abrirla la primera vez con conexión, se guarda completa. Después funciona en
modo avión, en el subterráneo o en un pasillo sin señal.

### Opción B — sin hosting

Copia `index.html` al teléfono y ábrelo con el navegador. Funciona todo:
las fichas, los casos, las calculadoras. Lo que **no** vas a tener es el ícono
en la pantalla de inicio ni el guardado offline automático del service worker.

---

## Detalles técnicos

- **Un solo archivo** de ~710 KB, sin dependencias. Las tipografías de Google son
  mejora progresiva: sin conexión, el sistema usa las suyas y la app se ve bien igual.
- **Guarda entre sesiones** el peso, la edad, el sexo y lo que escribas en la hoja base
  (en el navegador, con `localStorage`). El botón **Limpiar** de la cabecera borra todo.
  Si el navegador bloquea el almacenamiento, la app sigue funcionando sin guardar.
- **Accesos directos**: `index.html#caso`, `#triage`, `#atb`, `#desafio`, `#dosis`, `#bombas`, `#insulina`, `#elp`.
  En Android, al mantener presionado el ícono aparecen los tres primeros.
- **Navegación móvil**: barra inferior con Urgencias, Fichas, Desafío y Herramientas.
  El índice es un cajón lateral. Los datos del paciente se pliegan para dejar pantalla.

### Cómo actualizar la app

Si cambias `index.html`, sube el número de versión en `sw.js`:

```js
const VERSION = 'indicaciones-v9';   // era v8
```

Sin eso, los teléfonos que ya la instalaron van a seguir mostrando la versión vieja.

---

## Auditoría de contenidos (v6)

Se hizo una revisión sistemática de las 32 fichas, los 128 casos y las herramientas, contrastando las
cifras contra el **Manual Washington** y la **Guía Sanford** cargados en el proyecto. Se corrigieron:

| # | Hallazgo | Corrección |
|---|----------|------------|
| 1 | Los casos de estado hiperosmolar usaban **insulina 0,05 U/kg/h** como dosis inicial, contradiciendo su propia ficha | Corregido a **0,10–0,15 U/kg/h** (Washington, Tabla 23-3); 0,05 queda como la dosis tras bajar de 300 mg/dL |
| 2 | Meta de magnesio de **2,5 mEq/L**, cifra que no está en el manual | Reemplazada por la definición de Washington: **hipermagnesemia sobre 2,2 mEq/L**, síntomas sobre 4, hiporreflexia como primer signo |
| 3 | La velocidad máxima de KCl de **10 mEq/h** aparecía como si fuera del manual | Explicitado que **el techo de Washington es 20 mEq/h** y que 10 mEq/h es práctica habitual para vía periférica sin monitorización |
| 4 | La meta de TTPA de la heparina se daba como única | Separada por indicación: **1,5–2,0×** en síndrome coronario (Tabla 4-13) y **anti-Xa 0,3–0,7 / TTPA 2–2,5×** en tromboembolismo |
| 5 | Un caso de TEP tenía el número **8 repetido** en la hoja | Renumerado |
| 6 | La ficha de diarrea citaba Washington sin capítulo | Precisado a cap. 12 |

Se añadieron además, verificados contra el manual: la **normalización del bicarbonato** como índice más
confiable de recuperación en cetoacidosis (el cierre del anión gap lo es menos por la hipercloremia),
la caída esperada de β-hidroxibutirato de ~1 mmol/L/h, que **la cetoacidosis no cursa con fiebre** (si la hay,
buscar infección), el límite de **pH 7,55** en la alcalinización por tricíclicos, la dosis completa de emulsión
lipídica, el uso permitido de **lidocaína** (clase Ib) en la intoxicación por tricíclicos, y el antídoto de la
hipermagnesemia.

**Lo que la auditoría no puede garantizar.** Que un contenido de este tamaño tenga cero errores no es una
afirmación verificable. Lo que sí se verificó: cada ficha declara su fuente, ninguna cifra contradice a otra
dentro de la app, las 128 hojas modelo pasan su propio corrector, y todo lo que **no** proviene de los manuales
está marcado como tal (dosis del estado epiléptico, diluciones de bombas, flujos de nebulización, categorización
de triage, NEWS2 y la segunda opinión del asistente).

## Historial

- **v8** — cinco grupos nuevos en el vademécum: antihipertensivos orales, hipoglicemiantes no insulínicos, antipsicóticos y antidepresivos, broncodilatadores inhalados y broncodilatadores en nebulización.
- **v7** — crisis hipertensiva, síndrome aórtico agudo y el síndrome coronario separado en tres fichas (20 casos nuevos); tabla de antihipertensivos endovenosos por patología; la ficha de antibióticos pasa a abrirse solo con botón.
- **v6** — auditoría de contenidos contra las fuentes: 6 correcciones y varias precisiones (ver tabla arriba).
- **v5** — pancreatitis, diarrea y gastroenteritis, meningitis, anemia, crisis asmática y exacerbación de EPOC (24 casos nuevos); nebulizaciones; ficha de antibióticos incorporada; asistente "del caso a la hoja".
- **v4** — crisis convulsiva, epilepsia y estado epiléptico como fichas nuevas, con 12 casos y motivo propio en el triage.
- **v3** — herramienta de triage: categorización C1–C5, destino físico y destino final.
- **v2** — hojas modelo consultables desde la ficha, sin pasar por el modo desafío.
- **v1** — versión inicial de la app.

## Archivos

```
index.html                 la app completa, con la ficha de antibióticos incluida
manifest.webmanifest       nombre, ícono, colores, accesos directos
sw.js                      service worker (caché offline)
icon-192.png               ícono Android
icon-512.png               ícono grande
icon-180.png               ícono iOS
icon-maskable-512.png      ícono adaptativo Android
```

---

## Advertencias

Material de estudio y de consulta rápida. **No reemplaza el protocolo de tu hospital
ni la revisión con tu residente.**

- Cada ficha y cada tabla dice de qué manual sale su contenido y marca dónde el
  **Manual Washington** y la **Guía Sanford** difieren entre sí.
- Las tablas del Sanford en la copia usada tienen el reconocimiento de texto degradado:
  **las dosis antibióticas deben confirmarse** contra la guía impresa o la aplicación vigente.
- Los **tiempos de puerta-balón y puerta-aguja**, la estratificación de riesgo con GRACE y TIMI, los algoritmos de troponina de alta sensibilidad y la clasificación de Stanford corresponden a la práctica de guía y **no son texto extraíble** de los manuales cargados. Sí lo son las dosis, las metas de presión por cuadro y las reglas de manejo, que provienen de <b>Washington</b> caps. 3 y 4 y de la <b>Guía ESC/ESH 2023</b>, Tabla 24.
- Las **dosis de primera y segunda línea del estado epiléptico** no son texto extraíble del Manual Washington,
  que remite a su Figura 27-1 y al protocolo del MGH: corresponden al uso estándar y deben contrastarse con
  el protocolo de tu servicio.
- El asistente **"del caso a la hoja"** es un buscador de palabras clave sobre las fichas, no un diagnosticador:
  puede acertar el cuadro y equivocarse en el paciente concreto, o no reconocer un caso bien escrito solo porque
  usaste otras palabras. La **segunda opinión** la genera un modelo de lenguaje, **no está verificada contra los
  manuales del proyecto** y puede contener errores de dosis o de criterio. La hoja la escribes tú y la revisa tu residente.
- Los **flujos, volúmenes y equivalencias en gotas de las nebulizaciones** son práctica habitual y varían entre servicios.
- Las **diluciones de las bombas** son práctica habitual y varían entre hospitales.
  La aritmética de la calculadora es correcta; la dilución que le des tiene que ser la de tu servicio.
- Las calculadoras (Cockcroft-Gault, déficit de agua libre, insulina, bombas) entregan
  estimaciones que se distorsionan en obesidad, edema, embarazo y falla renal aguda.
- El corrector del modo desafío reconoce patrones de texto: que **no** reconozca una línea
  no significa que esté mal, y que reconozca "insulina" no garantiza que la dosis esté bien escrita.
- El **triage** es una herramienta de apoyo. La estructura C1–C5 corresponde al modelo chileno de
  categorización, que **no está en los manuales del proyecto**; NEWS2 tampoco. La categorización final
  es del profesional que evalúa al paciente y **siempre se puede subir**: la herramienta nunca debe
  usarse para bajar una categoría asignada por criterio clínico. Verifica contra la norma de tu servicio.
- Alcance: **paciente adulto, de 15 años en adelante.** No usar en pediatría.
- Ventanas de trombólisis, metas de presión y resistencia antimicrobiana cambian:
  verifica contra la edición vigente.
