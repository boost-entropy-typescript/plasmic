const __plasmicHtml = __plasmicData.html;
const __plasmicIframe = document.createElement('iframe');
__plasmicIframe.classList.add('__wab_studio-frame');
__plasmicIframe.style.width = '100vw';
__plasmicIframe.style.height = '100vh';
__plasmicIframe.style.border = 'none';
// We must add this event listener first, before appending, since (at least in
// Cypress) this would otherwise fire before the event listener gets to catch.
__plasmicIframe.addEventListener('load', ev => {
  const doc = __plasmicIframe.contentDocument;
  const win = __plasmicIframe.contentWindow;

  // Pass our hash args down.
  win.__PlasmicStudioArgs = location.hash;

  let finalHtml = __plasmicHtml;
  if (location.href.match(encodeURIComponent('enableReactDevTools=true'))) {
    finalHtml = __plasmicHtml.replace(
      '<script id="ReactDevToolsScript" crossorigin="anonymous"></script>',
      '<script src="http://localhost:8097"></script>'
    );
  }

  // Overwrite the entire document.
  doc.open();
  doc.write(finalHtml);
  doc.close();
});
document.body.appendChild(__plasmicIframe);
