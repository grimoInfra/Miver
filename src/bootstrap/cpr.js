/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Agrimo Infra LTD. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

(function () {
	function createSplashScreen() {
		let themeType = localStorage.getItem("mv-theme") || "light";

		const mvSplashContainer = document.createElement("div");
		const mvSplashContainerWrapper = document.createElement("div");
		const stroke1 = document.createElement("div");
		const stroke2 = document.createElement("div");

		const strokes = [stroke1, stroke2];
		for (let _stroke of strokes) {
			_stroke.style.height = "inherit";
			_stroke.style.width = "80px";
			_stroke.style.margin = "0px 20px 0 20px";
            _stroke.classList.add("stroke-line");
            
            if (themeType) {
                _stroke.style.backgroundColor = themeType == "light" ? "#ededed" : "#000";
            } else {
                _stroke.style.backgroundColor = themeType == "light" ? "#ededed" : "#000";
            }
			mvSplashContainerWrapper.appendChild(_stroke);
		}

		mvSplashContainer.classList.add("mv-splash-container");
        mvSplashContainerWrapper.classList.add("mv-splash-container-wrapper");
		mvSplashContainer.style.transition = "0.5s";
		mvSplashContainer.style.position = "absolute";
		mvSplashContainer.style.width = "100%";
		mvSplashContainer.style.height = "100vh";
		mvSplashContainer.style.display = "flex";
		mvSplashContainer.style.justifyContent = "center";

        if (themeType) {
            mvSplashContainer.style.backgroundColor = themeType == "light" ? "#ededed" : "#000";
        } else {
            mvSplashContainer.style.backgroundColor = themeType == "light" ? "#ededed" : "#000";
        }

		mvSplashContainerWrapper.style.width = "inherit";
		mvSplashContainerWrapper.style.height = "inherit";

		mvSplashContainer.appendChild(mvSplashContainerWrapper);
		document.body.appendChild(mvSplashContainer);
	}
	createSplashScreen()
})();
