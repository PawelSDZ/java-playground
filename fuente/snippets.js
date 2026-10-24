if (!ev.shiftKey && s === en) {
        var lineStart = v.lastIndexOf('\n', s - 1) + 1, before = v.slice(lineStart, s);
        var m = /(^|[^\w.])(sout|syso)$/.exec(before);
        if (m) {
          var word = m[2], text, caret;
          text = 'System.out.println();'; caret = 'System.out.println('.length;
          var from = s - word.length;
          insertText(text, from, s);
          codeEl.setSelectionRange(from + caret, from + caret);
          return;
        }
      }