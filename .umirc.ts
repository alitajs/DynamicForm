import { defineConfig } from 'dumi';

export default defineConfig({
  title: '@alitajs/dform',
  favicon: 'https://avatars.githubusercontent.com/u/49136103?s=200&v=4',
  logo: 'https://avatars.githubusercontent.com/u/49136103?s=200&v=4',
  outputPath: 'docs-dist',
  mode: 'site',
  scripts: [
    `setTimeout(function () {
    var menu = document.getElementsByClassName('__dumi-default-menu')[0];
    var navbar = document.getElementsByClassName('__dumi-default-navbar')[0];
    console.log(navbar.offsetHeight)
    const isMobile = navbar.offsetHeight == 50;
    if (!isMobile) {
      var github = document.createElement('p');
      github.className = 'github';
      github.style.position = 'absolute';
      github.style.top = '0';
      github.style.left = '70px';
      github.innerHTML = '<object type="image/svg+xml" data="https://img.shields.io/github/stars/alitajs/DynamicForm?style=social"></object>';
      menu.appendChild(github);
    }
  }, 300)`,
  ],
  theme: {
    '@hd': '0.02rem',
  },
});
