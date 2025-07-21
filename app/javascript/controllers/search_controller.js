import { Controller } from "@hotwired/stimulus"

// Connect this controller to elements with data-controller="search"
export default class extends Controller {
  static targets = ["input", "results", "spinner"]
  static values = { url: String, minLength: Number }
  
  connect() {
    this.timeout = null
    this.minLengthValue = this.minLengthValue || 3
    // Ensure spinner is hidden on initial load
    this.hideSpinner()
  }
  
  search() {
    // Clear previous timeout to implement debounce
    clearTimeout(this.timeout)
    
    const query = this.inputTarget.value.trim()
    
    // If search was cleared, reset to full view
    if (query === "") {
      this.resetSearch()
      return
    }
    
    // Don't search if fewer characters than minimum
    if (query.length < this.minLengthValue) {
      this.hideSpinner()
      return
    }
    
    // Show the spinner during search
    this.showSpinner()
    
    // Start the search after 500ms of inactivity (debounce)
    this.timeout = setTimeout(() => {
      this.fetchResults(query)
    }, 500)
  }
  
  resetSearch() {
    // Redirect to the page without search parameters
    this.hideSpinner()
    window.location.href = this.urlValue
  }
  
  fetchResults(query) {
    // Perform search using fetch API
    const url = `${this.urlValue}?search=${encodeURIComponent(query)}`
    
    fetch(url, {
      headers: {
        "Accept": "text/vnd.turbo-stream.html, text/html",
        "X-Requested-With": "XMLHttpRequest"
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return response.text()
    })
    .then(html => {
      this.resultsTarget.innerHTML = html
      
      // Update URL without reloading the page
      history.pushState({ query }, "", url)
      
      // Hide spinner when search is complete
      this.hideSpinner()
    })
    .catch(error => {
      console.error("Error during search:", error)
      this.hideSpinner()
    })
  }
  
  // Show the loading spinner
  showSpinner() {
    if (this.hasSpinnerTarget) {
      this.spinnerTarget.classList.remove('hidden')
    }
  }
  
  // Hide the loading spinner
  hideSpinner() {
    if (this.hasSpinnerTarget) {
      this.spinnerTarget.classList.add('hidden')
    }
  }
  
  clearSearch() {
    this.inputTarget.value = ""
    this.resetSearch()
  }
}
