const THREE = window.MINDAR.IMAGE.THREE;
import {loadGLTF, loadAudio} from "./libs/loader.js";

document.addEventListener('DOMContentLoaded', () => {
	const start = async() => {
		const mindarThree = new window.MINDAR.IMAGE.MindARThree({
			container: document.body,
			imageTargetSrc: './wtf.mind',
			maxTrack: 3,
		});
		
		const {renderer, scene, camera} = mindarThree;
		
		const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
		scene.add(light);
		
		const whale = await loadGLTF("./whale/scene.gltf");
		whale.scene.scale.set(0.2, 0.2, 0.2);
		
		const whaleAclip = await loadAudio("./sound/whale.mp3");
		const whaleListener = new THREE.AudioListener();
		const whaleAudio = new THREE.PositionalAudio(whaleListener);
		
		const tiger = await loadGLTF("./tiger/scene.gltf");
		tiger.scene.scale.set(0.04, 0.04, 0.04);
		
		const tigerAclip = await loadAudio("./sound/tiger.mp3");
		const tigerListener = new THREE.AudioListener();
		const tigerAudio = new THREE.PositionalAudio(tigerListener);
		
		const fox = await loadGLTF("./fox/scene.gltf");
		fox.scene.scale.set(0.2, 0.2, 0.2);
		
		const foxAclip = await loadAudio("./sound/fox.mp3");
		const foxListener = new THREE.AudioListener();
		const foxAudio = new THREE.PositionalAudio(foxListener);
		
		const whaleAnchor = mindarThree.addAnchor(0);
		whaleAnchor.group.add(whale.scene);
		camera.add(whaleListener);
		whaleAudio.setRefDistance(100);
		whaleAudio.setBuffer(whaleAclip);
		whaleAudio.setLoop(true);
		whaleAnchor.group.add(whaleAudio)
		
		whaleAnchor.onTargetFound = () => {
			whaleAudio.play();
		}
		
		whaleAnchor.onTargetLost = () => {
			whaleAudio.pause();
		}
		
		const tigerAnchor = mindarThree.addAnchor(1);
		tigerAnchor.group.add(tiger.scene);
		
		camera.add(tigerListener);
		tigerAudio.setRefDistance(100);
		tigerAudio.setBuffer(tigerAclip);
		tigerAudio.setLoop(true);
		tigerAnchor.group.add(tigerAudio)
		
		tigerAnchor.onTargetFound = () => {
			tigerAudio.play();
		}
		
		tigerAnchor.onTargetLost = () => {
			tigerAudio.pause();
		}
		
		const foxAnchor = mindarThree.addAnchor(2);
		foxAnchor.group.add(fox.scene);
		
		camera.add(foxListener);
		foxAudio.setRefDistance(100);
		foxAudio.setBuffer(foxAclip);
		foxAudio.setLoop(true);
		foxAnchor.group.add(foxAudio)
		
		foxAnchor.onTargetFound = () => {
			foxAudio.play();
		}
		
		foxAnchor.onTargetLost = () => {
			foxAudio.pause();
		}
		
		await mindarThree.start();
		
		renderer.setAnimationLoop(() => {
			renderer.render(scene, camera);
		});
	}
	start();
	
});
		
		