let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let search = document.getElementById('search');
let searchTitle = document.getElementById('searchTitle');
let searchCategory = document.getElementById('searchCategory');
let mood = 0;
let tmp;

// get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    } else {
        total.innerHTML = '';
        total.style.background = "#911"
    }
}
// create product

let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);  //get local storage
} else {
    dataPro=[];   ///create empty array for products
}
submit.onclick = function () {
    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value != '' && category.value != '' && price.value != '' && newpro.count <200) {
    if (mood === 0) {
    if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
            dataPro.push(newpro);
            }
        } else {
        dataPro.push(newpro);
        } 
        
    } else {
        dataPro[tmp] = newpro;
        mood = 0;
        submit.innerHTML = "Create";
        count.style.display = "block";
        }
    clearInputs();
    }

// localStorage 
    localStorage.setItem('product', JSON.stringify(dataPro));
    showData();
}
//  clear inputs
function clearInputs() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    total.style.background = "#911"
    count.value = '';
    category.value = '';
}
// read
function showData() {
    let pro = '';
    for (let i = 0; i < dataPro.length; i++) { 
        pro += `                    
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="update" onclick = "updateData(${i})" >Update</button></td>
            <td><button id="delete" onclick = "deleteData(${i})" >Delete</button></td>

        </tr>`
    }
    document.getElementById('tbody').innerHTML = pro;
    let delAll = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        delAll.innerHTML = `
    <td><button id="delAll" onclick ="deleAll()" >Delete All (${dataPro.length})</button></td>
`
    } else {
        delAll.innerHTML ='';
    }
}
showData();
// delete
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}
function deleAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}
// update product
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    total.innerHTML = dataPro[i].total;
    getTotal();
    submit.innerHTML = "Update this product";
    count.style.display = "none";
    mood = 1;
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    })
}
//  search
let searchMood = 'title';
function searchBox(id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMood = 'title'
    } else {
        searchMood = 'Category'
    };
    search.placeholder = 'Search by ' + searchMood;
    search.focus();
    search.value = '';
    showData();
};
function searchData(value) {
    let pro = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood === 'title') {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                pro += `                    
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="update" onclick = "updateData(${i})" >Update</button></td>
            <td><button id="delete" onclick = "deleteData(${i})" >Delete</button></td>
        </tr>`
            }
        } else {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                pro += `                    
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="update" onclick = "updateData(${i})" >Update</button></td>
            <td><button id="delete" onclick = "deleteData(${i})" >Delete</button></td>

        </tr>`
            }
        }
    }
    document.getElementById('tbody').innerHTML = pro;
}
// clean data

