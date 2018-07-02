


//import ReactDOM from 'react-dom';


class ButtonRequired extends React.Component {
	render(){
		return (
			<button className="btn btn-primary" onClick={this.props.onClick}>
				{this.props.value}
			</button>
		);
	}
}

class CreationOfButtons extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			tableNames: ['patient_nucleobase','pathogenic_prob'],
			attributes:['seq', 'patient_id'],
			operatorAndOr: ['And', 'Or'],
			condition: ['=','like','!=','<=','>=','<','>']
		};
	}


	renderTextArea( className){
		return <TextBox className={className} /> ;
	}

/*	$("#tableNamesId").bind("onChange",updateAttributeList());

	function updateAttributeList()
	{	
		var tableDropDown =  document.getElementById("tableNamesId");
		var valueSelected = tableDropDown.options[tableDropDown.selectedIndex].value;
		$.ajax({
 		 	url: "",
  			type: "POST",
  			data: {"tableName" : valueSelected},
  			dataType: "json",
			 success: function(response){
    						var res = JSON.parse(response);
						var resValue=res["attributes"];
						this.state.attributes = resValue.split(",") ;		
  					}
			});

	} */
	
	render(){

		return (
			<div>
				<span class="label">Choose table:</span> {this.renderSelectionBox(this.state.tableNames, "Select a table", "tableNamesId")}
				<br/>
				<ButtonRequired value="add Filter" onClick={() => this.addFilterMethod()} />
				<br/>
                                <br/>
				<div id="filterDiv" >
				</div>
			</div>
		);

	}
	addFilterMethod() {
		const addButton = (
			<div>
			{this.renderTextArea("query")}
			<br/>
			{/*}<ButtonRequired value="And" />
			{' '}
			<ButtonRequired value="Or" />
			{' ' }
			<ButtonRequired value="(" />
			{' '}
			<ButtonRequired value=")" />
			{this.renderTextArea()}*/}
			{this.renderSelectionBox(this.state.operatorAndOr, "Select operator","operatorsId")}
			{' '}
			{this.renderSelectionBox(this.state.attributes, "Select attribute", "attributesId")}
			{' '}
			{this.renderSelectionBox(this.state.condition, "Select condition","conditionsId")}
			{' '}
			{/*this.renderTextArea("condition")*/}
			<input type="text" class="condition" placeholder="Give condition"></input>
			</div>
	);
		ReactDOM.render(addButton, document.getElementById('filterDiv'));

	}

renderSelectionBox(optionsToShow, defaultLabel , id){
	return <SelectionBox value={optionsToShow} defaultLabel={defaultLabel} id={id}/>
}
}

class TextBox extends React.Component {
	render(){
		return (
			<textarea placeholder={"Your query will be built here"}>
			</textarea>
		);
	}


}


// changes on friday

function Option(props) {
	return (
		<option className="options" >
			{props.value}
		</option>
	);
}

class SelectionBox extends React.Component{

	createOptions = (valuePassed) => {
	    let optionsList = []

	    // Outer loop to create parent
	    for (let i = 0; i < valuePassed.length; i++) {


					optionsList.push(this.renderOption(valuePassed[i]))
	      }

				return optionsList ;
	    }



	renderOption(i) {
		return (
			<Option
				value={i}
				//onClick={() => this.handleClick(i)}
			/>
		);
	}

	render(){
		return (
			<select>
				<option selected disabled hidden>{this.props.defaultLabel}</option>
				{this.createOptions(this.props.value)}
			</select>

		);
	}

}
ReactDOM.render(<CreationOfButtons/>, document.getElementById('queryCreationDivId'));




function viewTable()
{
	var $form = $('[name="formSelectionTable"]');

    // Let's select and cache all the fields
        //var $inputs = $form.find("option");
        var serializedData = $form.serialize();
            $.ajax({
                url: "call_cgi.py",
                type: "GET",
                data:serializedData ,
                success: function(response){
                        $("#results").html(response);
                }
	});
        window.location.hash = "div";
        window.location.hash = "#results";
}

/*
                        <form id="formId" name="formSelectionTable" method="GET" onsubmit="viewTable()">
                                <select name="tableSelection" onchange="updateHiddenInput()">
                                        <option> Choose from the following </option>
                                        <option value="patient_nucleobase">patient_nucleobase</option>
                                        <option value="pathogenic_prob">pathogenic_prob</option>
                                </select>
                                <input type="hidden" id="optionSelectionId" name="optionSelectedId" value="3487">
                                <input type="submit">
                        </form>
*/

function updateHiddenInput()
{
	var selectInput = $('[name="tableSelection"]').val();
	 $('#optionSelectionId').val(selectInput);
}

/*$(document).ready(function(){
    $("#submit_form").click(function(){
        var json_string = createJson();
        if($("#Preselectedbarcodes").val().match("[0-9BD-FH-SU-Zbd-fh-su-z]")!=null){
    		$("#results").html("<span class='error_message' style='margin:20px; max-width:400px;'>Invalid Input. Please check your input and try again. </span>")
		return null;
	}
	$.ajax({
                url: "call_cgi.py",
                type: "POST",
                datatype: "html",
                data:{ json_input : json_string},
                success: function(response){
                        $("#results").html(response);
                }
		
            });
	window.location.hash = "div";
        window.location.hash = "#results";
    });
	
});
*/
function setNewWindowToAllATags()
{
	var x = document.querySelectorAll("a");
    	for(i =0 ; i< x.length ; i++)
    	x[i].setAttribute("target", "_blank"); 
}


function createJson() {

        var myTable = document.getElementById("selectionTable");
        var json_string = "{" ;
        for( i =0; i < myTable.rows.length -2; i++)
        {
                var name1 = document.getElementById("barcode_link"+i).href;
                var split = name1.split("=");
                var value1 = document.getElementById("sliderAmount"+i).value;
                json_string+= '"'+split[1]+'":"'+value1+'",' ;

        }
        var preselected = document.getElementById("Preselectedbarcodes").value.trim().replace(/(\s)/gm, ",");
        preselected=preselected.replace(/(,)+/gm, ",");
        json_string+='"barcodes":'+'"'+preselected+'"}' ;

        return json_string;

}



function showFeedback()
{	
	var response = '<div style="margin-top:50px;float:center;" class="col-lg-4">'
+'<!--div class="container"-->'  
                +'<div class="panel panel-default" style="margin:0 auto;width:500px">'  
                +'<div class="panel-heading">'  
                    +'<h2 class="panel-title">Feedback Form</h2>'  
                 +'</div>'  
                 +'<div class="panel-body">'  
                     +'<!--form name="contactform" method="post" class="form-horizontal" role="form"-->'  
                      +'<!--form name="contactform" method="POST" action="javascript:thanksFeedbackMethod();" role="form"-->' 
			   +'<form name="feedbackform" method="post" action="javascript:thanksFeedbackMethod()"  role="form">' 
                         +'<div class="form-group" style="padding-bottom:25px;">'  
                            +'<label for="inputName" class="col-lg-2 control-label">Name</label>'  
                          +'<div class="col-lg-10">'  
                                    +'<input type="text" class="form-control" id="inputName" name="name" placeholder="Your Name">'  
                              +'</div>'  
                            +'</div>'  
                          +'<div class="form-group" style="padding-bottom:25px;">'  
                             +'<label for="inputEmail1" class="col-lg-2 control-label">Email</label>'  
                           +'<div class="col-lg-10">'  
                            +'<input type="text" class="form-control" id="inputEmail" name="email" placeholder="Your Email">'  
                           +'</div>'  
                             +'</div>'  
                             +'<div class="form-group" style="padding-bottom:25px;">'  
                                 +'<label for="inputSubject" class="col-lg-2 control-label">Subject</label>'  
                                 +'<div class="col-lg-10">'  
                                     +'<input type="text" class="form-control" id="inputSubject" name="topic" placeholder="Subject Message">'  
                                 +'</div>'  
                             +'</div>'  
                             +'<div class="form-group" style="padding-bottom:25px;">'  
                                 +'<label for="inputPassword1" class="col-lg-2 control-label">Message</label>'  
                                 +'<div class="col-lg-10">'  
                                     +'<textarea class="form-control" rows="4" id="inputMessage" name="message" placeholder="Your message...">'+'</textarea>'  
                                 +'</div>'  
                             +'</div>'  
                             +'<div class="form-group" style="padding-bottom:25px;" >'  
                                 +'<div class="col-lg-offset-2 col-lg-10">'  
                                   +'<button type="SUBMIT" id="feedbackButtonId"  class="btn btn-default">Send Message <br>' +'<br>'+'</button>'  
                                 +'</div>'  
                             +'</div>'  
                         +'</form>'  

                     +'</div>'  
                 +'</div>'  
                 +'</div>'  
               +'<!--/div-->'

		+'<div class="col-lg-5"></div>'
		+'<!--div class="col-lg-3"></div-->'
            ;
	$("#results").html(response) ;
	window.location.hash = "";
	window.location.hash = "#results";
}

function thanksFeedbackMethod()
{	
	//var response = '<p class="para"> Thanks for your feedback! </p>' ;
	   /*   $.ajax({
                url: "mailer.php",
                type: "POST",
                datatype: "html",
                success: function(response){
                        $("#results").html(response);
                }
            });*/

	var $form = $('[name="feedbackform"]');

    // Let's select and cache all the fields
    	var $inputs = $form.find("input, textarea");
	var serializedData = $form.serialize();
    // Serialize the data in the form
    /*var serializedData = $form.serialize();
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("results").innerHTML = this.responseText;
            }
        };
        xmlhttp.open("POST", "mailer.php", true);
        xmlhttp.send();*/
            $.ajax({
                url: "mailer.php",
                type: "POST",
                data:serializedData , 
                success: function(response){
                        $("#results").html(response);
                }

            });

}
