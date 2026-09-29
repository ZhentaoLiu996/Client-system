document.addEventListener('DOMContentLoaded', () => {
    // Setup Search Filter for Course Selection
    const searchInput = document.getElementById('course-search');
    const courseLabels = document.querySelectorAll('#course-list .interactive-label');
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        courseLabels.forEach(label => {
            if (label.classList.contains('keep-visible')) return;
            
            const textContent = label.querySelector('.course-text').textContent.toLowerCase();
            if (textContent.includes(searchTerm)) {
                label.style.display = 'flex';
            } else {
                label.style.display = 'none';
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.dropdown-container')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });
});

// Navbar Dropdown Toggle function
function toggleDropdown(event, menuId) {
    event.preventDefault(); // Prevent page jump
    
    const targetMenu = document.getElementById(menuId);
    const isShowing = targetMenu.classList.contains('show');
    
    // Hide all dropdowns first
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('show');
    });
    
    // If the clicked one wasn't showing, show it
    if (!isShowing) {
        targetMenu.classList.add('show');
    }
}

function goToPage(pageNumber) {
    const pages = document.querySelectorAll('.page-step');
    
    // Page Transition Animation
    pages.forEach(page => {
        if (page.classList.contains('active')) {
            page.style.opacity = '0';
            page.style.transform = 'translateY(15px)';
            
            setTimeout(() => {
                page.classList.remove('active');
                
                const targetPage = document.getElementById('page-' + pageNumber);
                targetPage.classList.add('active');
                
                setTimeout(() => {
                    targetPage.style.opacity = '1';
                    targetPage.style.transform = 'translateY(0)';
                }, 50);

            }, 300); 
        }
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function submitAudit() {
    const confirmCheckbox = document.getElementById('confirm-checkbox');
    
    if (!confirmCheckbox.checked) {
        alert("Please confirm your responses by checking the box before submitting.");
        return;
    }

    goToPage(7);
    
    // Trigger Purple Achievement Badge Animation
    setTimeout(() => {
        const ring = document.querySelector('.badge-ring');
        const inner = document.querySelector('.badge-inner');
        const check = document.querySelector('.badge-check');
        
        // Reset
        ring.classList.remove('animate-ring');
        inner.classList.remove('animate-inner');
        check.classList.remove('animate-check');
        
        void ring.offsetWidth; // Reflow
        
        // Animate
        ring.classList.add('animate-ring');
        inner.classList.add('animate-inner');
        check.classList.add('animate-check');
    }, 400); 
}