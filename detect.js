/**
 * ECOVISION - DETECT.JS
 * This file handles the AI analysis logic.
 * It simulates the detection process and updates the UI with results.
 */

document.addEventListener('DOMContentLoaded', () => {
    // UI Element References
    const detectBtn = document.getElementById('detect-btn');
    const scanner = document.getElementById('scanner');
    const resultPlaceholder = document.getElementById('result-placeholder');
    const resultContent = document.getElementById('result-content');
    
    // Result Detail Elements
    const detectedType = document.getElementById('detected-type');
    const confidenceVal = document.getElementById('confidence-val');
    const confidenceBar = document.getElementById('confidence-bar');
    const adviceText = document.getElementById('advice-text');
    const categoryBadge = document.getElementById('category-badge');

    /**
     * MOCK DATA
     * Since the backend is currently under development, we use this 
     * to simulate different waste categories for your "vibe coding" demo.
     */
    const wasteCategories = [
        {
            type: 'Recyclable',
            confidence: '98.4%',
            advice: 'Clean and dry this item. Place it in the BLUE recycling bin. Items like plastic bottles, paper, and clean cans go here.',
            colorClass: 'bg-emerald-500'
        },
        {
            type: 'Hazardous',
            confidence: '95.2%',
            advice: 'This contains harmful substances. Do NOT put in regular bins. Take it to a designated hazardous waste drop-off point.',
            colorClass: 'bg-rose-500'
        },
        {
            type: 'Organic',
            confidence: '91.8%',
            advice: 'This is biodegradable. Place it in the GREEN bin for composting. Includes fruit peels, vegetable scraps, and eggshells.',
            colorClass: 'bg-amber-600'
        },
        {
            type: 'Residual',
            confidence: '88.5%',
            advice: 'Non-recyclable waste. Place it in the GREY bin. This usually goes to an incinerator or a managed landfill.',
            colorClass: 'bg-slate-500'
        }
    ];

    /**
     * DETECT BUTTON CLICK HANDLER
     * Triggers the scanning animation and simulates a response from the AI model.
     */
    detectBtn.addEventListener('click', () => {
        // 1. Enter "Processing" State
        startScanning();

        /**
         * SIMULATION DELAY
         * We simulate a 2.5-second wait time to mimic the neural network processing the image.
         * In the future, this is where you will use fetch() to talk to backend/app.py.
         */
        setTimeout(() => {
            stopScanning();
            displayRandomResult();
        }, 2500);
    });

    function startScanning() {
        // Show scanning line animation
        scanner.classList.remove('hidden');
        
        // Disable button and show loading icon
        detectBtn.disabled = true;
        detectBtn.innerHTML = '<i class="fas fa-circle-notch animate-spin mr-2"></i>Analyzing...';
        
        // Hide previous results if any
        resultContent.classList.add('hidden');
        resultPlaceholder.classList.remove('hidden');
    }

    function stopScanning() {
        // Hide scanning line
        scanner.classList.add('hidden');
        
        // Update button text
        detectBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Analysis Complete';
    }

    function displayRandomResult() {
        // Pick a random category for the demo
        const result = wasteCategories[Math.floor(Math.random() * wasteCategories.length)];

        // Update Text Content
        detectedType.innerText = result.type;
        confidenceVal.innerText = result.confidence;
        adviceText.innerText = result.advice;

        // Update UI Visuals
        updateBadgeColor(result.colorClass);
        animateConfidenceBar(result.confidence);

        // Show the result panel
        resultPlaceholder.classList.add('hidden');
        resultContent.classList.remove('hidden');
    }

    function updateBadgeColor(newClass) {
        // Remove existing background classes
        categoryBadge.classList.remove('bg-emerald-500', 'bg-rose-500', 'bg-amber-600', 'bg-slate-500');
        // Add the new specific class
        categoryBadge.classList.add(newClass);
    }

    function animateConfidenceBar(percentage) {
        // Reset bar first
        confidenceBar.style.width = '0%';
        
        // Animate to the target percentage
        setTimeout(() => {
            confidenceBar.style.width = percentage;
        }, 100);
    }
});