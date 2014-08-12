cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/net.ninjaenterprises.nuance/www/nuancespeechkit.js",
        "id": "net.ninjaenterprises.nuance.NuancePlugin",
        "clobbers": [
            "NuancePlugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "net.ninjaenterprises.nuance": "0.1.0"
}
// BOTTOM OF METADATA
});