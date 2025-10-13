
export function qs(selector, context = document) {
  return context.querySelector(selector);
}

export function qsa(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

export function getLocalStorage(key) {
  return localStorage.getItem(key);
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

export function removeLocalStorage(key) {
  localStorage.removeItem(key);
}

export function setClickListener(selector, callback) {
    const element = qs(selector);
    if (element) {
        element.addEventListener('touchend', (event) => {
            event.preventDefault();
            callback();
        });
        element.addEventListener('click', callback);
    } else {
        console.warn(`Element with selector "${selector}" not found.`);
    }
}

export async function loadTemplate(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            console.error(`Network response was not ok for ${path}`);
        }
        return await response.text();
    } catch (error) {
        console.error(`Error loading template from ${path}:`, error);
        return '';
    }
}

export async function renderWithTemplate(template, elementId, data, callback) {
    const element = qs(`#${elementId}`);
    if (element) {
        element.innerHTML = await template.replace(/\{\{(\w+)\}\}/g, (_, key) => data[key] || '');
        if (callback && typeof callback === 'function') {
            callback(data);
        }
    } else {
        console.warn(`Element with ID "${elementId}" not found.`);
    }
}

export function renderListWithTemplate(templateFn, elementId, dataList, position = 'afterbegin', clear = false) { 
    const element = qs(`#${elementId}`);
    if (element) {
        if (clear) {
            element.innerHTML = '';
        }

        const htmlStrings = dataList.map(item => templateFn(item));
        element.insertAdjacentHTML(position, htmlStrings.join(''));
    } else {
        console.warn(`Element with ID "${elementId}" not found.`);
    }
}

export async function loadHeaderFooter(callback) {
    //Add event listener for the menu button
    const menuBtn = qs("#menu");
    if (menuBtn) {
        const navigation = qs('#navigation');
        menuBtn.addEventListener('click', function () {
            navigation.classList.toggle('show')
            menuBtn.classList.toggle('show')
        })
    }
    
    // Load footer
    const footerHTML = await loadTemplate('../../views/partials/footer.html');
    renderWithTemplate(footerHTML, 'footer', { year: new Date().getFullYear() });
    
    // Execute callback if provided
    if (callback && typeof callback === 'function') {
        callback();
    }
    
}
  
export class Wrapper {
    constructor(element, text, display = true) {
        this.element = document.createElement(element);
        this.element.innerHTML = text;
        this.display = !display;
        this.toggleDisplay();
    }
    click(val) {
        this.element.addEventListener("click", () => val());
        return this;
    }
    showSelectable() {
        this.element.style.cursor = "pointer";
        return this;
    }
    addClass(className) {
        this.element.classList.add(className);
        return this;
    }
    toggleDisplay() {
        this.display = !this.display;
        this.element.style.display = this.display ? "" : "none";
        return this;
    }
    appendChild(child) {
        this.element.appendChild(child.element);
        return this;
    }
    createChild(element, text, display = true) {
        var wrapper = new Wrapper(element, text, display);
        this.appendChild(wrapper);
        return this;
    }
    static generate(element, text, display = true) {
        return new Wrapper(element, text, display);
    }
}

