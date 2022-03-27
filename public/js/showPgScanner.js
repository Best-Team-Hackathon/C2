console.log('loading scanner')

function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    console.log(`HIDDED TEXT IS : ${decodedText}`);
    console.log(decodedResult);
    // save scaned worker id to Attendence
    axios.post(`/scanner/${decodedText}`)
        .then(rsp=>{
            console.log(rsp);
            alert('MADE ATTENDENCE!!')
        })

  }
  
  function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    // console.warn(`Code scan error = ${error}`);
  }
  
let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: {width: 500, height: 500} },
    /* verbose= */ false);

html5QrcodeScanner.render(onScanSuccess, onScanFailure);