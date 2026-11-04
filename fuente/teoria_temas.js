// Apartado de Teoría: cada tema es una lista de bloques que pinta teoria.js.
// Los temas están en teoria_1.js … teoria_4.js (uno por bloque del índice), en orden.
//   { h: 'Título de sección' }                 { p: 'Párrafo: `código` y **negrita**' }
//   { syntax: 'código' }                       (sintaxis general, sin botón de ejecutar)
//   { code: 'código' }                         (ejemplo que se puede ejecutar y editar; con Scanner pide datos en la consola)
//       stdin: ['…']   lo que se escribe en las pruebas automáticas (pruebas/teoria.js)
//       error: true    el ejemplo muestra un error a propósito;  random: true  la salida cambia cada vez
//   { java: 'código' }                         (código que no se puede ejecutar aquí: programa con import, float, var…)
//   { note: 'texto', kind: 'tip' | 'warn' }   { list: ['…', '…'] }
//   { table: [['cabecera', …], ['fila', …], …] }
//   { practice: ['l4', 'l13'] }                (ejercicios de la página para practicarlo)
var TEORIA = [];
