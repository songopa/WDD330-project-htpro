loadHeaderFooter()



async function loadHeaderFooter() {
  const headerElement = document.querySelector('#header');
  if (headerElement) {
    try {
      const response = await fetch('/views/partials/header.html');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const headerHTML = await response.text();
      headerElement.innerHTML = headerHTML;

      const menuBtn = document.querySelector("#menu");

      if (menuBtn) {
        const navigation = document.querySelector("#navigation");
        menuBtn.addEventListener('click', function () {
          navigation.classList.toggle('show')
          menuBtn.classList.toggle('show')
        })
      }
    } catch (error) {
      console.error('Error loading header:', error);
    }
  }

  const footerElement = document.querySelector('#footer');
  if (footerElement) {
    try {
      const response = await fetch('/views/partials/footer.html');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const footerHTML = await response.text();
      footerElement.innerHTML = footerHTML;

      const yearElement = document.querySelector('#currentYear');
      if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
      }
    } catch (error) {
      console.error('Error loading footer:', error);
    }
  }
}
