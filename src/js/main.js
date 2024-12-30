import { useState, useEffect } from 'react';

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
// let lastScroll = 0;
// window.addEventListener('scroll', () => {
//     const navbar = document.querySelector('.navbar');
//     const currentScroll = window.pageYOffset;
    
//     if (currentScroll > lastScroll) {
//         navbar.style.transform = 'translateY(-100%)';
//     } else {
//         navbar.style.transform = 'translateY(0)';
//     }
//     lastScroll = currentScroll;
// });

// Form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Add scroll reveal animations
const revealElements = document.querySelectorAll('.education-item, .skill-category');
const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
};

// Vertical Navigation functionality
document.addEventListener('DOMContentLoaded', () => {
    const verticalNav = document.querySelector('.vertical-nav');
    const sections = document.querySelectorAll('section[id]');
    const navHeight = document.querySelector('.navbar').offsetHeight;

    // Show/hide vertical nav based on scroll position
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Show vertical nav after scrolling past the navbar
        if (scrollY > navHeight) {
            verticalNav.style.display = 'block';
        } else {
            verticalNav.style.display = 'none';
        }

        // Update active section in vertical nav
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.vertical-nav a[href*=${sectionId}]`).classList.add('active');
            } else {
                document.querySelector(`.vertical-nav a[href*=${sectionId}]`).classList.remove('active');
            }
        });
    });

    // Smooth scroll for vertical nav links
    document.querySelectorAll('.vertical-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const targetPosition = targetSection.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
});

// Theme toggling
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial theme based on user preference
    if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
        
        // Save preference
        localStorage.setItem('theme', newTheme);
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    const performSearch = () => {
        const searchTerm = searchInput.value.toLowerCase();
        // Add your search logic here
        console.log('Searching for:', searchTerm);
    };

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});

const ScrollIndicator = () => {
  const [activeSection, setActiveSection] = useState(0);

  // Define your sections - adjust these based on your actual sections
  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Find which section is currently in view
      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Consider a section "active" when it takes up most of the viewport
          if (rect.top <= windowHeight / 3 && rect.bottom >= windowHeight / 3) {
            setActiveSection(index);
          }
        }
      });
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDotClick = (index) => {
    const element = document.getElementById(sections[index].id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="vertical-nav">
      <ul>
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={activeSection === index ? 'active' : ''}
              data-tooltip={section.label}
              onClick={(e) => {
                e.preventDefault();
                handleDotClick(index);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScrollIndicator;

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu functionality
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    // Toggle menu when button is clicked
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent click from immediately closing menu
      navLinks.classList.toggle('active');
      
      // Optionally change icon
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
        
        // Reset icon
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        
        // Reset icon
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }
});

window.addEventListener('scroll', revealOnScroll);