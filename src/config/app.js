import languages from "./helper/languages";

const FALLBACK_LANG = 'pt-BR';

const configApp = {
    loginRedirect: 'Dashboard',
    endpoint: {
        api: "http://192.168.0.13:8000/api"
    },
    lang: languages[FALLBACK_LANG],
    getTag: function(tag) {
        return this.lang[tag] || "TAG_" + tag.toUpperCase();
    }
};

export default configApp;