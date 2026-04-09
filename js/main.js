/* ============================================
   HYDE PARK INTERNATIONAL — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================
  // STICKY NAVIGATION
  // ========================================
  const nav = document.getElementById('nav');
  
  function handleNavScroll() {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ========================================
  // MOBILE HAMBURGER MENU
  // ========================================
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav when a link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ========================================
  // SCROLL REVEAL ANIMATIONS
  // ========================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ========================================
  // FLOATING CTA VISIBILITY
  // ========================================
  const floatingCta = document.getElementById('floatingCta');
  
  if (floatingCta) {
    const floatingObserver = new IntersectionObserver((entries) => {
      // Show floating CTA when hero is out of view
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          floatingCta.classList.add('visible');
        } else {
          floatingCta.classList.remove('visible');
        }
      });
    }, { threshold: 0 });

    const hero = document.querySelector('.hero');
    if (hero) {
      floatingObserver.observe(hero);
    } else {
      // If no hero, show immediately after scroll
      floatingCta.classList.add('visible');
    }
  }

  // ========================================
  // MODAL SYSTEM
  // ========================================
  const enquiryModal = document.getElementById('enquiryModal');

  function openModal() {
    if (enquiryModal) {
      enquiryModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (enquiryModal) {
      enquiryModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // Open modal triggers
  document.querySelectorAll('[data-modal="enquiry"]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  // Close modal triggers
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  // Close on overlay click
  if (enquiryModal) {
    enquiryModal.addEventListener('click', (e) => {
      if (e.target === enquiryModal) {
        closeModal();
      }
    });
  }

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // ========================================
  // FORM HANDLING
  // ========================================
  function handleFormSubmit(form, successCallback) {
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(field => {
        // Remove previous error styling
        field.style.borderColor = '';
        
        if (!field.value.trim()) {
          field.style.borderColor = '#e74c3c';
          isValid = false;
        }

        // Email validation
        if (field.type === 'email' && field.value.trim()) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(field.value.trim())) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
          }
        }
      });

      if (!isValid) return;

      // Simulate submission
      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = 'Sent Successfully ✓';
        submitBtn.style.backgroundColor = 'var(--color-gold)';
        submitBtn.style.borderColor = 'var(--color-gold)';
        
        if (successCallback) {
          successCallback();
        } else {
          setTimeout(() => {
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '';
            submitBtn.style.borderColor = '';
            closeModal();
          }, 2000);
        }
      }, 1000);
    });
  }

  // Enquiry Modal Form
  handleFormSubmit(document.getElementById('enquiryForm'));

  // Contact Page Form
  handleFormSubmit(document.getElementById('contactForm'));

  // Family Enquiry Form
  handleFormSubmit(document.getElementById('familyForm'));

  // Candidate Registration Form
  const candidateForm = document.getElementById('candidateForm');
  const candidateFormCard = document.getElementById('candidateFormCard');
  const candidateConfirmation = document.getElementById('candidateConfirmation');

  handleFormSubmit(candidateForm, () => {
    if (candidateFormCard && candidateConfirmation) {
      candidateFormCard.style.opacity = '0';
      candidateFormCard.style.transform = 'translateY(-20px)';
      candidateFormCard.style.transition = 'all 0.4s ease';
      
      setTimeout(() => {
        candidateFormCard.classList.add('hidden');
        candidateConfirmation.classList.remove('hidden');
        candidateConfirmation.style.opacity = '0';
        candidateConfirmation.style.transform = 'translateY(20px)';
        candidateConfirmation.style.transition = 'all 0.4s ease';
        
        requestAnimationFrame(() => {
          candidateConfirmation.style.opacity = '1';
          candidateConfirmation.style.transform = 'translateY(0)';
        });
      }, 400);
    }
  });

  // ========================================
  // FILE UPLOAD INTERACTIONS
  // ========================================
  const fileUpload = document.getElementById('fileUpload');
  const fileInput = document.getElementById('c-cv');

  if (fileUpload && fileInput) {
    fileUpload.addEventListener('click', () => {
      fileInput.click();
    });

    fileUpload.addEventListener('dragover', (e) => {
      e.preventDefault();
      fileUpload.style.borderColor = 'var(--color-gold)';
      fileUpload.style.backgroundColor = 'var(--color-navy-light)';
    });

    fileUpload.addEventListener('dragleave', () => {
      fileUpload.style.borderColor = '';
      fileUpload.style.backgroundColor = '';
    });

    fileUpload.addEventListener('drop', (e) => {
      e.preventDefault();
      fileUpload.style.borderColor = '';
      fileUpload.style.backgroundColor = '';
      
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        fileInput.files = files;
        updateFileUploadDisplay(files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        updateFileUploadDisplay(fileInput.files[0]);
      }
    });

    function updateFileUploadDisplay(file) {
      const textEl = fileUpload.querySelector('.file-upload__text');
      const hintEl = fileUpload.querySelector('.file-upload__hint');
      if (textEl) textEl.innerHTML = `<strong>${file.name}</strong>`;
      if (hintEl) hintEl.textContent = `${(file.size / 1024 / 1024).toFixed(2)} MB`;
      fileUpload.style.borderColor = 'var(--color-gold)';
    }
  }

  // ========================================
  // VACANCY FILTERING
  // ========================================
  const filterBtn = document.getElementById('filterBtn');
  const filterLocation = document.getElementById('filterLocation');
  const filterRole = document.getElementById('filterRole');
  const filterArrangement = document.getElementById('filterArrangement');
  const vacancyList = document.getElementById('vacancyList');
  const noResults = document.getElementById('noResults');

  if (filterBtn && vacancyList) {
    filterBtn.addEventListener('click', filterVacancies);
    
    // Also filter on select change
    [filterLocation, filterRole, filterArrangement].forEach(select => {
      if (select) {
        select.addEventListener('change', filterVacancies);
      }
    });
  }

  function filterVacancies() {
    const location = filterLocation ? filterLocation.value : '';
    const role = filterRole ? filterRole.value : '';
    const arrangement = filterArrangement ? filterArrangement.value : '';

    const cards = vacancyList.querySelectorAll('.vacancy-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const cardLocation = card.dataset.location || '';
      const cardRole = card.dataset.role || '';
      const cardArrangement = card.dataset.arrangement || '';

      const matchLocation = !location || cardLocation === location;
      const matchRole = !role || cardRole === role;
      const matchArrangement = !arrangement || cardArrangement === arrangement;

      if (matchLocation && matchRole && matchArrangement) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResults) {
      if (visibleCount === 0) {
        noResults.classList.remove('hidden');
      } else {
        noResults.classList.add('hidden');
      }
    }
  }

  // ========================================
  // STAT COUNTER ANIMATION
  // ========================================
  const statNumbers = document.querySelectorAll('.stat__number');
  
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStatNumber(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statObserver.observe(el));

  function animateStatNumber(el) {
    const text = el.textContent;
    const match = text.match(/^([\d,]+)/);
    if (!match) return;
    
    const target = parseInt(match[1].replace(/,/g, ''), 10);
    const suffix = text.replace(match[1], '');
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      
      el.textContent = current.toLocaleString() + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.includes('modal')) return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========================================
  // FORM FIELD FOCUS EFFECTS
  // ========================================
  document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(field => {
    field.addEventListener('focus', () => {
      field.style.borderColor = 'var(--color-gold)';
    });
    
    field.addEventListener('blur', () => {
      if (!field.value) {
        field.style.borderColor = '';
      }
    });
  });

});
