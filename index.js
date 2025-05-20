const socialProfiles = {
    facebook: 'https://www.facebook.com/unshreif',
    instagram: 'https://www.instagram.com/unshreif',
    linkedin: 'https://www.linkedin.com/in/unshreif',
    twitter: 'https://x.com/unshreif',
    github: 'https://github.com/unshreif',
    telegram: 'https://t.me/unshreif',
    email: 'mailto:unshreif@gmail.com'
};

const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        
        const spans = mobileMenuButton.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });
}

const mobileLinks = document.querySelectorAll('.mobile-link');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        
        const spans = mobileMenuButton.querySelectorAll('span');
        spans.forEach(span => span.classList.remove('active'));
    });
});

const navLinks = document.querySelectorAll('.nav-link, .mobile-link, .hero-buttons a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href;
            const targetElement = document.querySelector(targetId);
            
            if (targetId === '#contact') {
                const contactSection = document.querySelector('#contact');
                contactSection.classList.add('visible');
                
                setTimeout(() => {
                    window.scrollTo({
                        top: contactSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }, 100);
            } else if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === '#' + current || (href === '#' && current === 'home')) {
            link.classList.add('active');
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('FaceBook').addEventListener('click', () => {
        openSocialLink(socialProfiles.facebook);
    });
    
    document.getElementById('Instagram').addEventListener('click', () => {
        openSocialLink(socialProfiles.instagram);
    });
    
    document.getElementById('Linkedin').addEventListener('click', () => {
        openSocialLink(socialProfiles.linkedin);
    });
    
    document.getElementById('X').addEventListener('click', () => {
        openSocialLink(socialProfiles.twitter);
    });
    
    document.getElementById('github').addEventListener('click', () => {
        openSocialLink(socialProfiles.github);
    });
    
    document.getElementById('telegram').addEventListener('click', () => {
        openSocialLink(socialProfiles.telegram);
    });
    
    document.getElementById('mail').addEventListener('click', () => {
        openSocialLink(socialProfiles.email);
    });
    
    const socialButtons = document.querySelectorAll('.social-button');
    socialButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-5px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
});

function openSocialLink(url) {
    const card = document.querySelector('.card');
    card.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
        card.style.transform = 'scale(1)';
        window.open(url, '_blank');
    }, 200);
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

function updateOnlineStatus() {
    const isOnline = navigator.onLine;
    const socialButtons = document.querySelectorAll('.social-button');
    
    if (!isOnline) {
        socialButtons.forEach(button => {
            button.classList.add('offline');
            button.setAttribute('disabled', 'true');
            button.setAttribute('title', 'You are currently offline');
        });
        
        showNotification('You are currently offline. Some features may not be available.');
    } else {
        socialButtons.forEach(button => {
            button.classList.remove('offline');
            button.removeAttribute('disabled');
            button.removeAttribute('title');
        });
    }
}

function showNotification(message) {
    if (document.querySelector('.notification')) return;
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateY(-100%)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

updateOnlineStatus();

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    formStatus.style.display = 'block';
                    formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                    formStatus.style.color = 'var(--purple)';
                    contactForm.reset();
                    
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                } else {
                    formStatus.style.display = 'block';
                    formStatus.textContent = data.message || 'Something went wrong. Please try again.';
                    formStatus.style.color = '#e53e3e';
                }
            } catch (error) {
                formStatus.style.display = 'block';
                formStatus.textContent = 'Something went wrong. Please try again.';
                formStatus.style.color = '#e53e3e';
                console.error('Form submission error:', error);
            } finally {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
});

// Social media links configuration
const socialLinks = {
    facebook: 'https://facebook.com/unshreif',
    instagram: 'https://instagram.com/unshreif',
    twitter: 'https://twitter.com/unshreif',
    linkedin: 'https://linkedin.com/in/unshreif',
    telegram: 'https://t.me/unshreif',
    github: 'https://github.com/unshreif',
    email: 'mailto:unshreif@gmail.com',
    website: 'https://muhmdsamy.me'
};

// Initialize links
document.addEventListener('DOMContentLoaded', () => {
    // Add click event listeners to all link cards
    document.querySelectorAll('.link-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const platform = card.classList[1]; // Get the platform class (facebook, instagram, etc.)
            const url = socialLinks[platform];
            
            if (url) {
                // Open in new tab for external links
                if (platform !== 'email') {
                    e.preventDefault();
                    window.open(url, '_blank');
                }
            }
        });
    });

    // Add hover effect for better interactivity
    document.querySelectorAll('.link-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}
