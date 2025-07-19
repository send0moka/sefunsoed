// const API_BASE = 'http://localhost:3000'; // Change to localhost:3000 for local testingest script untuk quick publish API
// Jalankan dengan: node test-quick-publish.mjs

const API_BASE = 'https://sefunsoed.site' // Change to localhost:3000 for local testing
const PAGE_ID = '3' // ID halaman yang ingin di-publish

async function testQuickPublish() {
  console.log('🚀 Testing Quick Publish API...')

  try {
    // Test GET status first
    console.log('📋 Checking current status...')
    const statusResponse = await fetch(
      `${API_BASE}/api/quick-publish?collection=pages&id=${PAGE_ID}`,
    )
    const statusData = await statusResponse.json()
    console.log('Current status:', statusData)

    // Test POST publish
    console.log('⏳ Publishing page...')
    const publishResponse = await fetch(`${API_BASE}/api/quick-publish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collection: 'pages',
        id: PAGE_ID,
        data: {}, // Empty data, just publish
      }),
    })

    const publishData = await publishResponse.json()
    console.log('Publish result:', publishData)

    if (publishData.success) {
      console.log('✅ Quick publish successful!')
    } else {
      console.log('❌ Quick publish failed:', publishData.error)
    }
  } catch (error) {
    console.error('🔥 Test failed:', error.message)
  }
}

// Jalankan test
testQuickPublish()
