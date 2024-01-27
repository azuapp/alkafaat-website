var savedLanguage = localStorage.getItem('selectedLanguage') || 'en';

// Function to set the direction based on the language
function setDirection(lng) {
  if (lng === 'ar') {
    document.documentElement.dir = "rtl";
    document.documentElement.classList.add("rtl");
  } else {
    document.documentElement.dir = "ltr";
    document.documentElement.classList.remove("rtl");
  }
}

i18next
  .use(i18nextHttpBackend)
  .init({
    lng: savedLanguage, // Set initial language to saved language
    supportedLngs: ["ar", "en"],
    debug: true,
    fallbackLng: savedLanguage,
    preload: ["en", "ar"],
    ns: ["translation"],
    defaultNS: "translation",
    backend: {
      loadPath: "/assets/localization/{{lng}}/{{ns}}.json",
    },
  })
  .then(() => {
    updateContent();
    setDirection(savedLanguage); // Set the direction when the page loads
  })
  .catch((err) => {
    console.error("i18next initialization error:", err);
  });

function updateContent() {
  $("[data-i18n]").each(function () {
    var keys = $(this).data("i18n").split(';');
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].indexOf('[') === 0) {
        var parts = keys[i].split(']');
        $(this).attr(parts[0].substr(1), i18next.t(parts[1]));
      } else {
        $(this).text(i18next.t(keys[i]));
      }
    }
  });
}

$("#change-language").click(function () {
  var lng = i18next.language === "en" ? "ar" : "en";
  setDirection(lng); // Update the direction on language change

  i18next.changeLanguage(lng, function () {
    updateContent();
    localStorage.setItem('selectedLanguage', lng);
  });
});
