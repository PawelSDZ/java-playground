module.exports = [
// regex
`String tarjeta = "1234567812345678";
String oculta = tarjeta.substring(0, tarjeta.length() - 4).replaceAll("\\\\d", "*") + tarjeta.substring(tarjeta.length() - 4);
System.out.println(oculta);`,
`System.out.println("a1b22c333".replaceAll("[0-9]+", "#"));
System.out.println("a1b22c333".replaceFirst("[0-9]+", "#"));
System.out.println("Hola   mundo  java".replaceAll("\\\\s+", " "));
System.out.println("2026-10-19".replaceAll("(\\\\d+)-(\\\\d+)-(\\\\d+)", "$3/$2/$1"));
System.out.println("precio".replaceAll("o", "\\\\$"));
System.out.println("abc".replaceAll("", "-"));
System.out.println("aaa".replaceAll("a*", "X"));`,
`System.out.println("12345".matches("\\\\d+"));
System.out.println("123a5".matches("\\\\d+"));
System.out.println("+34 600 000 000".matches("\\\\+34 \\\\d{3} \\\\d{3} \\\\d{3}"));
System.out.println("Hola".matches("[A-Z][a-z]*"));
System.out.println("HOLA".matches("(?i)hola"));
System.out.println("abc".matches("\\\\p{Alpha}+"));
System.out.println("abc".matches("b"));`,
`String[] p = "uno,dos,,tres,,".split(",");
System.out.println(p.length + " " + java.util.Arrays.toString(p));`,
`System.out.println(java.util.Arrays.toString("a b  c".split(" ")));
System.out.println(java.util.Arrays.toString("a b  c".split("\\\\s+")));
System.out.println(java.util.Arrays.toString(" a b".split(" ")));
System.out.println(java.util.Arrays.toString("abc".split("")));
System.out.println(java.util.Arrays.toString("".split(",")));
System.out.println(",".split(",").length);
System.out.println(java.util.Arrays.toString("a,b,c,d".split(",", 2)));
System.out.println(java.util.Arrays.toString("a,b,,".split(",", -1)));
System.out.println(java.util.Arrays.toString("foto.final.png".split("\\\\.")));
System.out.println(java.util.Arrays.toString("a1b2c3".split("\\\\d")));`,
// StringBuilder
`StringBuilder sb = new StringBuilder();
sb.append("Hola").append(' ').append(5).append(2.5).append(true);
System.out.println(sb);
System.out.println(sb.length());
System.out.println(sb.reverse());
System.out.println(new StringBuilder("Java").reverse().toString());
String palabra = "oso";
System.out.println(palabra.equals(new StringBuilder(palabra).reverse().toString()));`,
`StringBuilder sb = new StringBuilder("abcdef");
sb.insert(0, "X").deleteCharAt(3).setCharAt(0, 'Y');
System.out.println(sb + " " + sb.charAt(1) + " " + sb.indexOf("d"));
sb.delete(1, 3); System.out.println(sb);
sb.replace(0, 2, "ZZZ"); System.out.println(sb);
System.out.println(sb.substring(1) + "|" + sb.substring(1, 3));
sb.setLength(2); System.out.println(sb + "|" + sb.isEmpty());
String s = "x" + sb; System.out.println(s);
char[] cs = {'h','o','l','a'};
System.out.println(new String(cs) + String.valueOf(cs));`,
`StringBuilder sb = new StringBuilder();
for (int i = 1; i <= 5; i++) { sb.append(i); if (i < 5) sb.append(", "); }
System.out.println(sb.toString());`,
// switch
`int dia = 3;
switch (dia) {
    case 1:
        System.out.println("Lunes");
        break;
    case 2:
    case 3:
        System.out.println("Martes o miércoles");
    case 4:
        System.out.println("cae aquí también");
        break;
    default:
        System.out.println("Otro");
}`,
`String dia = "sábado";
switch (dia) {
    case "sábado", "domingo" -> System.out.println("Fin de semana");
    default -> {
        System.out.println("Entre semana");
    }
}
char c = 'b';
switch (c) { case 'a' -> System.out.println("A"); case 'b' -> System.out.println("B"); default -> System.out.println("?"); }
int n = 7;
switch (n % 2) { case 0: System.out.println("par"); break; default: System.out.println("impar"); }`,
`int mes = 2;
int dias = switch (mes) {
    case 2 -> 28;
    case 4, 6, 9, 11 -> 30;
    default -> 31;
};
System.out.println(dias);
String nota = switch ((int) 7.5) {
    case 5, 6 -> "Aprobado";
    case 7, 8 -> {
        String t = "Notable";
        yield t + "!";
    }
    default -> "Otro";
};
System.out.println(nota);
for (int i = 0; i < 4; i++) {
    switch (i) {
        case 1: continue;
        case 2: break;
        default: System.out.println("i=" + i);
    }
    System.out.println("fin " + i);
}`,
`int x = 5;
switch (x) { case 1: int y = 10; System.out.println(y); break; case 5: y = 3; System.out.println(y); break; }
double r = switch (x) { case 5 -> 1; default -> 2.5; };
System.out.println(r);`,
// extras
`int[] a = {1, 2, 3};
System.out.println(java.util.Arrays.toString(java.util.Arrays.copyOf(a, 5)));
System.out.println(java.util.Arrays.toString(java.util.Arrays.copyOfRange(a, 1, 3)));
System.out.println(Math.floorMod(-7, 3) + " " + Math.floorDiv(-7, 3) + " " + (-7 % 3));
System.out.println(Character.isAlphabetic('ñ') + " " + Character.isAlphabetic('1'));`,
];
