let navToggle = document.getElementById('navToggle')
var el = document.querySelector('.chrome-tabs')
      var chromeTabs = new ChromeTabs()
      let id = 1;
      let currentTab;
      let urlTab = '/tabbedSearch'
      chromeTabs.init(el)
      function initApps() {
        if (window.location.hash.includes('#custom') && localStorage.getItem('customAppsUsedInTabs') !== 'true') {
            if (localStorage.getItem('savedTabs') !== 'true') {
                urlTab = '/tabbedSearch#custom=' + window.location.hash.split('=')[1];
                chromeTabs.addTab()
                localStorage.setItem('customAppsUsedInTabs', true)
            }
            else {
                urlTab = '/tabbedSearch#custom=' + window.location.hash.split('=')[1];
            }
        }
        else if (window.location.hash.includes('#') && localStorage.getItem('customAppsUsedInTabs') !== 'true') {
            if (localStorage.getItem('savedTabs') !== 'true') {
                urlTab = '/tabbedSearch#' + window.location.hash.split('#')[1]
                chromeTabs.addTab()
                localStorage.setItem('customAppsUsedInTabs', true)
            }
            else {
                urlTab = '/tabbedSearch#' + window.location.hash.split('#')[1]
                localStorage.setItem('customAppsUsedInTabs', true)
            }
        }
      }
      async function updateURL(id) {
          let iframeURL = document.getElementById(id).contentWindow.location.href
          if (iframeURL.includes('/loading')) {
              document.getElementById('url-bar').value = ''
          }
          else {
            switch (localStorage.getItem('proxy')) {
                case 'Ultraviolet':
                    iframeURL = decode(iframeURL.split('/uv/service/').slice(1).join('/uv/service/'))
                    break;
                case 'DIP':
                    iframeURL = decode(iframeURL.split('/service/dip/').slice(1).join('/service/dip/'))
                    break;
                case 'Osana':
                    iframeURL = iframeURL.split('/service/~osana/').slice(1).join('/service/~osana/')
                    break;
                case 'Aero':
                    iframeURL = iframeURL.split('/go/').slice(1).join('/go/')
                    break;
                case 'Rammerhead':
                    iframeURL = ''
                    break;
                default:
                    iframeURL = iframeURL
            }
            document.getElementById('url-bar').value = iframeURL
          }
      }
      function createIframe() {
          let tmpIframe = document.createElement('iframe');
          tmpIframe.dataset.id = id++;
          return tmpIframe;
      }
      let tabContents = []
        function init() {
            localStorage.setItem('gamesBypass', 'false')
            if (localStorage.getItem('savedTabs') === 'true') {
                chromeTabs.removeTab(chromeTabs.activeTabEl);
                if (JSON.parse(localStorage.getItem('savedTabsUrls'))[0].id != 0) {
                      savedTabsUrls.unshift({id: 0, url: "about:blank"});
                }
                if (localStorage.getItem('savedTabsLength') === '0') {
                    chromeTabs.addTab()
                }
                for (i = 1; i < parseInt(localStorage.getItem('savedTabsLength'))+1; i++) {
                    //urlTab =
                    let ALLURLS = JSON.parse(localStorage.getItem('savedTabsUrls'))
                    urlTab = ALLURLS[i].url
                    chromeTabs.addTab({
                        title: 'Search',
                        favicon: '/favicon.ico'
                    })
                }
            }
            else {
                chromeTabs.removeTab(chromeTabs.activeTabEl);
                chromeTabs.addTab({
                    title: 'Search',
                    favicon: '/favicon.ico'
                })
            }
        }
      //el.addEventListener('activeTabChange', ({ detail }) => console.log('Active tab changed', detail.tabEl))
      el.addEventListener('tabAdd', async ({ detail }) => {
          let iframe = createIframe();
          let iframeid = iframe.dataset.id
          let detailid = detail.tabEl.dataset.id = iframeid
          if (urlTab !== '/tabbedSearch') {
              console.log('Changing after custom app is used')
              iframe.src = urlTab;
              urlTab = '/tabbedSearch'
            }
            else {
                iframe.src = urlTab
            }
          iframe.style.width = '100%'
          iframe.style.height = 'calc(100% - 86px)';
          iframe.setAttribute('class', 'dnone');
          iframe.setAttribute('id', iframeid)
          tabContents.push({ iframeid, iframe, detail, detailid })
          document.getElementById('tabContents').appendChild(iframe)
          browserInit(detail.tabEl, iframeid);
          iframe.addEventListener('load', function () {
              document.getElementById(iframeid).contentWindow.document.getElementById('uv-iframe').addEventListener('load', function () {
                  window.parent.updateURL(iframeid)
              })
          })
      })
      function saveTabs() {
          let allTabUrls = [];
          allTabUrls.push({id: 0, url: "about:blank"})
          for (i = 1; i < tabContents.length+1; i++) {
              try {
                    let original;
                    original = document.getElementById(i).contentWindow.document.getElementById('uv-iframe').src
                    //decoded = decode(original)
                    if (original.includes('/loading')) {
                        original = '/tabbedSearch'
                    }
                    allTabUrls.push({ id: i, url: original })
              }
              catch (err) {
                  console.log(err)
              }
          }
          localStorage.setItem('savedTabs', true)
          localStorage.setItem('savedTabsLength', tabContents.length)
          localStorage.setItem('savedTabsUrls', JSON.stringify(allTabUrls))
      }
      //window.addEventListener('beforeunload', event => {
        //  event.preventDefault()
          //event.returnValue = 'Are you sure you want to leave? Any changes you have made will be lost.'
      //})
      window.onbeforeunload = function() {
            saveTabs();
        };
      function browserInit(tabEl, id) {
          document.getElementById('url-bar').value = ''
      }
      function browserChange(id) {
        let URLBAR = document.getElementById('url-bar')
        let iframeSRC;
        try {
            iframeSRC = document.getElementById(id).contentWindow.location.href
        }
        catch (err) {
            console.log('No content to load ignoring')
            iframeSRC = ''
        }
        URLBAR.value = ''
        switch (localStorage.getItem('proxy')) {
            case 'Ultraviolet':
                iframeSRC = decode(iframeSRC.split('/uv/service/').slice(1).join('/uv/service/'))
                break;
            case 'DIP':
                iframeSRC = decode(iframeSRC.split('/service/dip/').slice(1).join('/service/dip/'))
                break;
            case 'Osana':
                iframeSRC = iframeSRC.split('/service/~osana/').slice(1).join('/service/~osana/')
                break;
            case 'Aero':
                iframeSRC = iframeSRC.split('/go/').slice(1).join('/go/')
                break;
            case 'Rammerhead':
                iframeSRC = ''
                break;
            default:
                iframeSRC = iframeSRC
        }
        if (iframeSRC.includes('/loading')) {
            URLBAR.value = ''
        }
        else {
            URLBAR.value = iframeSRC
        }
      }
      function browserSearch(value) {
              document.getElementById(currentTab).contentWindow.location.href = '/tabbedSearch'
              document.getElementById(currentTab).addEventListener('load', function () {
              document.getElementById(currentTab).contentWindow.document.getElementById('uv-address').value = value
              document.getElementById(currentTab).contentWindow.document.getElementById('uv-form').dispatchEvent(new Event('submit'))
          })
      }
      function decode(str) {
        if (str.charAt(str.length - 1) == "/") str = str.slice(0, -1);
        return decodeURIComponent(str)
            .split("")
            .map((char, ind) =>
                ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char
            )
            .join("");
        }
      function switchTabsHandler(activeTab, detail, id) {
          if (activeTab) {
              try {
                document.getElementById(activeTab.dataset.id).setAttribute('class', 'dnone')
              }
              catch {
                let iframe = createIframe();
                let iframeid = -1
                let detailid = -1
                if (urlTab !== '/tabbedSearch') {
                    iframe.src = urlTab;
                    urlTab = '/tabbedSearch'
                }
                else {
                    iframe.src = urlTab
                }
                iframe.style.width = '100%';
                iframe.style.height = 'calc(100% - 86px)';
                iframe.setAttribute('class', 'dnone');
                iframe.setAttribute('id', iframeid)
                tabContents.push({ iframeid, iframe, detail, detailid })
                document.getElementById('tabContents').appendChild(iframe)
              }
          }
          try {
            document.getElementById(id).removeAttribute('class', 'dnone')
          }
          catch (err) {
            let iframe = createIframe();
            let iframeid = -1
            let detailid = -1
            iframe.src = urlTab;
            iframe.style.width = '100%'
            iframe.style.height = 'calc(100% - 86px)';
            iframe.setAttribute('class', 'dnone');
            iframe.setAttribute('id', iframeid)
            tabContents.push({ iframeid, iframe, detail, detailid })
            document.getElementById('tabContents').appendChild(iframe)
        }
        browserChange(id)
      }
      el.addEventListener('tabRemove', ({ detail }) => {
          if (detail.tabEl.dataset.id === -1 || detail.tabEl.dataset.id === '-1') {
              console.log('Default Tab Removed Init function complete')
          }
          else {
            let originalAmount = tabContents.length
            let newAmount;
            let iframe = document.getElementById(detail.tabEl.dataset.id)
            document.getElementById('tabContents').removeChild(iframe)
            newAmount = tabContents.length - detail.tabEl.id - 1
            tabContents.splice(detail.tabEl.dataset.id, 1)
            if (tabContents.length !== newAmount) {
                tabContents.splice(newAmount, 1)
            }
            console.log('Removed tab: ' + detail.tabEl.dataset.id + '\n' + 'Amount is: ' + newAmount)
          }
       })
        el.addEventListener('activeTabChange', ({ detail }) => {
            switchTabsHandler(detail.active, detail.tabEl, detail.tabEl.dataset.id)
            currentTab = detail.tabEl.dataset.id
        })
      document.querySelector('button[data-add-tab]').addEventListener('click', _ => {
        chromeTabs.addTab({
          title: 'Search',
          favicon: '/favicon.ico'
        })
      })

      function popOut() {
          try {
                let SRC = document.getElementById(currentTab).contentWindow.location.href
                if (SRC.includes('/loading')) {
                    throw ('LOL GET GUD')
                }
                else {
                    window.open(SRC)
                }
          }
          catch (err) {
              console.log('No Location to Grab ignoring...')
          }
      }
      function fullScreen() {
          console.log('To be implemented')
      }
      function Refresh() {
          document.getElementById(currentTab).contentWindow.location.reload()
      }
      function Forward() {
          document.getElementById(currentTab).contentWindow.history.forward()
      }
      function Backward() {
          document.getElementById(currentTab).contentWindow.history.back()
      }
    navToggle.addEventListener('mouseover', function () {
        let fullscreenBehavior = localStorage.getItem('fullscreenBehavior');
        if (fullscreenBehavior === 'true') {
            fullScreenIframe(false);
        } else if (fullscreenBehavior === 'false') {
            fullScreenIframe(false, 'content');
        }
    });
    function fullScreenIframe(value, fullscreenBehavior) {
        if (fullscreenBehavior === 'content') {
            if (value === true) {
                let iframe = document.getElementById('uv-iframe');
                iframe.requestFullscreen();
                navToggle.classList.remove('dnone');
            } else if (value === false) {
                document.exitFullscreen();
                navToggle.classList.add('dnone');
            }
        } else {
            if (value === true) {
                let iframe = document.getElementById(currentTab);
                document.getElementById('hamburger').classList.add('dnone')
                navToggle.classList.remove('dnone');
                //set to position absolute
                iframe.style.position = 'absolute';
                //set to top left corner
                iframe.style.top = '0';
                iframe.style.left = '0';
                //set to full width and height
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                //set z-index to 9999
                iframe.style.zIndex = '9998';
                //add a transition
                iframe.style.transition = 'all 0.5s ease-in-out';
            } else if (value === false) {
                let iframe = document.getElementById(currentTab);
                document.getElementById('hamburger').classList.remove('dnone')
                navToggle.classList.add('dnone');
                //set styles to height: calc(100% - 4rem);width: 100%;border: none;position: fixed;top: 4rem;right: 0;left: 0;bottom: 0;border: none; background: var(--bg-color);
                iframe.style.height = 'calc(100% - 86px)';
                iframe.style.width = '100%';
                iframe.style.border = 'none';
                iframe.style.position = 'fixed';
                iframe.style.top = '86px';
                iframe.style.right = '0';
                iframe.style.left = '0';
                iframe.style.bottom = '0';
                iframe.style.border = 'none';
                iframe.style.background = 'var(--bg-color)';
                iframe.style.transition = 'all 0.5s ease-in-out';
                iframe.style.zIndex = '9999';
            }
        }
    }
    function fullscreenIframe() {
        let fullscreenBehavior = localStorage.getItem('fullscreenBehavior');
        if (fullscreenBehavior === 'true') {
            fullScreenIframe(true);
        } else if (fullscreenBehavior === 'false') {
            fullScreenIframe(true, 'content');
        } else {
            localStorage.setItem('fullscreenBehavior', 'true');
            fullScreenIframe(true);
        }
    }

    init();
    initApps();
