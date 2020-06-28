/* wifi_proxy change
[Script]
SSID助手 = debug=1,script-path=https://raw.githubusercontent.com/rainman0925/GFW/master/Surge/Scripts/wifi_proxy.js,type=event,event-name=network-changed,control-api=true
PS:记得自己修改WIFI名称
主要功能:指定Wi-Fi(路由器翻)下,Surge使用直连模式,其他网络下Surge使用规则模式
虽然设置SSID可以达到基本相同功能
使用脚本,Surge不会被suspend
Rewrite和Scripting依然有效
*/

var wifiname = $network.wifi.ssid;
var proxywifi = ["L1n"];
for (var i = 0; i < proxywifi.length; i++) {
	if (wifiname==proxywifi[i]){
		$surge.setOutboundMode("direct");
		
		setTimeout(function(){$notification.post("Meeta_Remind","您目前处于WIFI-Proxy"+"SSID: "+wifiname,"Surge已自动变为直连模式");}, 3000);
		break;
		
	};
	if (i==proxywifi.length-1){
		$surge.setOutboundMode("rule");
		
		setTimeout(function(){$notification.post("Meeta_Remind","Surge已自动变为规则模式","");}, 3000);
	
	}
	
	
};
$done();
