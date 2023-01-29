// Exporting ejs template as string for further compilation
// is a hack to work around webpack's serverside bundling
module.exports = `
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title><%- title %></title>
  <meta name="description" content="">
  <meta name="author" content="WelcomeSystems">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
  <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
  <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
  <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
  <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
  <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
  <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
  <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
  <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <meta name="msapplication-TileColor" content="#ffffff">
  <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
  <meta name="theme-color" content="#ffffff">
  <meta property="og:title" content="WelcomeTV - Local insights from your host." />
  <meta property="og:description" content="Custom-built video channel for Airbnb, VRBO or vacation rentals. Now hosts can greet guests, share local insights and show-case their property." />
  <meta property="og:image" content="<%- serverKey %>fbShareLogoSecured.png" />
  <meta property="og:image:url" content="<%- serverKey %>fbShareLogoSecured.png" />
  <meta property="og:image:secure_url" content="<%- serverKey %>fbShareLogoSecured.png" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="1024" />
  <meta property="og:image:height" content="1044" />
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body>
<link rel="stylesheet" href="<%- stylesheet %>">
  <div id="app">
  <%- body %>
  </div>
<script src="<%- vendor %>" defer="defer"></script>
<script src="<%- entry %>" defer="defer"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=<%-geolocationKey%>&" defer></script>
<script src="https://content.jwplatform.com/libraries/k23WC3ng.js" defer></script>
</body>
</html>
`;
