let mainArray = [];
let mypera = document.getElementById("myWord");
const datas = new XMLHttpRequest();
datas.onload = function() {
    const txtDatas = this.responseText

    csvToArray(txtDatas);
};
datas.open('GET', 'stock_Report.txt', true)
datas.send();

function csvToArray(csv) {
    const lines = csv.trim().split('\n');
    for (let i = 1; i < lines.length; i++) {
        let eachData = lines[i].trim().split(',');
        let PPriceCOnvert = covertPPrice(eachData[2]);
        let lineDatas = {}
        lineDatas.itemName = eachData[1];
        lineDatas.PPrice = PPriceCOnvert;
        lineDatas.RPrice = eachData[3];
        lineDatas.Barcode = eachData[6];
        lineDatas.MRP = eachData[7];

        mainArray.push(lineDatas);
    }
}

function covertPPrice(price) {
    let fstep = Math.floor(+price);
    let toNum = fstep.toString().split('').map(Number);
    let result = "";
    toNum.forEach(val => {
        let cove = "";
        switch (val) {
            case 0:
                cove = "R"
                break;
            case 1:
                cove = "M"
                break;
            case 2:
                cove = "I"
                break;
            case 3:
                cove = "L"
                break;
            case 4:
                cove = "K"
                break;
            case 5:
                cove = "P"
                break;
            case 6:
                cove = "O"
                break;
            case 7:
                cove = "W"
                break;
            case 8:
                cove = "D"
                break;
            case 9:
                cove = "E"
                break;
        }
        result = result + cove;
    });
    return result;
}





// Sample data
const items = mainArray;


const input = document.getElementById('itemInput');
const autocompleteList = document.getElementById('autocompleteList');
const itemInfo = document.getElementById('itemInfo');
const itemNameDisplay = document.getElementById('itemName');
const barcodeDisplay = document.getElementById('barcode');
const dpDisplay = document.getElementById('dp');
const retailDisplay = document.getElementById('retail');
const mrpDisplay = document.getElementById('mrp');


// Autocomplete functionality
input.addEventListener('input', () => {
    const query = input.value.toLowerCase();
    autocompleteList.innerHTML = '';
    autocompleteList.classList.remove('visible');


    if (query) {
        const filteredItems = mainArray.filter(item =>
            item.itemName.toLowerCase().includes(query)
        );


        if (filteredItems.length > 0) {
            autocompleteList.classList.add('visible');
            filteredItems.forEach(item => {
                const div = document.createElement('div');
                div.className = 'autocomplete-item';
                div.textContent = item.itemName;
                div.addEventListener('click', () => {
                    input.value = item.itemName;
                    showItemDetails(item);
                    autocompleteList.classList.remove('visible');
                });
                autocompleteList.appendChild(div);
            });
        }
    }
});


// Show item details
function showItemDetails(item) {
    itemNameDisplay.textContent = item.itemName;
    barcodeDisplay.textContent = `Barcode: ${item.Barcode}`;
    dpDisplay.textContent = `DP: ${item.PPrice}`;
    retailDisplay.textContent = `Retail: ${item.RPrice}`;
    mrpDisplay.textContent = `MRP: ${item.MRP}`;
    itemInfo.classList.add('visible');
    itemInfo.classList.add('mechanical-glow');
    setTimeout(() => itemInfo.classList.remove('mechanical-glow'), 1500);
}


// Hide autocomplete list when clicking outside
document.addEventListener('click', (e) => {
    if (!autocompleteList.contains(e.target) && e.target !== input) {
        autocompleteList.classList.remove('visible');
    }
});


// Handle enter key
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = input.value.toLowerCase();
        const item = mainArray.find(i => i.itemName.toLowerCase() === query);
        if (item) {
            showItemDetails(item);
            autocompleteList.classList.remove('visible');
        }
    }
});

/////////Service worker registration

if("serviceWorker" in navigator){
    navigator.serviceWorker.register("srworker.js").then(registration=>{
        console.log("Service worker registered")
        console.log(registration);
    }).catch(error=>{
        console.log("Service worker error")
        console.log(error)
    })
}else{
    alert("Service worker not working")
}