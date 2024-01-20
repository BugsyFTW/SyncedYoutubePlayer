import load from "load-script";

export type IFrameType = {
	Player: Function,
};

export default async (elementId: string, options?: YT.PlayerOptions): Promise<YT.Player> => {
	await IFrameAPILoader();
	const player = new YT.Player(elementId, options);
	extendTimeChange(player);
	return player;
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

const extendTimeChange = (player: YT.Player) => {
	// This is the source "window" that will emit the events.
	const iFrameWindow = player.getIframe().contentWindow;
	// So we can compare against new updates.
	let lastTimeUpdate = 0;

	// Listen to events triggered by postMessage,
	// this is how different windows in a browser
	// (such as a popup or iFrame) can communicate.
	// See: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
	window.addEventListener('message', (event) => {
		if (event.source === iFrameWindow) {
			const data = JSON.parse(event.data);

			// The "infoDelivery" event is used by YT to transmit any
			// kind of information change in the player,
			// such as the current time or a playback quality change.
			if (data.event === "infoDelivery" && data.info && data.info.currentTime) {
				// currentTime is emitted very frequently,
				const time = data.info.currentTime;
				const diff = Math.abs(time - lastTimeUpdate);

				// Magic number ;)
				if (diff > 0.400) {
					dispatchTimeChangeEvent(time);
				}
				lastTimeUpdate = time;
			}
		}
	});
};

const dispatchTimeChangeEvent = (time: number) => {
	const event = new CustomEvent('timeChange', { detail: { currentTime: time } });
	window.dispatchEvent(event);
};