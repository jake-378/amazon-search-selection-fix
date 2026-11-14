chrome.webNavigation.onCommitted.addListener((details) => {
  if (details.frameId !== 0) return;

  chrome.scripting.executeScript({
    target: { tabId: details.tabId },
    world: "MAIN",
    func: () => {
      function attachFix(input) {
        if (input.dataset.fixed) return;
        input.dataset.fixed = "true";

        const originalBlur = input.blur;
        input.blur = function () {
          if (this.selectionStart === this.selectionEnd) {
            originalBlur.call(this);
          }
        };
      }

      function findAndFix() {
        const searchBox = document.getElementById("twotabsearchtextbox");
        if (searchBox) {
          attachFix(searchBox);
        }
      }

      const observer = new MutationObserver(findAndFix);

      if (document.documentElement) {
        observer.observe(document.documentElement, {
          childList: true,
          subtree: true
        });
      }

      findAndFix();
    }
  });
}, {
  url: [{ hostContains: "amazon.com" }]
});