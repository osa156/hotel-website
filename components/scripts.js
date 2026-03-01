/* ============================================
COMPONENTS/SCRIPTS.JS - Main JavaScript
Reusable Functionality & Interactions
============================================ */
document.addEventListener('DOMContentLoaded', function() {
// Initialize all components
initNavigation();
initScrollEffects();
initGallery();
initForms();
initRoomFilters();
initTestimonials();
});
/* Navigation Component */
function initNavigation() {
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = mobileToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu when clicking on a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

}
/* Scroll Animations */
function initScrollEffects() {
const observerOptions = {
threshold: 0.1,
rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .room-card, .treatment-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

}
/* Gallery Functionality */
function initGallery() {
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
// Filter functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

}
/* Lightbox Functions */
let currentImageIndex = 0;
let galleryImages = [];
function openLightbox(btn) {
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const galleryGrid = document.getElementById('galleryGrid');
// Get all visible images
galleryImages = Array.from(galleryGrid.querySelectorAll('.gallery-item:not([style*="display: none"]) img'));

// Find clicked image index
const clickedImg = btn.closest('.gallery-item').querySelector('img');
currentImageIndex = galleryImages.findIndex(img => img.src === clickedImg.src);

lightboxImage.src = clickedImg.src;
lightbox.classList.add('active');
document.body.style.overflow = 'hidden';

}
function closeLightbox() {
const lightbox = document.getElementById('lightbox');
lightbox.classList.remove('active');
document.body.style.overflow = '';
}
function changeLightboxImage(direction) {
const lightboxImage = document.getElementById('lightboxImage');
currentImageIndex += direction;

if (currentImageIndex >= galleryImages.length) {
    currentImageIndex = 0;
} else if (currentImageIndex < 0) {
    currentImageIndex = galleryImages.length - 1;
}

lightboxImage.style.opacity = '0';
setTimeout(() => {
    lightboxImage.src = galleryImages[currentImageIndex].src;
    lightboxImage.style.opacity = '1';
}, 200);

}
// Close lightbox on escape key
document.addEventListener('keydown', (e) => {
if (e.key === 'Escape') closeLightbox();
if (e.key === 'ArrowLeft') changeLightboxImage(-1);
if (e.key === 'ArrowRight') changeLightboxImage(1);
});
/* Room Gallery (Room Details Page) */
function setImage(thumb) {
const mainImage = document.getElementById('mainImage');
const thumbs = document.querySelectorAll('.gallery-thumbs img');
mainImage.style.opacity = '0';
setTimeout(() => {
    mainImage.src = thumb.src.replace('w=400', 'w=1200');
    mainImage.style.opacity = '1';
}, 200);

thumbs.forEach(t => t.classList.remove('active'));
thumb.classList.add('active');

}
function changeImage(direction) {
const thumbs = document.querySelectorAll('.gallery-thumbs img');
const current = document.querySelector('.gallery-thumbs img.active');
let index = Array.from(thumbs).indexOf(current);
index += direction;
if (index >= thumbs.length) index = 0;
if (index < 0) index = thumbs.length - 1;

setImage(thumbs[index]);

}
/* Form Handling */
function initForms() {
// Booking form
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
bookingForm.addEventListener('submit', handleBookingSubmit);
}
// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
}

// Date validation
const checkinInput = document.querySelector('input[name="checkin"]');
const checkoutInput = document.querySelector('input[name="checkout"]');

if (checkinInput && checkoutInput) {
    const today = new Date().toISOString().split('T')[0];
    checkinInput.min = today;
    
    checkinInput.addEventListener('change', () => {
        checkoutInput.min = checkinInput.value;
        if (checkoutInput.value && checkoutInput.value <= checkinInput.value) {
            checkoutInput.value = '';
        }
    });
}

}
function handleBookingSubmit(e) {
e.preventDefault();
// Simulate booking processing
const submitBtn = e.target.querySelector('button[type="submit"]');
const originalText = submitBtn.innerHTML;

submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
submitBtn.disabled = true;

setTimeout(() => {
    window.location.href = 'confirmation.html';
}, 1500);

}
function handleContactSubmit(e) {
e.preventDefault();
const submitBtn = e.target.querySelector('button[type="submit"]');
const originalText = submitBtn.textContent;

submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
submitBtn.disabled = true;

setTimeout(() => {
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    submitBtn.style.background = '#48bb78';
    
    setTimeout(() => {
        e.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
    }, 2000);
}, 1500);

}
/* Room Filters */
function initRoomFilters() {
const filterType = document.getElementById('filterType');
const filterPrice = document.getElementById('filterPrice');
const sortBy = document.getElementById('sortBy');
const roomCards = document.querySelectorAll('.room-card-horizontal');
function filterRooms() {
    const type = filterType ? filterType.value : 'all';
    const price = filterPrice ? filterPrice.value : 'all';
    
    roomCards.forEach(card => {
        const cardType = card.getAttribute('data-type');
        const cardPrice = parseInt(card.getAttribute('data-price'));
        let show = true;
        
        if (type !== 'all' && cardType !== type) show = false;
        
        if (price !== 'all') {
            if (price === 'low' && cardPrice > 300) show = false;
            if (price === 'medium' && (cardPrice <= 300 || cardPrice > 600)) show = false;
            if (price === 'high' && cardPrice <= 600) show = false;
        }
        
        card.style.display = show ? 'grid' : 'none';
    });
    
    // Sort if needed
    if (sortBy && sortBy.value !== 'recommended') {
        const container = document.querySelector('.rooms-grid');
        const cards = Array.from(roomCards).filter(c => c.style.display !== 'none');
        
        cards.sort((a, b) => {
            const priceA = parseInt(a.getAttribute('data-price'));
            const priceB = parseInt(b.getAttribute('data-price'));
            
            if (sortBy.value === 'price-low') return priceA - priceB;
            if (sortBy.value === 'price-high') return priceB - priceA;
            return 0;
        });
        
        cards.forEach(card => container.appendChild(card));
    }
}

if (filterType) filterType.addEventListener('change', filterRooms);
if (filterPrice) filterPrice.addEventListener('change', filterRooms);
if (sortBy) sortBy.addEventListener('change', filterRooms);

}
/* Testimonials Slider */
function initTestimonials() {
const slider = document.getElementById('testimonialSlider');
if (!slider) return;
const testimonials = [
    {
        text: "An absolutely magical experience. The attention to detail and service quality exceeded all expectations. We can't wait to return.",
        author: "Sarah Johnson",
        location: "New York, USA",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
        rating: 5
    },
    {
        text: "The spa treatments were heavenly and the dining experience was world-class. This is now our go-to destination for relaxation.",
        author: "Michael Chen",
        location: "Singapore",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
        rating: 5
    },
    {
        text: "Perfect for our anniversary. The staff went above and beyond to make our stay special. The ocean view room was breathtaking.",
        author: "Emma Williams",
        location: "London, UK",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
        rating: 5
    }
];

let currentTestimonial = 0;

function showTestimonial(index) {
    const t = testimonials[index];
    const stars = Array(t.rating).fill('<i class="fas fa-star"></i>').join('');
    
    slider.innerHTML = `
        <div class="testimonial-card fade-in">
            <div class="testimonial-rating">${stars}</div>
            <p class="testimonial-text">"${t.text}"</p>
            <div class="testimonial-author">
                <img src="${t.image}" alt="${t.author}">
                <div>
                    <h4>${t.author}</h4>
                    <span>${t.location}</span>
                </div>
            </div>
        </div>
    `;
}

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

}
/* Smooth Scroll for Anchor Links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault();
const target = document.querySelector(this.getAttribute('href'));
if (target) {
target.scrollIntoView({
behavior: 'smooth',
block: 'start'
});
}
});
});
/* Utility Functions */
function formatDate(date) {
return new Date(date).toLocaleDateString('en-US', {
month: 'long',
day: 'numeric',
year: 'numeric'
});
}
function calculateNights(checkin, checkout) {
const start = new Date(checkin);
const end = new Date(checkout);
const diffTime = Math.abs(end - start);
return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
// Expose functions globally for onclick handlers
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.changeLightboxImage = changeLightboxImage;
window.setImage = setImage;
window.changeImage = changeImage;
