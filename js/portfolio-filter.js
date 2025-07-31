// Portfolio filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-blue-600', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-800');
            });
            
            this.classList.remove('bg-gray-200', 'text-gray-800');
            this.classList.add('active', 'bg-blue-600', 'text-white');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(',');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Initialize with 'all' filter
    const allButton = document.querySelector('[data-filter="all"]');
    if (allButton) {
        allButton.click();
    }

    // Add hover effects to portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Masonry-like layout adjustment
    function adjustLayout() {
        const container = document.querySelector('.grid');
        if (!container) return;
        
        const items = container.querySelectorAll('.portfolio-item:not([style*="display: none"])');
        items.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // Call layout adjustment after filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            setTimeout(adjustLayout, 100);
        });
    });

    // Initial layout adjustment
    adjustLayout();
});