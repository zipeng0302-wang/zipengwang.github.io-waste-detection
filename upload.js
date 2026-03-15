/**
 * ECOVISION - UPLOAD.JS
 * This file manages the user interface for uploading waste images.
 * It handles drag-and-drop events, file selection, and image previews.
 */

document.addEventListener('DOMContentLoaded', () => {
    // UI Element References
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const previewContainer = document.getElementById('preview-container');
    const imagePreview = document.getElementById('image-preview');
    const uploadPrompt = document.getElementById('upload-prompt');
    const detectBtn = document.getElementById('detect-btn');
    const resetBtn = document.getElementById('reset-btn');
    const resultPlaceholder = document.getElementById('result-placeholder');
    const resultContent = document.getElementById('result-content');
    const scanner = document.getElementById('scanner');

    /**
     * DRAG AND DROP HANDLERS
     * Adds visual feedback when dragging files over the upload area.
     */
    ['dragover', 'dragenter'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropZone.classList.add('active'); // Style defined in style.css
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropZone.classList.remove('active');
        });
    });

    /**
     * FILE DROP HANDLER
     */
    dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    });

    /**
     * FILE INPUT HANDLER (Click to browse)
     */
    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });

    /**
     * HANDLE FILES
     * Processes the selected image and displays a preview.
     */
    function handleFiles(files) {
        const file = files[0];
        
        // Ensure the file is an image
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = (e) => {
                // Update Image Preview
                imagePreview.src = e.target.result;
                
                // Toggle UI Visibility
                previewContainer.classList.remove('hidden');
                uploadPrompt.classList.add('hidden');
                
                // Enable the Analysis Button
                detectBtn.disabled = false;
                detectBtn.classList.remove('opacity-40', 'cursor-not-allowed');
                
                // Reset result panels to "waiting" state
                resultPlaceholder.classList.remove('hidden');
                resultContent.classList.add('hidden');
            };

            reader.readAsDataURL(file);
        } else {
            console.log("Please upload a valid image file.");
        }
    }

    /**
     * SYSTEM RESET
     * Clears the current image and resets the UI to the initial state.
     */
    resetBtn.addEventListener('click', () => {
        // Clear input value
        fileInput.value = '';
        
        // Hide preview and scanner
        previewContainer.classList.add('hidden');
        scanner.classList.add('hidden');
        
        // Show the original prompt
        uploadPrompt.classList.remove('hidden');
        
        // Disable detect button
        detectBtn.disabled = true;
        detectBtn.classList.add('opacity-40', 'cursor-not-allowed');
        detectBtn.innerHTML = '<i class="fas fa-microchip"></i><span>Analyze Item</span>';
        
        // Reset Result Panels
        resultPlaceholder.classList.remove('hidden');
        resultContent.classList.add('hidden');
        
        // Reset Progress Bar
        const confidenceBar = document.getElementById('confidence-bar');
        if (confidenceBar) confidenceBar.style.width = '0%';
    });
});