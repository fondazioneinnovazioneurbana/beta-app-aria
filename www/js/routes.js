routes = [
    {
        path: '/',
        url: './index.html',
  },
    {
        path: '/about/',
        url: './pages/about.html',
  },
    {
        path: '/lemisure/',
        url: './pages/lemisure.html',
  },
    {
        path: '/laboratorioaria/',
        url: './pages/laboratorioaria.html',
  },
    {
        path: '/crediti/',
        url: './pages/crediti.html',
  },{
        path: '/laboratorioaria/',
        url: './pages/laboratorioaria.html',
  },
  // Page Loaders & Router
    {
        path: '/page-loader-template7/:user/:userId/:posts/:postId/',
        templateUrl: './pages/page-loader-template7.html',
  },
    {
        path: '/page-loader-component/:user/:userId/:posts/:postId/',
        componentUrl: './pages/page-loader-component.html',
  },
    // Default route (404 page). MUST BE THE LAST
    {
        path: '(.*)',
        url: './pages/404.html',
    }, ];
