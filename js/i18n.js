const i18n = {
    currentLang: 'pt-br',
    
    getTranslations(lang) {
        return lang === 'pt-br' ? window.ptBrTranslations : window.enTranslations;
    },
    
    init() {        
        if (!window.ptBrTranslations || !window.enTranslations) {
            console.error('Arquivos de tradução não carregados!');
            return;
        }
        
        const savedLang = localStorage.getItem('preferred-language');
        if (savedLang && ['pt-br', 'en'].includes(savedLang)) {
            this.currentLang = savedLang;
        }
        
        this.updateContent();
        this.updateActiveButton();
        this.setupLanguageButtons();
        
        document.documentElement.lang = this.currentLang;
    },
    
    setupLanguageButtons() {
        const buttons = document.querySelectorAll('.lang-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchLanguage(btn.dataset.lang);
            });
        });
    },
    
    switchLanguage(lang) {
        if (lang === this.currentLang) return;
        
        this.currentLang = lang;
        localStorage.setItem('preferred-language', lang);
        this.updateContent();
        this.updateActiveButton();
        document.documentElement.lang = lang;
    },
    
    updateContent() {
        const texts = this.getTranslations(this.currentLang);
        
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            if (texts && texts[key]) {
                if (element.placeholder !== undefined) {
                    element.placeholder = texts[key];
                } else {
                    element.innerHTML = texts[key];
                }
            } else {
                console.warn('Tradução não encontrada para:', key);
            }
        });
        
        const titleElement = document.querySelector('title');
        const titleKey = titleElement?.dataset.i18n;
        if (titleKey && texts && texts[titleKey]) {
            titleElement.textContent = texts[titleKey];
        }
    },
    
    updateActiveButton() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    i18n.init();
});