import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["output", "length", "numbers", "symbols", "lowercase", "uppercase", "lengthValue"]
  static values = { defaultLength: Number, targetField: String }

  connect() {
    // Default values
    this.defaultLengthValue = this.defaultLengthValue || 16
    this.lengthTarget.value = this.defaultLengthValue
    this.updateLengthValue()
    // Generate a password on initialization
    this.generate()
  }
  
  // Method to find the target field where to insert the password
  findTargetField() {
    if (this.hasTargetFieldValue && this.targetFieldValue) {
      return document.querySelector(this.targetFieldValue)
    }
    return null
  }

  updateLengthValue() {
    this.lengthValueTarget.textContent = this.lengthTarget.value
  }

  generate() {
    const length = parseInt(this.lengthTarget.value)
    const hasNumbers = this.numbersTarget.checked
    const hasSymbols = this.symbolsTarget.checked
    const hasLowercase = this.lowercaseTarget.checked
    const hasUppercase = this.uppercaseTarget.checked
    
    // Make sure at least one character set is selected
    if (!hasNumbers && !hasSymbols && !hasLowercase && !hasUppercase) {
      this.outputTarget.value = "Select at least one character type"
      return
    }
    
    let charset = ""
    if (hasLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (hasUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (hasNumbers) charset += "0123456789"
    if (hasSymbols) charset += "!@#$%^&*()_-+={}[]\\|:;<>,.?/~"
    
    let password = ""
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      password += charset[randomIndex]
    }
    
    this.outputTarget.value = password
  }
  
  copyToClipboard() {
    this.outputTarget.select()
    document.execCommand("copy")
    
    // Visual feedback
    const originalValue = this.outputTarget.value
    this.outputTarget.value = "Copied!"
    setTimeout(() => {
      this.outputTarget.value = originalValue
    }, 1000)
  }
  
  usePassword() {
    const targetField = this.findTargetField()
    if (targetField) {
      targetField.value = this.outputTarget.value
      targetField.type = "text" // Temporarily show the text
      setTimeout(() => {
        targetField.type = "password" // Hide again after 2 seconds
      }, 2000)
      
      // Visual confirmation effect
      targetField.classList.add("bg-green-50")
      setTimeout(() => {
        targetField.classList.remove("bg-green-50")
      }, 1000)
    }
  }
}
