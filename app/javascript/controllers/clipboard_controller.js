import { Controller } from "@hotwired/stimulus"

// Connect this controller to elements with data-controller="clipboard"
export default class extends Controller {
  static targets = ["source", "button"]
  static values = { successMessage: String, errorMessage: String }
  
  connect() {
    this.successMessageValue = this.successMessageValue || "Copied to clipboard!"
    this.errorMessageValue = this.errorMessageValue || "Could not copy. Please try manually."
  }
  
  copy() {
    const text = this.sourceTarget.getAttribute("data-clipboard-text")
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => this.showSuccess())
        .catch(() => this.showError())
    } else {
      // Fallback para navegadores que no soportan Clipboard API
      this.legacyCopy(text)
    }
  }
  
  legacyCopy(text) {
    // Alternative method for older browsers
    const tempInput = document.createElement("input")
    tempInput.value = text
    document.body.appendChild(tempInput)
    tempInput.select()
    
    try {
      document.execCommand("copy")
      this.showSuccess()
    } catch (err) {
      this.showError()
    } finally {
      document.body.removeChild(tempInput)
    }
  }
  
  showSuccess() {
    const originalText = this.buttonTarget.textContent
    this.buttonTarget.textContent = this.successMessageValue
    this.buttonTarget.classList.add("text-green-600")
    
    setTimeout(() => {
      this.buttonTarget.textContent = originalText
      this.buttonTarget.classList.remove("text-green-600")
    }, 2000)
  }
  
  showError() {
    const originalText = this.buttonTarget.textContent
    this.buttonTarget.textContent = this.errorMessageValue
    this.buttonTarget.classList.add("text-red-600")
    
    setTimeout(() => {
      this.buttonTarget.textContent = originalText
      this.buttonTarget.classList.remove("text-red-600")
    }, 2000)
  }
}
