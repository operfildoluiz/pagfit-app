import languages from "./helper/languages";

const configApp = {
    endpoint: {
        api: "http://192.168.0.22:8000/api"
    },
    lang: languages['pt-BR'],
    getTag: function(tag) {
        return this.lang[tag] || "TAG_" + tag.toUpperCase();
    }
};

export default configApp;