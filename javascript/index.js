const textJson = {
    "autocomplete": true,
    "autofocus": true,
    "disabled": false,
    "id": "name",
    "label": "Name",
    "max": "",
    "maxlength": "20",
    "min": "",
    "name": "name",
    "pattern": ".*",
    "placeholder": "John Smith",
    "required": true,
    "size": "20",
    "type": "text",
    "value": "",
	"optionvalue": ""
}

var formDataList = {data:[],name:""};

function textFieldForm(type = "text") {
    let formData = `
        <table>
            <tr>
                <td><label>Type</label></td>
                <td>
                    <select id="type" onchange="textFieldForm(this.value)">
                        <option value="text">Text</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="radio">Radio Button</option>
                        <option value="textarea">Text Area</option>
                        <option value="number">Number</option>
                        <option value="date">Date</option>
                    </select>
                </td>
            </tr>`;
            if(type === "text") {
                formData += `<tr>
                    <td><label>Autocomplete</label></td>
                    <td><input id="autocomplete" name="autocomplete" type="checkbox"></td>
                </tr>`;
            }
            if(type === "text") {
                formData += `<tr>
                    <td><label>Autofocus</label></td>
                    <td><input id="autofocus" name="autofocus" type="checkbox"></td>
                </tr>`;
            }
            if(type === "text") {
                formData += `<tr>
                    <td><label>Disabled</label></td>
                    <td><input id="disabled" name="disabled" type="checkbox"></td>
                </tr>`;
            }
            formData += `<tr>
                <td><label>ID</label></td>
                <td><input id="id" name="id" type="text"></td>
            </tr>`;
            formData += `<tr>
                <td><label>Label</label></td>
                <td><input id="label" name="label" type="text" autocomplete="off"></td>
            </tr>`;
            if(type === "number") {
                formData += `
                    <tr>
                        <td><label>Max Limit</label></td>
                        <td><input id="max" name="max" type="number" min=1></td>
                    </tr>
                    <tr>
                        <td><label>Min Limit</label></td>
                        <td><input id="min" name="min" type="number" min=1></td>
                    </tr>
                `
            }
            if(type === "text") {
                formData += `<tr>
                    <td><label>Maximum Length</label></td>
                    <td><input id="maxlength" name="maxlength" type="number" min=1></td>
                </tr>`;
            }
            formData += `<tr>
                <td><label>Name</label></td>
                <td><input id="name" name="name" type="text"></td>
            </tr>`;
            if(type === "text") {
                formData += `<tr>
                    <td><label>Pattern</label></td>
                    <td><input id="pattern" name="pattern" type="text"></td>
                </tr>`;
            }
            if(type === "text") {
                formData += `<tr>
                    <td><label>Placeholder</label></td>
                    <td><input id="placeholder" name="placeholder" type="text"></td>
                </tr>`;
            }
            if(type === "text") {
                formData += `<tr>
                    <td><label>Required</label></td>
                    <td><input id="required" name="required" type="checkbox"></td>
                </tr>`;
            }
            if(type === "text") {
                formData += `<tr>
                    <td><label>Size</label></td>
                    <td><input id="size" name="size" type="number" min=1 max=100></td>
                </tr>`;
            }
            formData += `<tr>
                <td><label>Default Value</label></td>`;
            if(type === "checkbox") {
                formData += `<td><input id="value" name="value" type="checkbox"></td>`;
            } else if(type === "radio") {
                formData += `<td><input id="value" name="value" type="radio"></td></tr>
				<tr>
                <td><label>Value</label></td><td><input id="option-value" name="value" type="text" placeholder="Enter comma separated values"></td>`;
            } else if(type === "date") {
                formData += `<td><input id="value" name="value" type="date"></td>`;
            } else if(type === "textarea") {
                formData += `<td><textarea id="value" name="value"></textarea></td>`;
            } else {
                formData += `<td><input id="value" name="value" type="text"></td>`;
            }
            formData += `</tr>
        </table>
        <button onClick="generateDynamicField()">Add Field</button>
    `;
    document.getElementById("textFieldForm").innerHTML = formData;
    document.getElementById("type").value = type;
}

function loadSavedForms(){
	   $('#form_list').html('<option value="" disabled selected>Select Form</option>');
        $.get('/getDetails', function (response) {
            $.map(response, function (county) {
                $('#form_list').append('<option value="' + county.m_county_id + '">' + county.m_county_name + '</option>');                
            });
		});
}
function getValueFromId(id, type) {
    if(type === "checkbox" || type === "radio") {
        return document.getElementById(id).checked;
    } else if(type === "select") {
        let e = document.getElementById(id);
        return e.options[e.selectedIndex].value;
    }
    return document.getElementById(id) ? document.getElementById(id).value:"";
}

function generateDynamicField(inputJson) {
    let type = getValueFromId("type");
    let max = type === "number" && getValueFromId("max");
    let min = type === "number" && getValueFromId("min");
    let size = type === "text" && getValueFromId("size");
    let textJson = {
        "autocomplete": type === "text" && getValueFromId("autocomplete", "checkbox") ? "on" : "off",
        "autofocus": type === "text" && getValueFromId("autofocus", "checkbox"),
        "disabled": type === "text" && getValueFromId("disabled", "checkbox"),
        "id": getValueFromId("id"),
        "label": getValueFromId("label"),
        "max": type === "number" ? (max === "" ? null : max) : null,
        "maxlength": type === "text" && getValueFromId("maxlength"),
        "min": type === "number" ? (min === "" ? null : min) : null,
        "name": getValueFromId("name"),
        "pattern": type === "text" && getValueFromId("pattern"),
        "placeholder": type === "text" && getValueFromId("placeholder"),
        "required": type === "text" && getValueFromId("required", "checkbox"),
        "size": size === "" ? 10 : size,
        "type": type,
        "value": getValueFromId("value"),
		"optionvalue": getValueFromId("option-value")
    }
    if(inputJson){
        textJson = inputJson;
    }
    formDataList["data"].push(textJson);
    var form = document.getElementById("form");
    var label = document.createElement("label");
    label.htmlFor = textJson.id;
    label.appendChild(document.createTextNode(textJson.label));
	if(textJson.type == "textarea"){
		var textField = document.createElement("textarea");
	} else{
		var textField = document.createElement("input");
    }
    textField.autocomplete = textJson.autocomplete;
    if(textJson.autofocus) {
        textField.autofocus = true;
    }
    if(textJson.disabled) {
        textField.disabled = true;
    }
    textField.id = textJson.id;
    textField.maxlength = textJson.maxlength;
    textField.name = textJson.name;
    textField.pattern = textJson.pattern;
	if(textJson.placeholder){
		textField.placeholder = textJson.placeholder;
	}
    if(textJson.required) {
        textField.required = true;
    }
    // textField.size = textJson.size === 0 ? 10 : textJson.size;
    textField.type = textJson.type;
    if(type === "checkbox" ) {
        textField.checked = getValueFromId("value", "checkbox");
    } else if(type === "radio"){
		var options = textJson.optionvalue.split(",");
		var optionsHolder = document.createElement("span");
		options.forEach(function(option){
			optionField = document.createElement("input");
			optionField.type="radio";
			optionField.name=textJson.name;
			optionField.value=option;
			optionsHolder.appendChild(optionField);
			let label = document.createElement("label");
			label.appendChild(document.createTextNode(option));
			optionsHolder.appendChild(label);
		});
	}else {
        textField.value = textJson.value;
    }
	var table = document.getElementById("form");
	var row = table.insertRow(0);
	if(textJson.type=="checkbox"){
		var cell2 = row.insertCell(0);
		var cell1 = row.insertCell(1);	
	} else {
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
	}
	cell1.innerHTML = label.innerHTML;
	if(optionsHolder){
		cell2.appendChild(optionsHolder);
	} else{
		cell2.appendChild(textField);
	}
    form.appendChild(row);
}

function createForm(){
    formDataList["name"] = getValueFromId("form-name");
    console.log(formDataList);
}

function displayForm(){
    formDataList["data"].forEach(function(formData){
        generateDynamicField(formData);
      });
}

function displayFormList(){
    var selectList = document.getElementById("formListSelect");
return;
//Create and append the options
formsList.forEach(function(form){
    var option = document.createElement("option");
    option.value = form.formname;
    option.text = form.formname;
    selectList.appendChild(option);
  });
}

window.onload = function() {
    textFieldForm();
	//loadSavedForms();
    displayFormList();
};
