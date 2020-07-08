/* wifi_proxy change
[Script]
SSID助手 = debug=1,script-path=https://raw.githubusercontent.com/rainman0925/GFW/master/Surge/Scripts/wifi_proxy.js,type=event,event-name=network-changed,control-api=true
PS:记得自己修改WIFI名称
主要功能:指定Wi-Fi(路由器翻)下,Surge使用直连模式,其他网络下Surge使用规则模式
虽然设置SSID可以达到基本相同功能
使用脚本,Surge不会被suspend
Rewrite和Scripting依然有效
*/

const SSID = $network.wifi.ssid;
const proxywifi = !$persistentStore.read("lkWifiSsids")?["L1n"]:JSON.parse($persistentStore.read("lkWifiSsids"));
let res = proxywifi.some(val => val === (!!SSID ? SSID : "cellular"));
let lkWifiLast = !$persistentStore.read("lkWifiLast")?"abcdefghijklmnopqrstuvwxyz":$persistentStore.read("lkWifiLast");
if (lkWifiLast!=(!!SSID ? SSID : "cellular")){
    !$persistentStore.write((!!SSID ? SSID : "cellular"), "lkWifiLast")
    if (res) {
        $surge.setOutboundMode("direct");
        notify(1);
    } else {
        $surge.setOutboundMode("rule");
        notify(0);
    }
}

function notify(mode) {
    setTimeout(function () {
        !!mode ? $notification.post("Wi-Fi助手", "切换到【直接连接】", `${!!SSID ? "你的Wi-Fi：【" + SSID + "】" : "你正在使用流量"}`) : $notification.post("Wi-Fi助手", "切换到【规则模式】", `${!!SSID ? "你的Wi-Fi：【" + SSID + "】" : "你正在使用流量"}`)
    })
}

$done();