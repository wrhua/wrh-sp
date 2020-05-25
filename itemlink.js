
var xItemIDs={"18": "590a06ff_c8040cb4_0.html"
	, "20": "6797075e_c8040cb4_0.html"
	, "21": "59100702_ca040cb8_0.html"
	, "22": "6f18078b_7b7609f2_0.html"
	, "23": "7ebd07ea_ae102b7_0.html"
	, "24": "a04508a9_901d0ab9_0.html"
	, "25": "f4ab0b35_1e08049e_0.html"
	, "26": "bb30b94_20ad04e1_0.html"
	, "27": "bb50b95_2b4805a9_0.html"
	, "28": "236e0bf4_3eb606f5_0.html"};

var xBkmkIDs={};

$(document).ready(function(){

	var _urlTarget=function(sHref){
		var sUrl;
		var m=sHref.match(/^nyf:\/\/entry\?itemid=(\d+)/i);
		if(m && m.length>1){
			var sFn=xItemIDs[m[1]];
			if(sFn){
				sUrl=sFn;
			}else{
				alert('Cannot locate the target webpage. \n\n' + sHref);
			}
			if(!sUrl) sUrl='';
		}else{
			m=sHref.match(/^nyf:\/\/entry\?bmid=(\d+)/i);
			if(m && m.length>1){
				var sBmID=m[1];
				if(sBmID){
					var v=(xBkmkIDs[sBmID]||'').split('\t');
					if(v && v.length>2){
						var sItemID=parseInt(v[0]), sSsgName=v[1], sAnchor=v[2];
						var sFn=xItemIDs[sItemID];
						if(sFn){
							sUrl=sFn + '#' + sAnchor;
						}else{
							alert('Cannot locate the target webpage. \n\n' + sHref);
						}
					}
				}
				if(!sUrl) sUrl='';
			}
		}
		return sUrl;
	};

	var linkOf=function(p){
		var sUri='';
		while(p && !sUri){
			sUri=p.href||'';
			p=p.parentNode;
		}
		return sUri;
	};

	$('a').click(function(e){
		//2018.4.5 the target element could be a <SPAN> inside of <a>
		var sHref=linkOf(e.target);
		if(sHref){
			var sUrl=_urlTarget(sHref);
			if(sUrl){
				document.location.href=sUrl;
				return false;
			}else if(sUrl===''){
				return false; //2017.10.21 bad nyf:// links;
			}else{
				window.open(sHref);
				return false;
			}
		}else{
			return false;
		}
	});

});
