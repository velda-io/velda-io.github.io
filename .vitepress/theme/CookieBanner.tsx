// CookieBanner.tsx
import { h, ref, onMounted, defineComponent } from 'vue'

const COOKIE_KEY = 'cookie_consent'

export default defineComponent({
  name: 'CookieBanner',
  setup() {
    const visible = ref(false)
    const accepted = ref(false)

    onMounted(() => {
      const consent = localStorage.getItem(COOKIE_KEY)
      if (!consent) visible.value = true
      else accepted.value = consent === 'accepted'
    })

    function accept() {
      localStorage.setItem(COOKIE_KEY, 'accepted')
      visible.value = false
      accepted.value = true
      window.location.reload()
    }
    function decline() {
      localStorage.setItem(COOKIE_KEY, 'declined')
      visible.value = false
      accepted.value = false
      window.location.reload()
    }

    return () =>
      visible.value
        ? h(
            'div',
            { class: 'cookie-banner' },
            [
              h('span', 'We use cookies and similar tools to analyze the usage of our site and improve and customize our services. You consent to our use of such cookies and similar tools if you click on “Agree” and continue to use our site. .'),
              h(
                'button',
                { onClick: accept },
                'Accept'
              ),
              h(
                'button',
                { onClick: decline },
                'Decline'
              )
            ]
          )
        : null
  }
})
