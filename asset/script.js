function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function delCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() - (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function add() {
  if (document.getElementById("inp").value != "") {
	a = document.createElement("a");
	a.innerHTML = document.getElementById("inp").value;
	document.body.innerHTML += "<div id='"+sys+"' class='to-do' onclick='del(this)'>"+a.innerText+"</div>";
	setCookie(sys.toString(), a.innerText, 365);
	sys += 1;
	document.getElementById("inp").focus();
  }
}
function del(elm) {
  delCookie(elm.id, elm.innerHTML, 365);
  document.getElementById(elm.id).remove();
  document.getElementById("inp").focus();
}
var sys = 1;
n = Number(document.cookie.split(" ").at(-1).split("=").at(0));
for (i=1; i<=n; i+=1) {
  if (getCookie(i.toString()) != "") {
    document.body.innerHTML += "<div id='"+sys+"' class='to-do' onclick='del(this)'>"+getCookie(i.toString())+"</div>";
  }
  sys += 1;
}
document.getElementById("inp").addEventListener("keyup", keyAdd);
document.getElementById("inp").focus();
function keyAdd(e) {
  if (e.keyCode === 13) {
    add();
  }
  document.getElementById("inp").addEventListener("keyup", keyAdd);
}