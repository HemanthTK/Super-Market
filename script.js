var selectedRow = null;
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    onFormSubmit()
});

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}
function readFormData() {
    var formData = {};
    formData["productName"] = document.getElementById("productName").value;
    formData["pCode"] = document.getElementById("pCode").value;
    formData["seller"] = document.getElementById("seller").value;
    formData["price"] = document.getElementById("price").value+"₹";
    return formData;
}
function insertNewRecord(data) {
    var table = document.getElementById("productList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.productName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.pCode;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.seller;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.price;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
    <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("productName").value = "";
    document.getElementById("pCode").value = "";
    document.getElementById("seller").value = "";
    document.getElementById("price").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    //console.log(selectedRow.cells[0].innerHTML);
    document.getElementById("productName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("pCode").value = selectedRow.cells[1].innerHTML;
    document.getElementById("seller").value = selectedRow.cells[2].innerHTML;
    document.getElementById("price").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.productName;
    selectedRow.cells[1].innerHTML = formData.pCode;
    selectedRow.cells[2].innerHTML = formData.seller;
    selectedRow.cells[3].innerHTML = formData.price;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("productList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("productName").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}