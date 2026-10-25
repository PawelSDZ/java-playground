"""Monta la página a partir de las piezas de esta carpeta.

    python3 build.py          -> genera la rama experimental en salida/
    python3 build.py merge    -> además genera la main y la copia a ../index.html (GitHub Pages)

La main = la experimental sin la etiqueta «Rama experimental» y con el título de main.
"""
import os, re, sys

os.chdir(os.path.dirname(os.path.abspath(__file__)))
os.makedirs('salida', exist_ok=True)


def leer(nombre):
    return open(nombre, encoding='utf-8').read()


def escribir(ruta, texto):
    open(ruta, 'w', encoding='utf-8').write(texto)


def scripts(html):
    return '\n;\n'.join(re.findall(r'<script>([\s\S]*?)</script>', html))


# Envoltorio de documento completo (lo que añade claude.ai al publicar un artefacto).
# [hidden] tiene que ganar a los display: flex/grid de la página.
CABECERA = ('<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
            '<style>[hidden]{display:none!important}body{margin:0}</style>\n')


def documento(html):
    i = html.index('<script>')
    return CABECERA + html[:i] + '</head>\n<body>\n' + html[i:] + '\n</body>\n</html>\n'


plantilla = leer('template.html')
minijava = leer('minijava.js').replace("if (typeof module !== 'undefined') module.exports = MiniJava;", "")
ejercicios = leer('exercises.js').replace("if (typeof module !== 'undefined') module.exports = EXERCISES;", "")

# Etiqueta exclusiva de la rama experimental: NUNCA pasa a main.
EXP_BADGE = ('<style>.exp-badge{--exp:#C2410C;display:inline-flex;align-items:center;flex:none;'
             'font:500 12px/1 "IBM Plex Sans",system-ui,sans-serif;letter-spacing:.04em;text-transform:uppercase;'
             'white-space:nowrap;padding:5px 8px;border:1px solid var(--exp);border-radius:5px;color:var(--exp)}'
             '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .exp-badge{--exp:#F0907A}}'
             ':root[data-theme="dark"] .exp-badge{--exp:#F0907A}'
             '@media (min-width:1640px){header.top{position:relative}.exp-badge{position:absolute;right:24px;top:50%;transform:translateY(-50%)}}'
             '@media (max-width:560px){header.top .wrap{position:relative}.exp-badge{position:absolute;top:8px;right:12px;font-size:10px;padding:4px 6px}}'
             '</style><span class="exp-badge">Rama experimental</span>')

pruebas = (plantilla.replace("/*MINIJAVA*/", minijava).replace("/*EXERCISES*/", ejercicios)
           .replace("/*WELCOME_CARD*/", leer('welcome_card.html').rstrip())
           .replace("/*WELCOME_DIALOG*/", leer('welcome_dialog.html').rstrip())
           .replace("/*WELCOME_JS*/", leer('welcome.js').rstrip())
           .replace("/*LEVEL_FIELD*/", leer('level_field.html').rstrip())
           .replace("/*LEVEL_CARD*/", leer('level_card.html').rstrip())
           .replace("/*LEVEL_JS*/", leer('level.js').rstrip())
           .replace("/*REFSOL_JS*/", leer('refsol.js').rstrip() + "\n" + leer('walk.js').rstrip() + "\n" + leer('autocomplete.js').rstrip())
           .replace("// Tu código aquí\\n'", "// Recuerda: para que el resultado salga en consola usa System.out.println(...);\\n"
                    "// Atajo: escribe sout (o syso) y pulsa Tab para que se escriba solo.\\n\\n// Tu código aquí\\n'")
           .replace("/*LEVELS*/false", "true")
           .replace("/*SNIPPETS*/", leer('snippets.js').rstrip())
           .replace("/*SNIPPET_HELP*/", "Atajo: sout o syso + Tab escribe System.out.println(). Al escribir el nombre de una variable "
                    "o un punto aparecen sugerencias: elige con las flechas y acepta con Tab o Enter. ")
           .replace("<title>Ejercicios básicos programacion</title>", "<title>Ejercicios programacion (pruebas)</title>"))
ANCLA = '<button type="button" class="theme-btn" id="themeBtn" aria-label="Cambiar a modo claro"></button>\n'
assert pruebas.count(ANCLA) == 1
pruebas = pruebas.replace(ANCLA, ANCLA + '      ' + EXP_BADGE + '\n')
assert not re.search(r'/\*(WELCOME|LEVEL|SNIPPET|REFSOL|MINIJAVA|EXERCISES)', pruebas), 'queda algún hueco sin rellenar'

escribir('salida/pruebas.html', pruebas)                  # lo que se publica en el artefacto experimental
escribir('salida/pruebas_completa.html', documento(pruebas))  # para las pruebas automáticas en el navegador
escribir('salida/scripts_pruebas.js', scripts(pruebas))   # para comprobar la sintaxis con node --check
print('experimental lista: salida/pruebas.html')

# La misma experimental en varios archivos (salida/partes/), que es como se publica en el artefacto:
# un index.html pequeño y los estilos y scripts grandes aparte. Así, para actualizarla desde un hilo
# nuevo basta con leer el index.html y ver la lista de archivos, sin leer la página entera.
PARTES = ['minijava.js', 'ejercicios.js', 'app.js']
os.makedirs('salida/partes', exist_ok=True)
indice, bloques = pruebas, re.findall(r'<script>([\s\S]*?)</script>', pruebas)
assert len(bloques) == len(PARTES) + 1, 'han cambiado los bloques <script> de la plantilla: revisa PARTES'
for nombre, codigo in zip(PARTES, bloques[1:]):   # el primero (tema claro/oscuro) se queda dentro
    escribir('salida/partes/' + nombre, codigo)
    indice = indice.replace('<script>' + codigo + '</script>', '<script src="' + nombre + '" charset="utf-8"></script>', 1)
estilos = re.search(r'<style>([\s\S]*?)</style>', indice).group(1)
assert len(estilos) > 5000, 'el primer <style> debería ser el de la página'
escribir('salida/partes/estilos.css', '@charset "utf-8";\n' + estilos)
indice = indice.replace('<style>' + estilos + '</style>', '<link rel="stylesheet" href="estilos.css">', 1)
escribir('salida/partes/index.html', documento(indice))
print('experimental en partes: salida/partes/ (index.html + ' + ', '.join(['estilos.css'] + PARTES) + ')')

if len(sys.argv) > 1 and sys.argv[1] == 'merge':
    main = pruebas.replace("<title>Ejercicios programacion (pruebas)</title>", "<title>Ejercicios básicos programacion</title>")
    assert main.count(EXP_BADGE) == 1
    main = main.replace('      ' + EXP_BADGE + '\n', '')
    assert 'exp-badge' not in main
    escribir('salida/scripts_main.js', scripts(main))
    escribir('../index.html', documento(main))
    print('main lista: ../index.html (subir a GitHub con commit + push)')
