const form = document.getElementById("wifi-form");
const qr = document.getElementById("qrcode");

// Button submit
const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const ssid = document.getElementById("ssid").value;
  const password = document.getElementById("password").value;
  const encryption = document.getElementById("encryption").value;
  const hidden = document.getElementById("hidden").checked;
  const size = document.getElementById("size").value;

  // Validate SSID
  if (ssid === "") {
    alert("Vui lòng nhập tên WiFi (SSID)");
    return;
  }

  // Validate password for WPA/WEP
  if ((encryption === "WPA" || encryption === "WEP") && password === "") {
    alert("Vui lòng nhập mật khẩu cho WiFi có bảo mật");
    return;
  }

  showSpinner();
  
  // Show spinner for 1 sec
  setTimeout(() => {
    hideSpinner();
    generateWiFiQRCode(ssid, password, encryption, hidden, size);
    showWiFiInfo(ssid, encryption, hidden);
    
    // Generate the save button after the qr code image src is ready
    setTimeout(() => {
      // Get save url
      const saveUrl = qr.querySelector("canvas").toDataURL();
      // Create save button
      createSaveBtn(saveUrl);
    }, 50);
  }, 1000);
};

// Generate WiFi QR code with proper format
const generateWiFiQRCode = (ssid, password, encryption, hidden, size) => {
  // Create WiFi QR code format
  // Format: WIFI:S:<SSID>;T:<WPA|WEP|nopass>;P:<password>;H:<true|false>;;
  
  let wifiString = "WIFI:";
  
  // Add SSID (escape special characters)
  wifiString += "S:" + escapeSpecialChars(ssid) + ";";
  
  // Add encryption type
  wifiString += "T:" + encryption + ";";
  
  // Add password if exists
  if (password && encryption !== "nopass") {
    wifiString += "P:" + escapeSpecialChars(password) + ";";
  }
  
  // Add hidden status
  if (hidden) {
    wifiString += "H:true;";
  }
  
  // End with double semicolon
  wifiString += ";;";

  const qrcode = new QRCode("qrcode", {
    text: wifiString,
    width: parseInt(size),
    height: parseInt(size),
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
};

// Escape special characters in SSID and password
const escapeSpecialChars = (str) => {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/:/g, "\\:")
    .replace(/"/g, "\\\"")
    .replace(/,/g, "\\,");
};

// Show WiFi information
const showWiFiInfo = (ssid, encryption, hidden) => {
  const wifiInfo = document.getElementById("wifi-info");
  const wifiSsid = document.getElementById("wifi-ssid");
  const wifiEncryption = document.getElementById("wifi-encryption");
  const wifiHidden = document.getElementById("wifi-hidden");

  wifiSsid.textContent = ssid;
  
  switch(encryption) {
    case "WPA":
      wifiEncryption.textContent = "WPA/WPA2/WPA3";
      break;
    case "WEP":
      wifiEncryption.textContent = "WEP";
      break;
    case "nopass":
      wifiEncryption.textContent = "Không bảo mật";
      break;
    default:
      wifiEncryption.textContent = encryption;
  }
  
  wifiHidden.textContent = hidden ? "Ẩn" : "Hiện";
  
  wifiInfo.classList.remove("hidden");
};

// Clear QR code and save button
const clearUI = () => {
  qr.innerHTML = "";
  const saveBtn = document.getElementById("save-link");
  if (saveBtn) {
    saveBtn.remove();
  }
  
  // Hide WiFi info
  const wifiInfo = document.getElementById("wifi-info");
  wifiInfo.classList.add("hidden");
};

// Show spinner
const showSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";
};

// Hide spinner
const hideSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";
};

// Create save button to download QR code as image
const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg w-auto inline-block my-5 transition-all duration-200';
  link.innerHTML = `
    <svg class="inline w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path>
    </svg>
    Tải xuống QR Code
  `;

  link.href = saveUrl;
  link.download = "wifi-qrcode.png";

  document.getElementById("generated").appendChild(link);
};

// Handle encryption type change
const handleEncryptionChange = () => {
  const encryption = document.getElementById("encryption").value;
  const passwordField = document.getElementById("password");
  
  if (encryption === "nopass") {
    passwordField.value = "";
    passwordField.disabled = true;
    passwordField.placeholder = "Không cần mật khẩu";
  } else {
    passwordField.disabled = false;
    passwordField.placeholder = "Nhập mật khẩu WiFi";
  }
};

// Initialize
hideSpinner();

// Event listeners
form.addEventListener("submit", onGenerateSubmit);
document.getElementById("encryption").addEventListener("change", handleEncryptionChange);

// Initialize encryption field
handleEncryptionChange(); 