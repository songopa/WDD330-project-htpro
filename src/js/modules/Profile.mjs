import * as utils from './utils.mjs';

export default class Profile {
    constructor() {
        this.profileContainer = utils.qs('#profile-info');
        if (!this.profileContainer) {
            console.error('Profile container not found in the DOM.');
            return;
        }
        this.setProfileFormListener();
        this.init();
    }
    init() {
        this.loadProfile();
    }
    loadProfile() {
        //fetch data from local storage
        const profileData = {
            username: utils.getLocalStorage('username') || 'Guest',
            email: utils.getLocalStorage('email') || 'Not set',
            age: utils.getLocalStorage('age') || 'Not set',
            height: utils.getLocalStorage('height') || 'Not set',
            weight: utils.getLocalStorage('weight') || 'Not set',
        };
        this.renderProfile(profileData);
    }
    renderProfile(data) {
        this.profileContainer.innerHTML = `
            <div class="profile-item">
                <label for="username">Username:</label>
                <span id="username">${data.username}</span>
            </div>  
            <div class="profile-item">
                <label for="email">Email:</label>
                <span id="email">${data.email}</span>
            </div>
            <div class="profile-item">
                <label for="age">Age:</label>
                <span id="age">${data.age}</span>
            </div>
            <div class="profile-item">
                <label for="weight">Weight (kg):</label>
                <span id="weight">${data.weight}</span>
            </div>
            <div class="profile-item">
                <label for="height">Height (cm):</label>
                <span id="height">${data.height}</span>
            </div>
        `;
    }   
    setProfileFormListener() {
        const form = document.getElementById('updateProfileForm');
        if (form) {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const username = form.username.value;
                const email = form.email.value;
                const age = form.age.value;
                const height = form.height.value;
                const weight = form.weight.value;
                if (username && email && age && height && weight) {
                    utils.setLocalStorage('username', username);
                    utils.setLocalStorage('email', email);
                    utils.setLocalStorage('age', age);
                    utils.setLocalStorage('height', height);
                    utils.setLocalStorage('weight', weight);
                    this.loadProfile();
                    form.reset();
                }
            });
        } else {
            console.warn('Profile form not found.');
        }
        const clearButton = utils.qs('#clear-profile');
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                confirm('Are you sure you want to clear your profile? This action cannot be undone.') &&
                this.clearProfile();
            });
        } else {
            console.warn('Clear profile button not found.');
        }
    }
    clearProfile() {
        utils.removeLocalStorage('username');
        utils.removeLocalStorage('email');
        utils.removeLocalStorage('age');
        utils.removeLocalStorage('height');
        utils.removeLocalStorage('weight');
        this.loadProfile();
    }

}