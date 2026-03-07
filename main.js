/* =========================================
    Professional Portfolio JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ===========================
      EmailJS Init + Contact Form
  ============================ */
   emailjs.init("3Bhm3CcTLTnpDt4FD");

   const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const btn = contactForm.querySelector(".btn-send");
      btn.innerText = "Sending...";
      btn.disabled = true;

      emailjs.sendForm(
        "service_jgbcbff",
        "template_i3h9snp",
        this
      ).then(
        () => {
          btn.innerText = "Message Sent ✅";
          contactForm.reset();

          setTimeout(() => {
            btn.innerText = "Send Message";
            btn.disabled = false;
          }, 3000);
        },
        (error) => {
          console.error("EmailJS Error:", error);
          btn.innerText = "Failed ❌ Try Again";
          btn.disabled = false;
        }
      );
    });
  }


  /* ===========================
      Smooth Scroll (Navbar)
  ============================ */
  const navLinks = document.querySelectorAll(".ul-list li a");
  const sections = document.querySelectorAll("section");

  function removeActive() {
    document.querySelectorAll(".ul-list li").forEach(li => li.classList.remove("active"));
  }

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (!targetSection) return;

      const headerOffset = 90;
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      removeActive();
      link.parentElement.classList.add("active");
    });
  });


  /* ===========================
     ScrollSpy Active Link
  ============================ */
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        removeActive();
        const activeLink = document.querySelector(`.ul-list li a[href="#${id}"]`);
        if (activeLink) activeLink.parentElement.classList.add("active");
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(section => sectionObserver.observe(section));


  /* ===========================
     Reveal Animation
  ============================ */
  const revealElements = document.querySelectorAll(
    ".home-container, .about-container, .projects-container, .services-container, .contact-content"
  );

  revealElements.forEach(el => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active-reveal");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));


  /* ===========================
     Back To Top Button
  ============================ */
  const backToTop = document.createElement("button");
  backToTop.id = "back-to-top";
  backToTop.setAttribute("aria-label", "Back to top");
  backToTop.innerHTML = `<i class="fa-solid fa-chevron-up"></i>`;
  document.body.appendChild(backToTop);

  backToTop.style.cssText = `
    position: fixed;
    bottom: 35px;
    right: 35px;
    background: #474af0;
    color: white;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    cursor: pointer;
    z-index: 1000;
    border: none;
    outline: none;
    opacity: 0;
    pointer-events: none;
    transform: translateY(10px);
    transition: all 0.3s ease;
    box-shadow: 0 12px 30px rgba(0,0,0,0.15);
  `;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTop.style.opacity = "1";
      backToTop.style.pointerEvents = "auto";
      backToTop.style.transform = "translateY(0)";
    } else {
      backToTop.style.opacity = "0";
      backToTop.style.pointerEvents = "none";
      backToTop.style.transform = "translateY(10px)";
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });


  /* ===========================
      Typing Animation
  ============================ */
  const typingElement = document.querySelector(".info-home h3");

  if (typingElement) {
    const words = [
      "Full-Stack Developer",
      "Backend Developer",
      "Frontend Developer",
      "UI/UX Developer"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentWord = words[wordIndex];
      const currentText = currentWord.substring(0, charIndex);

      typingElement.innerHTML = `${currentText}<span class="cursor">|</span>`;

      if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(typeEffect, 90);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 45);
      } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
          wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(typeEffect, 900);
      }
    }

    typeEffect();
  }


  /* ===========================
      Loading Screen Animation
  ============================ */
  const loadingScreen = document.getElementById("loading-screen");

  if (loadingScreen) {
    const loadingText = document.getElementById("loading-text");
    const mainIcon = document.querySelector(".main-icon");
    const subIcons = document.querySelectorAll(".sub-icons i");
    const designerText = document.getElementById("designer-text");

    function showElement(element, delay = 0) {
      if (!element) return;
      setTimeout(() => {
        element.classList.remove("hidden");
        element.classList.add("fall");
      }, delay);
    }

    showElement(loadingText, 0);
    showElement(mainIcon, 700);

    subIcons.forEach((icon, idx) => {
      showElement(icon, 1400 + idx * 350);
    });

    showElement(designerText, 2600);

    setTimeout(() => {
      loadingScreen.style.transition = "opacity 0.6s ease";
      loadingScreen.style.opacity = "0";
      setTimeout(() => (loadingScreen.style.display = "none"), 650);
    }, 3600);
  }

});
