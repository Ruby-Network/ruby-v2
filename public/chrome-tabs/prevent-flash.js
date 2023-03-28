var el = document.querySelector('.chrome-tabs')
      var chromeTabs = new ChromeTabs()

      chromeTabs.init(el)

      el.addEventListener('activeTabChange', ({ detail }) => console.log('Active tab changed', detail.tabEl))
      el.addEventListener('tabAdd', ({ detail }) => console.log('Tab added', detail.tabEl))
      el.addEventListener('tabRemove', ({ detail }) => console.log('Tab removed', detail.tabEl))

      document.querySelector('button[data-add-tab]').addEventListener('click', _ => {
        chromeTabs.addTab({
          title: 'New Tab',
          favicon: false
        })
      })

      document.querySelector('button[data-add-background-tab]').addEventListener('click', _ => {
        chromeTabs.addTab({
          title: 'New Tab',
          favicon: false
        }, {
          background: true
        })
      })

      document.querySelector('button[data-remove-tab]').addEventListener('click', _ => {
        chromeTabs.removeTab(chromeTabs.activeTabEl)
      })

      document.querySelector('button[data-theme-toggle]').addEventListener('click', _ => {
        if (el.classList.contains('chrome-tabs-dark-theme')) {
          document.documentElement.classList.remove('dark-theme')
          el.classList.remove('chrome-tabs-dark-theme')
        } else {
          document.documentElement.classList.add('dark-theme')
          el.classList.add('chrome-tabs-dark-theme')
        }
      })

      window.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.key === 't') {
          chromeTabs.addTab({
            title: 'New Tab',
            favicon: false
          })
        }
      })
