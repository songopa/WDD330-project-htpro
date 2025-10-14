import * as utils from './utils.mjs';

export default class ActivityLogger {
    constructor() {
        this.logContainer = utils.qs('#activity-list');
        if (!this.logContainer) {
            console.error('Activity log container not found in the DOM.');
            return;
        }
        this.init();
    }
    init() {
        this.loadLogs();
        this.setupFormListener();
        this.clearLogs();
    }
    loadLogs() {
        const logs = JSON.parse(localStorage.getItem('activityLogs')) || [];
        this.renderLogs(logs);
    }
    setupFormListener() {
        const form = document.getElementById('activity-form');
        if (form) {
            form.addEventListener('submit', (event) => {
                event.preventDefault(); 
                const activity = form.activity.value;
                const duration = form.duration.value;
                if (activity && duration) {
                    this.addLog({ activity, duration, date: new Date().toLocaleString() });
                    form.reset();
                }
            });
        } else {
            console.warn('Activity form not found.');
        }
    }
    addLog(log) {
        const logs = JSON.parse(localStorage.getItem('activityLogs')) || [];
        logs.push(log);
        localStorage.setItem('activityLogs', JSON.stringify(logs));
        this.renderLogs(logs);
    }   
    renderLogs(logs) {
        this.logContainer.innerHTML = '';
        if (logs.length === 0) {
            this.logContainer.innerHTML = '<p>No activities logged yet.</p>';
            return;
        }
        logs.forEach(log => {
            const logItem = document.createElement('div');
            logItem.className = 'log-item';
            logItem.innerHTML = `
                <strong>${log.activity}</strong> - ${log.duration} minutes 
                <br>
                <small>${log.date}</small>
            `;
            this.logContainer.appendChild(logItem);
        });
    }
    clearLogs() {
        const clearButton = utils.qs('#clear-activities');
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                confirm('Are you sure you want to clear all logs?') &&
                localStorage.removeItem('activityLogs');
                this.loadLogs();
            });
        }
    }
}