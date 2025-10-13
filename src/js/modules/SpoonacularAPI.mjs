import * as utils from './utils.mjs';

export default class Spoonacular {
    constructor() {
        this.api
        this.init();
    }

    init() {
        this.renderMealPlan();
    }

    mealTemplate(meal) {
        return `
            <div class="meal-item">
                <img src="${"https://img.spoonacular.com/recipes/"+meal.image || 'https://placehold.co/150x150/webp?text=Meal'}" alt="${meal.title}" class="meal-img">
                <div class="meal-content">
                    <strong>${meal.title}</strong>
                    <span>Ready in ${meal.readyInMinutes} minutes</span>
                    <span>Servings: ${meal.servings}</span>
                    <a href="${meal.sourceUrl}" target="_blank" >View Recipe</a>
                </div>
            </div>
        `
    }

    async getMealPlan() {
        const apiKey = '064d69f77ed04b4ba007f96b0cdcd5e5'
        const timeFrame = 'day'; // or 'day', 'week','month'
        const targetCalories = 1200; // Adjust as needed
        const diet = 'ketogenic'; // or 'vegan', 'glutenFree', etc.
        const url = `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=${timeFrame}&targetCalories=${targetCalories}&diet=${diet}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const data = await response.json();

            console.log('Meal Plan Data:', data);

            return data || [];
        } catch (error) {
            console.error('Error fetching meal plan:', error);
            return [];
        }
    }

    renderMealPlan() {
        this.getMealPlan()
            .then(plans => {
                const mealContainer = utils.qs('#mealPlan');
                if (!mealContainer) {
                    console.error('Meal plan container not found in the DOM.');
                    return;
                }
                const meals = plans.meals || [];
                const mealHTML = meals.map(meal => this.mealTemplate(meal)).join('');
                mealContainer.innerHTML = mealHTML;
                mealContainer.insertAdjacentHTML('beforeend', `
                    <div class="meal-nutrients">
                        <p>Total Calories: ${plans.nutrients.calories}</p>
                        <p>Total Protein: ${plans.nutrients.protein}g</p>
                        <p>Total Carbs: ${plans.nutrients.carbohydrates}g</p>
                        <p>Total Fat: ${plans.nutrients.fat}g</p>
                    </div>
                `);
            })
            .catch(error => console.error('Error rendering meal plan:', error));
    }

}