import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["display", "input", "startBtn", "resetBtn"]

  connect() {
    this.running = false
    this.initialMinutes = parseInt(this.inputTarget.value, 10) || 25
    this.timeLeft = this.initialMinutes * 60
    this.timerInterval = null

    // Chargement du son
    this.audio = new Audio("/assets/end_timer.ogg")

    this.audio.load()

    this.updateDisplay()
  }

  updateDisplay() {
    const minutes = String(Math.floor(this.timeLeft / 60)).padStart(2, '0')
    const seconds = String(this.timeLeft % 60).padStart(2, '0')
    this.displayTarget.textContent = `${minutes}:${seconds}`
  }

  start() {
    if (!this.running) {
      const inputVal = parseInt(this.inputTarget.value, 10)
      if (!isNaN(inputVal)) {
        this.initialMinutes = inputVal
        this.timeLeft = this.initialMinutes * 60
      }

      this.running = true
      this.startBtnTarget.textContent = "Pause"

      this.timerInterval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--
          this.updateDisplay()
        } else {
          this.pause()
          this.playSound()
        }
      }, 1000)
    } else {
      this.pause()
    }
  }

  pause() {
    clearInterval(this.timerInterval)
    this.running = false
    this.startBtnTarget.textContent = "Start"
  }

  reset() {
    this.pause()
    this.timeLeft = this.initialMinutes * 60
    this.updateDisplay()
  }

  updateFromInput() {
    if (!this.running) {
      this.initialMinutes = parseInt(this.inputTarget.value, 10)
      this.timeLeft = this.initialMinutes * 60
      this.updateDisplay()
    }
  }

  playSound() {
    this.audio.currentTime = 0
    this.audio.play().catch(err => {
      console.warn("Impossible de jouer le son :", err)
    })
  }
}
