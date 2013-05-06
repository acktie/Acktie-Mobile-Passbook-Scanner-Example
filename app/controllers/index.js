var passbookScanner = require("com.acktie.mobile.ios.passbook.scanner");
function clickme() {
	var window = undefined;
	var scanner = undefined;

	var rightButton = Ti.UI.createButton({
		title : 'close',
	});

	rightButton.addEventListener('click', function() {
		scanner.stop();
	});

	function success(result) {
		alert(result.data);
	}

	function cancel() {
		window.close({
			animated : true
		});
	}

	var scanningOptions = {
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		enableQR : false,
		enableAztec : false,
		scanInterval : 3.0,
		success : success,
		cancel : cancel
	};

	if (Ti.Platform.osname === 'iphone') {
		scanner = passbookScanner.createScannerView(scanningOptions);
		
		window = Ti.UI.createWindow({
			modal : true,
			barColor : '65412a',
			barImage : 'foody-navbar.png',
			backgroundColor : "#fff"
		});

		var lightSwitch = Ti.UI.createSwitch({
			bottom : 5,
			right : 5,
			value : false
		});

		lightSwitch.addEventListener('change', function(e) {
			if (lightSwitch.value) {
				scanner.turnLightOn();
			} else {
				scanner.turnLightOff();
			}

			Ti.API.info('Switch value: ' + lightSwitch.value);
		});

		scanner.add(lightSwitch);
		
		window.add(scanner);
		window.rightNavButton = rightButton;
		window.open({
			animated : true
		});
	} else if (Ti.Platform.osname === 'ipad') {
		// Use the front camera on an iPad
		scanningOptions.useFrontCamera = true;
		
		scanner = passbookScanner.createScannerView(scanningOptions);
		
		var popover = Ti.UI.iPad.createPopover({
			width : '50%',
			height : '50%',
			title : 'Scanner',
			rightNavButton : rightButton
		});
		popover.add(scanner);
		
		popover.show({
			view : $.scan
		});
	}

	function cancel() {
		if (Ti.Platform.osname === 'iphone') {
			window.close({
				animated : true
			});
		} else if (Ti.Platform.osname === 'ipad') {
			popover.hide();
		}
	}

}

$.index.open();