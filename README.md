# Manual de Indicaciones en Urgencias — app para el teléfono

Aplicación web instalable (PWA). Se agrega a la pantalla de inicio, abre a pantalla
completa con su propio ícono y **funciona sin conexión** una vez instalada.

## Qué trae

- **23 fichas de urgencia** con el reloj de tiempos, las indicaciones en orden y el bloque de lo que no se hace.
- **Hojas modelo dentro de cada ficha**: las 4 hojas escritas completas de esa urgencia, con su escenario y signos vitales, para estudiar el orden y la redacción sin pasar por el desafío.
- **Modo desafío con 92 casos** (4 por urgencia), corrector con 982 claves y 398 errores graves catalogados.
- **Hoja base en blanco** con las 16 secciones del orden de indicaciones.
- **Vademécum de 224 fármacos** en 18 grupos, con presentación, dosis, indicaciones, mecanismo, efectos adversos y contraindicaciones.
- **Bombas de infusión**: cómo se calculan, 23 preparaciones habituales y calculadora de mL/h.
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
- **Accesos directos**: `index.html#desafio`, `#dosis`, `#bombas`, `#insulina`, `#elp`.
  En Android, al mantener presionado el ícono aparecen los tres primeros.
- **Navegación móvil**: barra inferior con Urgencias, Fichas, Desafío y Herramientas.
  El índice es un cajón lateral. Los datos del paciente se pliegan para dejar pantalla.

### Cómo actualizar la app

Si cambias `index.html`, sube el número de versión en `sw.js`:

```js
const VERSION = 'indicaciones-v3';   // era v2
```

Sin eso, los teléfonos que ya la instalaron van a seguir mostrando la versión vieja.

---

## Historial

- **v2** — hojas modelo consultables desde la ficha, sin pasar por el modo desafío.
- **v1** — versión inicial de la app.

## Archivos

```
index.html                 la app completa
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
- Las **diluciones de las bombas** son práctica habitual y varían entre hospitales.
  La aritmética de la calculadora es correcta; la dilución que le des tiene que ser la de tu servicio.
- Las calculadoras (Cockcroft-Gault, déficit de agua libre, insulina, bombas) entregan
  estimaciones que se distorsionan en obesidad, edema, embarazo y falla renal aguda.
- El corrector del modo desafío reconoce patrones de texto: que **no** reconozca una línea
  no significa que esté mal, y que reconozca "insulina" no garantiza que la dosis esté bien escrita.
- Alcance: **paciente adulto, de 15 años en adelante.** No usar en pediatría.
- Ventanas de trombólisis, metas de presión y resistencia antimicrobiana cambian:
  verifica contra la edición vigente.
