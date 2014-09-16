var editor;
$(document).ready(function() {

function format (d) {
 
 
 var string ="<tr> <th> Access </th> </tr>";
 for (var i=0; i < d.access.length; i++) {
 
 string = string + '<tr> <td>' +  d.access[i].name + '</td></tr>';
 console.log(d.access[i].name);
 //console.log('Type of ' + typeof d.access[i].name);
 }
 console.log('This is the string ' + string);
 return string;
};  







	editor = new $.fn.dataTable.Editor( {
		ajax: "../php/joinArray.php",
		table: "#example",
		fields: [ {
				label: "First name:",
				name:  "users.first_name"
			}, {
				label: "Last name:",
				name:  "users.last_name"
			}, {
				label: "Site:",
				name:  "users.site",
				type:  "select"
			}, {
				"label": "Access:",
				"name": "access[].id",
				"type": "checkbox"
			}
		]
	} );
	
	
	var table = $('#example').DataTable( {
			dom:  'T<"clear">lfrtip',
			table: "#example",
		"ajax": {
			url: "../php/joinArray.php",
			type: 'POST'
		},
		
		"columns": [
			{
				"class":          'details-control',
				"orderable":      false,
				"data":           null,
				"defaultContent": ''
			},
			
			{ data: "users.first_name" },
			{ data: "users.last_name" },
			{ data: "sites.name" },
			{ data: "access", render: "[, ].name" }
		],
	//	"order": [[0, 'asc']],
		tableTools: {
			"sSwfPath": "copy_csv_xls_pdf.swf",
			sRowSelect: "os",
			aButtons: [
				{ sExtends: "editor_create", editor: editor },
				{ sExtends: "editor_edit",   editor: editor },
				{ sExtends: "editor_remove", editor: editor },
				'copy',
 			   'xls',
  			  'csv',
           'pdf',
           'print'
			]
		},
		initComplete: function ( settings, json ) {
			editor.field( 'users.site' ).update( json.sites );
			editor.field( 'access[].id' ).update( json.access );
		}
	} );
	
	// Add event listener for opening and closing details
	$('#example tbody').on('click', 'td.details-control', function () {
	  
		var tr = $(this).closest('tr');
		var row = table.row( tr );

		if ( row.child.isShown() ) {
			// This row is already open - close it
			row.child.hide();
			tr.removeClass('shown');
		}
		else {
			// Open this row
			row.child( format(row.data()) ).show();
			tr.addClass('shown');
		}
	} );
} );
