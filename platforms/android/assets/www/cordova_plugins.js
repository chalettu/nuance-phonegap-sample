cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/net.ninjaenterprises.nuance/www/nuancespeechkit.js",
        "id": "net.ninjaenterprises.nuance.NuancePlugin",
        "clobbers": [
            "NuancePlugin"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "net.ninjaenterprises.nuance": "0.1.0",
    "org.apache.cordova.console": "0.2.11-dev",
    "org.apache.cordova.device": "0.2.11"
}
// BOTTOM OF METADATA
});