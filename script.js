/* ============================================================
   MUZAFFARGARH SKILLS ACADEMY - MAIN JAVASCRIPT
   script.js
   ============================================================ */

// ==================== DARK MODE ====================

// Get the dark mode toggle button from the page
var darkModeToggle = document.getElementById('darkModeToggle');
var darkModeIcon = document.getElementById('darkModeIcon');

// This function switches between dark and light mode
function toggleDarkMode() {
  // Check if dark mode is currently ON
  var isDark = document.body.classList.contains('dark-mode');

  if (isDark) {
    // Switch to light mode
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');

    // Change icon to moon (dark mode available)
    darkModeIcon.className = 'fas fa-moon';

    // Save the preference in localStorage so it persists after refresh
    localStorage.setItem('theme', 'light');
  } else {
    // Switch to dark mode
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');

    // Change icon to sun (back to light mode available)
    darkModeIcon.className = 'fas fa-sun';

    // Save the preference in localStorage
    localStorage.setItem('theme', 'dark');
  }
}

// When the page loads, check if the user has a saved preference
function loadSavedTheme() {
  // Get the saved theme from localStorage
  var savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    // Apply dark mode
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    // Update the icon
    if (darkModeIcon) {
      darkModeIcon.className = 'fas fa-sun';
    }
  } else {
    // Default: light mode
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    if (darkModeIcon) {
      darkModeIcon.className = 'fas fa-moon';
    }
  }
}

// Attach click event to the dark mode toggle button
if (darkModeToggle) {
  darkModeToggle.addEventListener('click', toggleDarkMode);
}

// ==================== HAMBURGER MENU ====================

var hamburgerBtn = document.getElementById('hamburgerBtn');
var mobileNav = document.getElementById('mobileNav');
var mobileLinks = document.querySelectorAll('.nav-mobile-link, .nav-mobile-apply');

// Open or close the mobile navigation menu
function toggleMobileMenu() {
  // Check if the menu is currently open
  var isOpen = mobileNav.classList.contains('open');

  if (isOpen) {
    // Close the menu
    mobileNav.classList.remove('open');
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
  } else {
    // Open the menu
    mobileNav.classList.add('open');
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
  }
}

// Close the menu when a navigation link is clicked
function closeMobileMenu() {
  mobileNav.classList.remove('open');
  hamburgerBtn.classList.remove('active');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  mobileNav.setAttribute('aria-hidden', 'true');
}

// Attach hamburger click event
if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', toggleMobileMenu);
}

// Attach click events to all mobile nav links
mobileLinks.forEach(function(link) {
  link.addEventListener('click', closeMobileMenu);
});

// ==================== SMOOTH SCROLLING ====================

// Handle smooth scrolling for all anchor links that start with #
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(event) {
    var targetId = this.getAttribute('href');
    // Make sure it is a valid section ID
    if (targetId === '#') return;

    var targetElement = document.querySelector(targetId);
    if (targetElement) {
      event.preventDefault();
      // Scroll smoothly to the target section
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ==================== ACTIVE NAV LINK ON SCROLL ====================

// Highlight the correct nav link as you scroll through sections
function updateActiveNavLink() {
  var sections = document.querySelectorAll('section[id], .hero[id]');
  var navLinks = document.querySelectorAll('.nav-link');
  var scrollPos = window.scrollY + 100;

  sections.forEach(function(section) {
    var sectionTop = section.offsetTop;
    var sectionHeight = section.offsetHeight;
    var sectionId = section.getAttribute('id');

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      // Remove active class from all links
      navLinks.forEach(function(link) {
        link.classList.remove('active');
      });
      // Add active class to matching link
      var activeLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

// ==================== ELIGIBILITY CHECKER ====================

// Monthly fees for each course
var courseFees = {
  'Web Development': 5000,
  'Graphic Design': 4000,
  'Advanced & Agentic AI': 7000,
  'Freelancing': 3500
};

// This function checks if a student is eligible for admission
function checkEligibility() {
  // Get values from the form inputs
  var studentName = document.getElementById('studentName').value.trim();
  var marksInput = document.getElementById('studentMarks').value.trim();
  var selectedCourse = document.getElementById('eligibilityCourse').value;

  // Get error message elements
  var nameError = document.getElementById('nameError');
  var marksError = document.getElementById('marksError');
  var courseError = document.getElementById('courseError');
  var resultBox = document.getElementById('eligibilityResult');

  // Clear previous errors and result
  nameError.textContent = '';
  marksError.textContent = '';
  courseError.textContent = '';
  resultBox.innerHTML = '';

  // Remove error styling from inputs
  document.getElementById('studentName').classList.remove('error-state');
  document.getElementById('studentMarks').classList.remove('error-state');
  document.getElementById('eligibilityCourse').classList.remove('error-state');

  // Track if form is valid
  var isValid = true;

  // --- VALIDATION: Check student name ---
  if (studentName === '') {
    nameError.textContent = 'Please enter your name.';
    document.getElementById('studentName').classList.add('error-state');
    isValid = false;
  }

  // --- VALIDATION: Check marks ---
  var marks = parseFloat(marksInput);

  if (marksInput === '') {
    marksError.textContent = 'Please enter your marks.';
    document.getElementById('studentMarks').classList.add('error-state');
    isValid = false;
  } else if (isNaN(marks)) {
    marksError.textContent = 'Marks must be a number.';
    document.getElementById('studentMarks').classList.add('error-state');
    isValid = false;
  } else if (marks < 0 || marks > 100) {
    marksError.textContent = 'Marks must be between 0 and 100.';
    document.getElementById('studentMarks').classList.add('error-state');
    isValid = false;
  }

  // --- VALIDATION: Check course selection ---
  if (selectedCourse === '') {
    courseError.textContent = 'Please select a course.';
    document.getElementById('eligibilityCourse').classList.add('error-state');
    isValid = false;
  }

  // If any validation failed, stop here
  if (!isValid) return;

  // --- ELIGIBILITY LOGIC ---
  // Based on the marks, decide admission status

  var resultHTML = '';

  if (marks >= 70) {
    // Direct Admission
    resultHTML = '<div class="result-direct">' +
      '<div class="result-icon">🎉</div>' +
      '<span class="result-status-badge">✓ Direct Admission</span>' +
      '<h4 class="result-heading">Congratulations ' + studentName + '!</h4>' +
      '<p class="result-message">You are eligible for <strong>Direct Admission</strong> into <strong>' + selectedCourse + '</strong>. Your marks of <strong>' + marks + '%</strong> qualify you for immediate enrollment.</p>' +
      '</div>';

  } else if (marks >= 50 && marks < 70) {
    // Eligible but counselling recommended
    resultHTML = '<div class="result-counselling">' +
      '<div class="result-icon">📋</div>' +
      '<span class="result-status-badge">⚠ Counselling Recommended</span>' +
      '<h4 class="result-heading">Hello ' + studentName + '!</h4>' +
      '<p class="result-message">You are eligible for <strong>' + selectedCourse + '</strong>, but <strong>counselling is recommended</strong>. Your marks of <strong>' + marks + '%</strong> qualify you for admission with additional guidance from our team.</p>' +
      '</div>';

  } else {
    // Below 50: Contact counsellor
    resultHTML = '<div class="result-contact">' +
      '<div class="result-icon">📞</div>' +
      '<span class="result-status-badge">✕ Contact Required</span>' +
      '<h4 class="result-heading">Hello ' + studentName + '!</h4>' +
      '<p class="result-message">Your marks of <strong>' + marks + '%</strong> are below the standard eligibility threshold. Please <strong>contact our admission counsellor</strong> for personalised guidance. Call: <a href="tel:03128602440" style="color:inherit;font-weight:700;">03128602440</a></p>' +
      '</div>';
  }

  // Display the result
  resultBox.innerHTML = resultHTML;

  // Scroll the result into view so the user can see it
  resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ==================== FEE CALCULATOR ====================

// This function calculates the total course fee
function calculateFee() {
  // Get values from the fee calculator form
  var selectedCourse = document.getElementById('feeCourse').value;
  var monthsInput = document.getElementById('feeMonths').value.trim();

  // Get error elements
  var feeCourseError = document.getElementById('feeCourseError');
  var feeMonthsError = document.getElementById('feeMonthsError');
  var feeResultBox = document.getElementById('feeResult');

  // Clear previous errors and results
  feeCourseError.textContent = '';
  feeMonthsError.textContent = '';
  feeResultBox.innerHTML = '';

  // Remove error styling
  document.getElementById('feeCourse').classList.remove('error-state');
  document.getElementById('feeMonths').classList.remove('error-state');

  var isValid = true;

  // --- VALIDATION: Check course ---
  if (selectedCourse === '') {
    feeCourseError.textContent = 'Please select a course.';
    document.getElementById('feeCourse').classList.add('error-state');
    isValid = false;
  }

  // --- VALIDATION: Check months ---
  var numberOfMonths = parseFloat(monthsInput);

  if (monthsInput === '') {
    feeMonthsError.textContent = 'Please enter the number of months.';
    document.getElementById('feeMonths').classList.add('error-state');
    isValid = false;
  } else if (isNaN(numberOfMonths)) {
    feeMonthsError.textContent = 'Please enter a valid number.';
    document.getElementById('feeMonths').classList.add('error-state');
    isValid = false;
  } else if (numberOfMonths <= 0) {
    feeMonthsError.textContent = 'Months must be greater than 0.';
    document.getElementById('feeMonths').classList.add('error-state');
    isValid = false;
  } else if (!Number.isInteger(numberOfMonths)) {
    feeMonthsError.textContent = 'Please enter a whole number (e.g. 1, 3, 6, 12).';
    document.getElementById('feeMonths').classList.add('error-state');
    isValid = false;
  }

  // Stop if validation failed
  if (!isValid) return;

  // --- FEE CALCULATION LOGIC ---

  // Get the monthly fee for the selected course
  var monthlyFee = courseFees[selectedCourse];

  // Calculate original fee (before discount)
  var originalFee = monthlyFee * numberOfMonths;

  // Determine the discount percentage based on number of months
  var discountPercentage = 0;

  if (numberOfMonths === 3) {
    discountPercentage = 5; // 5% discount for exactly 3 months
  } else if (numberOfMonths >= 6) {
    discountPercentage = 10; // 10% discount for 6 or more months
  }
  // Otherwise: 0% discount

  // Calculate discount amount
  var discountAmount = (originalFee * discountPercentage) / 100;

  // Calculate final fee after discount
  var finalFee = originalFee - discountAmount;

  // Format the discount label
  var discountLabel = discountPercentage > 0
    ? discountPercentage + '% discount applied!'
    : 'No discount for this duration';

  // Build the result HTML to display
  var feeResultHTML =
    '<div class="fee-result-card">' +
      '<div class="fee-result-title"><i class="fas fa-receipt"></i> Fee Breakdown</div>' +

      '<div class="fee-result-row">' +
        '<span class="fee-result-label">Course</span>' +
        '<span class="fee-result-value">' + selectedCourse + '</span>' +
      '</div>' +

      '<div class="fee-result-row">' +
        '<span class="fee-result-label">Monthly Fee</span>' +
        '<span class="fee-result-value">Rs. ' + formatNumber(monthlyFee) + '</span>' +
      '</div>' +

      '<div class="fee-result-row">' +
        '<span class="fee-result-label">Duration</span>' +
        '<span class="fee-result-value">' + numberOfMonths + ' Month' + (numberOfMonths > 1 ? 's' : '') + '</span>' +
      '</div>' +

      '<div class="fee-result-row">' +
        '<span class="fee-result-label">Original Fee</span>' +
        '<span class="fee-result-value">Rs. ' + formatNumber(originalFee) + '</span>' +
      '</div>' +

      '<div class="fee-result-row discount-row">' +
        '<span class="fee-result-label">Discount</span>' +
        '<span class="fee-result-value">' + discountPercentage + '% ' + (discountPercentage > 0 ? '🎁' : '') + '</span>' +
      '</div>' +

      '<div class="fee-result-row discount-row">' +
        '<span class="fee-result-label">Discount Amount</span>' +
        '<span class="fee-result-value">- Rs. ' + formatNumber(discountAmount) + '</span>' +
      '</div>' +

      '<div class="fee-result-final">' +
        '<span class="fee-result-final-label">Final Payable Fee</span>' +
        '<span class="fee-result-final-amount">Rs. ' + formatNumber(finalFee) + '</span>' +
      '</div>' +
    '</div>';

  // Display the result
  feeResultBox.innerHTML = feeResultHTML;

  // Scroll result into view
  feeResultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Helper function: formats a number with commas (e.g. 14250 → 14,250)
function formatNumber(number) {
  return number.toLocaleString('en-PK');
}

// ==================== CONTACT FORM ====================

// This function validates the contact form before submission
function validateContactForm() {
  // Get form input values
  var contactName = document.getElementById('contactName').value.trim();
  var contactEmail = document.getElementById('contactEmail').value.trim();
  var contactMessage = document.getElementById('contactMessage').value.trim();

  // Get error elements
  var contactNameError = document.getElementById('contactNameError');
  var contactEmailError = document.getElementById('contactEmailError');
  var contactMessageError = document.getElementById('contactMessageError');
  var contactSuccess = document.getElementById('contactSuccess');
  var contactForm = document.getElementById('contactForm');

  // Clear previous errors
  contactNameError.textContent = '';
  contactEmailError.textContent = '';
  contactMessageError.textContent = '';

  // Remove error styling
  document.getElementById('contactName').classList.remove('error-state');
  document.getElementById('contactEmail').classList.remove('error-state');
  document.getElementById('contactMessage').classList.remove('error-state');

  // Hide success message if previously shown
  contactSuccess.style.display = 'none';

  var isValid = true;

  // --- VALIDATION: Name ---
  if (contactName === '') {
    contactNameError.textContent = 'Please enter your name.';
    document.getElementById('contactName').classList.add('error-state');
    isValid = false;
  }

  // --- VALIDATION: Email ---
  if (contactEmail === '') {
    contactEmailError.textContent = 'Please enter your email address.';
    document.getElementById('contactEmail').classList.add('error-state');
    isValid = false;
  } else if (!isValidEmail(contactEmail)) {
    // Check if email format is correct using a simple pattern check
    contactEmailError.textContent = 'Please enter a valid email address (e.g. name@example.com).';
    document.getElementById('contactEmail').classList.add('error-state');
    isValid = false;
  }

  // --- VALIDATION: Message ---
  if (contactMessage === '') {
    contactMessageError.textContent = 'Please write your message.';
    document.getElementById('contactMessage').classList.add('error-state');
    isValid = false;
  }

  // If validation passed, show success message
  if (isValid) {
    // Hide the form and show success
    contactForm.style.display = 'none';
    contactSuccess.style.display = 'block';

    // Scroll to success message
    contactSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// Helper function: checks if an email address format is valid
function isValidEmail(email) {
  // Simple but effective email format check
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// ==================== FAQ ACCORDION ====================

// Get all FAQ question buttons
var faqButtons = document.querySelectorAll('.faq-question');

// Add click events to each FAQ question
faqButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    // Find the answer panel linked to this button
    var answerId = this.getAttribute('aria-controls');
    var answerPanel = document.getElementById(answerId);

    // Check if this item is already open
    var isCurrentlyOpen = this.getAttribute('aria-expanded') === 'true';

    // Close ALL open FAQ items first (accordion behavior: only one open at a time)
    faqButtons.forEach(function(otherButton) {
      var otherAnswerId = otherButton.getAttribute('aria-controls');
      var otherPanel = document.getElementById(otherAnswerId);

      otherButton.setAttribute('aria-expanded', 'false');
      if (otherPanel) {
        otherPanel.classList.remove('open');
      }
    });

    // If the clicked item was NOT already open, open it now
    if (!isCurrentlyOpen) {
      this.setAttribute('aria-expanded', 'true');
      answerPanel.classList.add('open');
    }
  });
});

// ==================== VIEW COURSE BUTTONS ====================

// Smooth scroll to the admissions section when "View Course" is clicked
document.querySelectorAll('.view-course-btn').forEach(function(btn) {
  btn.addEventListener('click', function(event) {
    event.preventDefault();
    var admissionsSection = document.getElementById('admissions');
    if (admissionsSection) {
      admissionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ==================== PAGE INITIALIZATION ====================

// Run these functions when the page first loads
document.addEventListener('DOMContentLoaded', function() {
  // Restore the saved dark/light mode preference
  loadSavedTheme();

  // Set initial active nav link
  updateActiveNavLink();
});

// Also run loadSavedTheme immediately (before DOMContentLoaded fires)
// to prevent flash of unstyled content
loadSavedTheme();
