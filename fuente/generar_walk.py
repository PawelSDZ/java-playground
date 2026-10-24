"""Regenera la explicación paso a paso (walk.js) a partir de walk_data.py.

    python3 generar_walk.py

En walk_data.py cada ejercicio tiene una lista de pasos (trozo de código, explicación).
Cada trozo tiene que aparecer tal cual en la solución del ejercicio (lo comprueba la auditoría
de pasos: node -e en el LEEME).
"""
import json, os, re, sys

os.chdir(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, '.')
from walk_data import W

js = open('walk.js', encoding='utf-8').read()
datos = json.dumps({k: [list(x) for x in v] for k, v in W.items()}, ensure_ascii=False)
js, n = re.subn(r'var WALK = \{.*\};', lambda m: 'var WALK = ' + datos + ';', js, count=1)
assert n == 1, 'no encuentro var WALK en walk.js'
open('walk.js', 'w', encoding='utf-8').write(js)
print('walk.js actualizado:', len(W), 'ejercicios')
