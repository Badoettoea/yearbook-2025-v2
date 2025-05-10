// File: src/main.js
import './styles/main.css'
import { checkSession } from './utils/auth'
import { initProfilePage } from './pages/profile'
import { initGalleryPage } from './pages/gallery'
import { initMemoriesPage } from './pages/memories'

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Check authentication
    const session = await checkSession()
    if (!session) {
      // Redirect to login if no session
      if (!window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html'
      }
      return
    }

    // Initialize page-specific logic
    const path = window.location.pathname
    if (path.includes('profile.html')) {
      await initProfilePage()
    } else if (path.includes('gallery.html')) {
      await initGalleryPage()
    } else if (path.includes('memories.html')) {
      await initMemoriesPage()
    }
  } catch (error) {
    console.error('Initialization error:', error)
  }
})
