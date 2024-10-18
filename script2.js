document.addEventListener('DOMContentLoaded', function() {
    const corpLinks = document.querySelectorAll('.corp-link');
    const corpSections = document.querySelectorAll('.corp-section');
    const corpBackgrounds = document.querySelectorAll('.corp-background');
    const fullscreenButton = document.getElementById('fullscreenButton');
    let isFullscreen = false;

    // City-related elements
    const cityLinks = document.querySelectorAll('.city-link');
    const citySections = document.querySelectorAll('.city-section');

    function hideAllSections() {
        corpSections.forEach(section => {
            section.style.display = 'none';
        });
        citySections.forEach(section => {
            section.style.display = 'none';
        });
    }

    function hideAllBackgrounds() {
        corpBackgrounds.forEach(bg => {
            bg.style.display = 'none';
        });
    }

    function playVideo(bgElement) {
        const video = bgElement.querySelector('video');
        if (video) {
            video.play().catch(e => console.log("Video play failed:", e));
        }
    }

    function toggleFullscreen() {
        isFullscreen = !isFullscreen;
        document.body.classList.toggle('fullscreen-mode', isFullscreen);
        fullscreenButton.textContent = isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen';
    }

    fullscreenButton.addEventListener('click', toggleFullscreen);

    corpLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const corpId = this.getAttribute('data-corp');
            
            hideAllSections();
            hideAllBackgrounds();
            
            const sectionToShow = document.getElementById(corpId);
            if (sectionToShow) {
                sectionToShow.style.display = 'block';
            }
            
            const bgElement = document.getElementById(`${corpId}-bg`);
            if (bgElement) {
                bgElement.style.display = 'block';
                playVideo(bgElement);
            }
        });
    });

    // City link event listeners
    cityLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const cityId = this.getAttribute('data-city');
            
            hideAllSections();
            hideAllBackgrounds();

            const selectedCity = document.getElementById(cityId);
            if (selectedCity) {
                selectedCity.style.display = 'block';
                
                // Ensure the city description is visible
                const cityDescription = selectedCity.querySelector('.city-description');
                if (cityDescription) {
                    cityDescription.style.display = 'block';
                }
                
                // Ensure the city image is visible
                const cityImage = selectedCity.querySelector('.city-image');
                if (cityImage) {
                    cityImage.style.display = 'block';
                }
            }
        });
    });

    // Show the first section and background by default
    if (corpSections.length > 0 && corpBackgrounds.length > 0) {
        corpSections[0].style.display = 'block';
        corpBackgrounds[0].style.display = 'block';
        playVideo(corpBackgrounds[0]);
    }
});