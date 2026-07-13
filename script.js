// Update slider value display
const slider = document.getElementById('currentCharge');
const chargeValue = document.getElementById('chargeValue');
const manualToggle = document.getElementById('manualToggle');
const startTimeInput = document.getElementById('startTime');

slider.addEventListener('input', function() {
    chargeValue.textContent = this.value;
    calculate();
});

manualToggle.addEventListener('change', function() {
    startTimeInput.disabled = !this.checked;
    if (this.checked && !startTimeInput.value) {
        const now = new Date();
        startTimeInput.value = pad(now.getHours()) + ':' + pad(now.getMinutes());
    }
    calculate();
});

startTimeInput.addEventListener('input', calculate);

function pad(n) {
    return String(n).padStart(2, '0');
}

function formatTime(date) {
    return pad(date.getHours()) + ':' + pad(date.getMinutes());
}

function calculate() {
    // Ambil nilai dari input
    const batteryCapacity = 44.9; // kWh (fixed)
    const currentCharge = parseInt(document.getElementById('currentCharge').value);
    const targetCharge = 90; // % (fixed)
    const chargerPower = parseFloat(document.getElementById('chargerPower').value);
    
    // Kira jumlah kWh yang diperlukan
    const energyNeeded = batteryCapacity * ((targetCharge - currentCharge) / 100);
    
    // Kira tempoh mengecas (jam)
    const hours = energyNeeded / chargerPower;
    
    // Tukar ke jam dan minit
    const totalMinutes = Math.round(hours * 60);
    const displayHours = Math.floor(totalMinutes / 60);
    const displayMinutes = totalMinutes % 60;
    
    // Format masa
    let timeString = '';
    if (displayHours > 0) {
        timeString += `${displayHours} jam`;
        if (displayMinutes > 0) {
            timeString += ` ${displayMinutes} minit`;
        }
    } else {
        timeString = `${displayMinutes} minit`;
    }
    
    // Kira waktu mula dan waktu siap
    let startDate = new Date();
    if (manualToggle.checked && startTimeInput.value) {
        const [h, m] = startTimeInput.value.split(':').map(Number);
        startDate = new Date();
        startDate.setHours(h, m, 0, 0);
    }
    const finishDate = new Date(startDate.getTime() + totalMinutes * 60000);

    const sameDay = startDate.toDateString() === finishDate.toDateString();
    const finishLabel = formatTime(finishDate) + (sameDay ? '' : ' (esok)');

    // Paparkan keputusan
    const resultDiv = document.getElementById('result');
    
    resultDiv.innerHTML = `
        <h2>⏱️ Keputusan Pengiraan</h2>
        <div class="result-item">
            <span class="result-label">Tempoh Mengecas:</span>
            <span class="result-value">${timeString}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Tenaga Diperlukan:</span>
            <span class="result-value">${energyNeeded.toFixed(2)} kWh</span>
        </div>
        <div class="result-item">
            <span class="result-label">Dari → Hingga:</span>
            <span class="result-value">${currentCharge}% → ${targetCharge}%</span>
        </div>
        <div class="result-item">
            <span class="result-label">Kuasa Pengecas:</span>
            <span class="result-value">${chargerPower} kW</span>
        </div>
        <div class="result-clock">
            <div class="clock-item">
                <span class="clock-label">🕐 Waktu Mula</span>
                <span class="clock-value">${formatTime(startDate)}</span>
            </div>
            <div class="clock-arrow">→</div>
            <div class="clock-item">
                <span class="clock-label">🔋 Siap Cas</span>
                <span class="clock-value">${finishLabel}</span>
            </div>
        </div>
    `;
}

// Auto calculate on input change (real-time update)
document.getElementById('chargerPower').addEventListener('change', calculate);

// Calculate on page load with default values
window.addEventListener('load', calculate);

// Update langsung setiap minit bila mod auto (ikut masa semasa)
setInterval(function() {
    if (!manualToggle.checked) {
        calculate();
    }
}, 60000);
