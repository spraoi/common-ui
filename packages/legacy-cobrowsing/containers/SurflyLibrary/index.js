(function(s, u, r, f, l, y) {
  s[f] = s[f] || {
    init: function() {
      s[f].q = arguments;
    },
  };
  l = u.createElement(r);
  y = u.getElementsByTagName(r)[0];
  l.async = 1;
  l.src = 'https://surfly.com/surfly.js';
  y.parentNode.insertBefore(l, y);
})(window, document, 'script', 'Surfly');
