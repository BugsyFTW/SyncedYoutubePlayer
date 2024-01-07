import load from "load-script";

export type IFrameType = {
    Player: Function,
};

export default async (elementId: string, options?: YT.PlayerOptions): Promise<YT.Player> => {
    await IFrameAPILoader();
    return new YT.Player(elementId, options);
};

const IFrameAPILoader = (): Promise<IFrameType> => {
	const IFrameAPI = new Promise<IFrameType>((resolve) => {
		if (window.YT && window.YT.Player && window.YT.Player instanceof Function) {
			resolve(window.YT);
			return;
		} else {

			const previous = window.onYouTubeIframeAPIReady;
			
			// Define the onYouTubeIframeAPIReady function
			// This function will be called when the API is ready
			window.onYouTubeIframeAPIReady = () => {
				if (previous) {
					previous();
				  }
				resolve(window.YT);
			};

			const protocol = window.location.protocol;

			load(`${protocol}//www.youtube.com/iframe_api`, (error) => {
				if (error) {
					console.log("Error Loading IFrame Api 🥵:\n" + error);
				}
			});
		}
	});
	return IFrameAPI;
};