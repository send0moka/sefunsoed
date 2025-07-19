// Script untuk di-copy paste ke browser console di halaman admin
// https://sefunsoed.site/admin/collections/pages/3

// Function untuk force publish via API
async function forcePublishPage(pageId = '3') {
  console.log('🚀 Starting force publish...')

  try {
    // Test current status first
    console.log('📋 Checking current status...')
    const statusResponse = await fetch(`/api/force-publish?collection=pages&id=${pageId}`)
    const statusData = await statusResponse.json()
    console.log('Current status:', statusData)

    // Force publish
    console.log('⚡ Force publishing...')
    const publishResponse = await fetch('/api/force-publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collection: 'pages',
        id: pageId,
      }),
    })

    const publishData = await publishResponse.json()
    console.log('Force publish result:', publishData)

    if (publishData.success) {
      console.log('✅ Force publish berhasil!')

      // Refresh halaman setelah 2 detik
      setTimeout(() => {
        console.log('🔄 Refreshing page...')
        window.location.reload()
      }, 2000)

      return true
    } else {
      console.log('❌ Force publish gagal:', publishData.error)
      return false
    }
  } catch (error) {
    console.error('🔥 Error:', error)
    return false
  }
}

// Function untuk retry publish standard Payload dengan timeout yang pendek
async function quickRetryPublish() {
  console.log('🔄 Trying quick retry...')

  try {
    // Cari tombol publish di halaman admin
    const publishButton =
      document.querySelector('[type="submit"]') ||
      document.querySelector('button[form*="publish"]') ||
      document.querySelector('*[aria-label*="publish"]') ||
      document.querySelector('*[title*="publish"]')

    if (publishButton) {
      console.log('📌 Found publish button, clicking...')
      publishButton.click()

      // Wait and check for success/error
      setTimeout(() => {
        const errorElement =
          document.querySelector('[role="alert"]') ||
          document.querySelector('.error') ||
          document.querySelector('.notification--error')

        if (errorElement) {
          console.log('❌ Standard publish masih error, trying force publish...')
          forcePublishPage()
        } else {
          console.log('✅ Standard publish berhasil!')
        }
      }, 5000)
    } else {
      console.log('🤔 Publish button tidak ditemukan, trying force publish directly...')
      forcePublishPage()
    }
  } catch (error) {
    console.error('🔥 Retry error:', error)
    forcePublishPage()
  }
}

// Auto-run when script is loaded
console.log('📋 SEF Publish Helper loaded!')
console.log('📌 Available functions:')
console.log('   - forcePublishPage(id)  : Force publish specific page')
console.log('   - quickRetryPublish()   : Quick retry with fallback')
console.log('')
console.log('🎯 Running auto-fix for current page...')

// Auto-detect page ID from URL
const currentUrl = window.location.href
const pageIdMatch = currentUrl.match(/\/pages\/(\d+)/)
const currentPageId = pageIdMatch ? pageIdMatch[1] : '3'

console.log(`🔍 Detected page ID: ${currentPageId}`)

// Run quick retry first, fallback to force publish
quickRetryPublish()
