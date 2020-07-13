// 漫画呗 2020-7-13
function adGoDie() {
  document.querySelector('.control_bottom').style.marginBottom = '300px';
  setInterval(() => {
    [...document.querySelectorAll('brde')].map(d => d.remove());
    [...document.querySelectorAll('a')].filter(d => !d.href.includes('javascript')).map(d => d.remove());
    while (document.body.lastElementChild.tagName != 'SCRIPT') {
      document.body.lastElementChild.remove()
    }
  }, 100);
}
adGoDie();
