import * as utils from './modules/utils.mjs';
import News from './modules/NewsAPI.mjs';
import Spoonacular from './modules/SpoonacularAPI.mjs';

init();

function init() {
    utils.loadHeaderFooter(navigationListener);
    loadHomePage();
}

function navigationListener() {
    const navs = utils.qsa('.nav-item');
    if (navs.length === 0) {
        console.warn('No navigation items found.');
        return;
    }
    navs.forEach(nav => {
        nav.addEventListener('click', (event) => {
            event.preventDefault();
            const page = nav.dataset.page;
            switch (page) {
                case 'home':
                    loadHomePage();
                    break;
                case 'nutrition':
                   loadNutritionPage();
                    break;
                case 'activity':
                    loadActivityPage();
                    break;
                case 'profile':
                    loadProfilePage();
                    break;
                default:
                    console.warn(`No handler for page: ${page}`);
            }
            // Remove active class from the currently active nav item
            const activeNav = utils.qs('.nav-item.active');
            if (activeNav) {
                activeNav.classList.remove('active');
            }
            nav.classList.add('active');
        });
    }
    );
}

function loadHomePage() { 
    utils.loadTemplate('../views/home.html')
        .then(template => {
            utils.renderWithTemplate(template, 'main-content', { title: 'Tracking Health & Wellness' })
                .then(addBMIEventListeners)
                .then(() => {
                    new News();
                })
                .catch(error => console.error('Error rendering home page:', error));
        })
        .catch(error => console.error('Error loading home page:', error));
    
}

function loadNutritionPage() {
    utils.loadTemplate('../views/nutrition.html')
        .then(template => {
            utils.renderWithTemplate(template, 'main-content', { title: 'Nutrition Meal Planner' })
                .then(new Spoonacular());
        })
        .catch(error => console.error('Error loading nutrition page:', error));
}

function loadActivityPage() {
    utils.loadTemplate('../views/activity-log.html')
        .then(template => {
            utils.renderWithTemplate(template, 'main-content', { title: 'Activity Log' });
        })
        .catch(error => console.error('Error loading activity page:', error));
}

function loadProfilePage() {
    utils.loadTemplate('../views/profile.html')
        .then(template => {
            utils.renderWithTemplate(template, 'main-content', { title: 'My Profile' });
        })
        .catch(error => console.error('Error loading profile page:', error));
}

// Add event listeners to BMI input fields
function addBMIEventListeners() {
    const heightInput = utils.qs('#height');
    const weightInput = utils.qs('#weight');
    

    if (heightInput && weightInput) {
        weightInput.addEventListener('input', () => calculateBMI(weightInput.value, heightInput.value));
        heightInput.addEventListener('input', () => calculateBMI(weightInput.value, heightInput.value));
    } else {
        console.warn('BMI input fields or result element not found.');
    }
}

// Function to calculate BMI based on height and weight inputs
function calculateBMI(rawWeight = 0, rawHeight = 0) {
    
    const height = parseFloat(rawHeight) / 100; // Convert cm to meters
    const weight = parseFloat(rawWeight); // Weight in kg
    const bmiResult = utils.qs('#bmiResult');
    const idealWeight = utils.qs('#idealWeight');

    if (height > 0 && weight > 2) {
        const bmi = (weight / (height * height)).toFixed(2);

        //Calculate ideal weight range based on height
        const minIdealWeight = (18.5 * height * height).toFixed(2);
        const maxIdealWeight = (24.9 * height * height).toFixed(2);
        
        
        let interpretation = '';

        if (bmi < 18.5) {
            bmiResult.className = 'text-warning';
            interpretation = 'Underweight';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            bmiResult.className = 'text-success';
            interpretation = 'Normal weight';
        } else if (bmi >= 25 && bmi < 29.9) {
            bmiResult.className = 'text-warning';
            interpretation = 'Overweight';
        } else if (bmi >= 30) {
            bmiResult.className = 'text-danger';
            interpretation = 'Obesity';
        } 
        bmiResult.textContent = ` ${bmi} - ${interpretation}`;
        idealWeight.textContent = `Ideal weight range: ${minIdealWeight} kg - ${maxIdealWeight} kg`;
    } else {
        bmiResult.textContent = 'Please enter valid height and weight.';
        idealWeight.textContent = '';
    }
}



