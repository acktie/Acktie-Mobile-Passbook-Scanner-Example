function Controller() {
    function clickme() {
        function success(result) {
            alert(JSON.stringify(result));
        }
        function cancel() {
            window.close({
                animated: true
            });
        }
        function cancel() {
            if ("iphone" === Ti.Platform.osname) window.close({
                animated: true
            }); else if ("ipad" === Ti.Platform.osname) popover.hide(); else if ("android" === Ti.Platform.osname) {
                scanner.stop();
                scanner.hide();
                window.remove(scanner);
            }
        }
        var window = void 0;
        var scanner = void 0;
        var rightButton = Ti.UI.createButton({
            bottom: 5,
            left: 5,
            title: "close"
        });
        rightButton.addEventListener("click", function() {
            scanner.stop();
        });
        var scanningOptions = {
            width: "100%",
            height: "90%",
            enableQR: false,
            enableAztec: false,
            scanInterval: 3,
            scanPortrait: false,
            success: success,
            cancel: cancel
        };
        if ("iphone" === Ti.Platform.osname || "android" === Ti.Platform.osname) {
            scanner = passbookScanner.createScannerView(scanningOptions);
            window = Ti.UI.createWindow({
                barColor: "65412a",
                barImage: "foody-navbar.png",
                backgroundColor: "#fff"
            });
            var lightSwitch = Ti.UI.createSwitch({
                bottom: 5,
                right: 5,
                value: false
            });
            lightSwitch.addEventListener("change", function() {
                lightSwitch.value ? scanner.turnLightOn() : scanner.turnLightOff();
                Ti.API.info("Switch value: " + lightSwitch.value);
            });
            scanner.add(lightSwitch);
            "android" === Ti.Platform.osname && scanner.add(rightButton);
            window.add(scanner);
            window.rightNavButton = rightButton;
            window.open({
                animated: true
            });
        } else if ("ipad" === Ti.Platform.osname) {
            scanningOptions.useFrontCamera = true;
            scanner = passbookScanner.createScannerView(scanningOptions);
            var popover = Ti.UI.iPad.createPopover({
                width: "50%",
                height: "50%",
                title: "Scanner",
                rightNavButton: rightButton
            });
            popover.add(scanner);
            popover.show({
                view: $.scan
            });
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.scan = Ti.UI.createButton({
        bottom: "5dp",
        title: "Click Me",
        id: "scan"
    });
    $.__views.index.add($.__views.scan);
    clickme ? $.__views.scan.addEventListener("click", clickme) : __defers["$.__views.scan!click!clickme"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var passbookScanner = void 0;
    passbookScanner = "iphone" === Ti.Platform.osname || "ipad" === Ti.Platform.osname ? require("com.acktie.mobile.ios.passbook.scanner") : require("com.acktie.mobile.android.passbook.scanner");
    $.index.open();
    __defers["$.__views.scan!click!clickme"] && $.__views.scan.addEventListener("click", clickme);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;