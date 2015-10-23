const config = {
<% authFull.forEach(function(auth){ %>  <%- auth.slug %>: {
    id: '<%- auth.slug %>-id',
    secret: '<%- auth.slug %>-secret',
    cb: 'http://localhost:1234/auth/<%- auth.slug %>/callback',
  },
<% }); %>}

export default config;
