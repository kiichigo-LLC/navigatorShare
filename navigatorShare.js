navigatorShare();

// navigatorShare
function navigatorShare() {
	document.addEventListener('DOMContentLoaded', () => {
		for (const shareButtonElement of document.querySelectorAll('.share-button')) {
			shareButtonElement.disabled = false;
			shareButtonElement.addEventListener('click', () => {
				const shareTitle = shareButtonElement.dataset.shareTitle;
				const shareText = shareButtonElement.dataset.shareText;
				const shareUrl = shareButtonElement.dataset.shareUrl;
				const shareDone = shareButtonElement.dataset.shareDone;

				try {
					if (navigator.share !== undefined) {
						navigator.share({
							title: shareTitle !== undefined ? shareTitle : document.title,
							text: shareText,
							url: shareUrl !== undefined ? shareUrl : document.URL,
						});
					} else {
						const textArea = document.createElement("textarea");

						textArea.textContent = shareUrl;
						document.body.appendChild(textArea);
						textArea.select();
						document.execCommand("copy");
						document.body.removeChild(textArea);
						
						shareButtonElement.innerHTML = '<span class="donetxt">' + shareDone + '</span>';
						shareButtonElement.classList.remove('shiny-btn');
						shareButtonElement.setAttribute("disabled", true);
						shareButtonElement.style.cursor = "none";
					}
				} catch (e) {
					console.error('Share failed', e);
				}
			});
		}
	});
}