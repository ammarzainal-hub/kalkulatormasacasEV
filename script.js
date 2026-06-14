// Update slider value display
const slider = document.getElementById('currentCharge');
const chargeValue = document.getElementById('chargeValue');

slider.addEventListener('input', function() {
    chargeValue.textContent = this.value;
});

function calculate() {
    // Ambil nilai dari input
    const batteryCapacity = 44.9; // kWh (fixed)
    const currentCharge = parseInt(document.getElementById('currentCharge').value);
    const targetCharge = 90; // % (fixed)
    const chargerPower = parseFloat(document.getElementById('chargerPower').value);
    
    // Pengesahan input
    if (currentCharge >= targetCharge) {
        alert('Paras cas semasa sudah mencapai atau melebihi 90%!');
        return;
    }
    
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
    
    // Paparkan keputusan
    const resultDiv = document.getElementById('result');
    resultDiv.classList.add('show');
    
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
    `;
}

// Auto calculate on change
slider.addEventListener('change', calculate);
document.getElementById('chargerPower').addEventListener('change', calculate);

// Calculate on page load with default values
window.addEventListener('load', calculate);
