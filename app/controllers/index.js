var passbookScanner = undefined;
if (Ti.Platform.osname === 'iphone' ||  Ti.Platform.osname === 'ipad') 
{
	passbookScanner = require("com.acktie.mobile.ios.passbook.scanner");
}
else
{
	passbookScanner = require("com.acktie.mobile.android.passbook.scanner");
}

function clickme() {
	var window = undefined;
	var scanner = undefined;

	var rightButton = Ti.UI.createButton({
		bottom : 5,
		left : 5,
		title : 'close',
	});

	rightButton.addEventListener('click', function() {
		scanner.stop();
	});

	function success(result) {
		alert(JSON.stringify(result));
	}

	function cancel() {
		window.close({
			animated : true
		});
	}

	var scanningOptions = {
		width : '100%',
		height : '90%',
		enableQR : false,
		enableAztec : false,
		scanInterval : 3.0,
		scanPortrait: false, // Only used on Android.  Default is landscape
		success : success,
		cancel : cancel
	};

	if (Ti.Platform.osname === 'iphone' || Ti.Platform.osname === 'android') {
		scanner = passbookScanner.createScannerView(scanningOptions);
		
		window = Ti.UI.createWindow({
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
		
		// If android add the close button
		if(Ti.Platform.osname === 'android')
		{
			scanner.add(rightButton);
		}
		
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
		} else if(Ti.Platform.osname === 'android') {
			scanner.stop();
			scanner.hide();
			window.remove(scanner);
		}
	}

}

$.index.open();