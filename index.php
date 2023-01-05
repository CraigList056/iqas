<!DOCTYPE html>
<html lang="bc">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token 
    <meta name="csrf-token" content="g57Cy25mpoHHkAinunwa14h3TuedA38Kx2Es91wc">-->

    <title>Integrated Quality Assurance System</title>

    <!-- ================= Favicon ================== -->
    <!-- Standard -->
    <link rel="shortcut icon" href="images/aca_logo.png">
    <!-- Styles -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="assets/css/lib/themify-icons.css" rel="stylesheet">
    <link href="assets/css/lib/sidebar.css" rel="stylesheet">
    <link href="assets/css/lib/bootstrap.min.css" rel="stylesheet">
    <link href="assets/css/lib/nixon.css" rel="stylesheet">
    <link href="assets/lib/lobipanel/css/lobipanel.min.css" rel="stylesheet">
    <link href="assets/css/lib/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/responsive/2.2.3/css/responsive.dataTables.min.css" rel="stylesheet">
    <link href="css/header.css" rel="stylesheet">
    <link href="assets/css/style.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
            <style>.content-wrap {padding-top: 180px;}</style>
            <link href="css/step/smart_wizard.css" rel="stylesheet">
    <link href="css/step/smart_wizard_theme_arrows.css" rel="stylesheet">
    <link href="css/Chart.min.css" rel="stylesheet">
    <link href="css/jqcloud.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="LDAVis/lda.css">
    <style>
        .sw-theme-arrows > .sw-container {
            min-height: 50vh !important;
        }
        .sw-theme-arrows > ul.step-anchor > li.active > a {
            border-color: #0096FF !important;
            color: #fff !important;
            background: #0096FF !important;
        }
        .sw-theme-arrows > ul.step-anchor > li.active > a:after {
            border-left: 30px solid #0096FF !important;
        }
        .sw-theme-arrows > ul.step-anchor > li.done > a {
            border-color: #3f4f98 !important;
            color: #fff !important;
            background: #3f4f98 !important;
        }
        .sw-theme-arrows > ul.step-anchor > li.done > a:after {
            border-left: 30px solid #3f4f98;
        }
        .card {
            margin: 25px 0px 15px 0px;
            padding: 0;
        }
        .card-x {
            border: 1px solid #0096FFa6;
            margin-top: 3rem;
        }
        .card-body-x {
            padding: 0 1.25rem 2.25rem;
        }
        .card-title-x {
            text-align: center;
            margin-top: 0;
        }
        .round-x input[type="checkbox"]:checked + label,
        .round-x input[type="radio"]:checked + label {
            background-color: #0096FF;
            border-color: #0096FF;
        }
        .card-x.card-disabled {
            border: 1px solid #757a8fa6;
            background: #dadada8c;
        }
        .card-x.card-disabled .round-x label{
            background-color: #eeeeee70;
        }
        .card-x.card-disabled .card-body-x h3.card-title-x {
            color: #c1c1c1;
        }
        .round-x input[type="checkbox"],
        .round-x input[type="radio"] {
            visibility: hidden;
        }
        .round-x input[type="radio"]:checked + label:after,
        .round-x input[type="checkbox"]:checked + label:after {
            opacity: 1;
        }
        .enumerations table th tr:nth-child(even) {
            background: #fff;
        }
        .enumerations table th {
            background: #0096FF;
            border: 1px solid #9a9a9a;
            text-align: center !important;
            color: #fff;
            font-size: 1.1em;
        }
        .enumerations table td {
            color: #000;
            text-align: center !important;
            border: 1px solid #9a9a9a;
            font-weight: 500;
            font-size: 1em;
        }
        .action-label {
            position: absolute;
            right: 25px;
            display: inline-flex;
            top: 8px;
        }
        .action-label .update-label {
            padding-right: 5px;
            border-right: 1px solid #ababab;
            cursor: pointer;
        }
        .action-label .delete-label {
            padding-left: 5px;
            cursor: pointer;
        }
        .action-label .update-label:hover,
        .action-label .delete-label:hover {
            font-weight: bold;
        }
        .btn {
            font-size: 1.1em !important;
        }
        .form-control {
            color: #1e1e1e !important;
        }
        .thematic-analysis-table th {
            font-size: 1.3em;
        }
        .thematic-analysis-table td {
            font-size: 1.2em;
        }
        .sw-theme-arrows > ul.step-anchor {
            font-size: 1.3em !important;
        }
    </style>
</head>
<body>
           
        <div class="content-wrap">
        <div class="main">
            <div class="container-fluid">
                    <div class="col-lg-12">
        <div class="card alert">
            <div class="card-body">
                <div id="processAnalysis">
                    <ul>
                        <li><a href="#step-1">Phase I<br /><small>Upload & Clean</small></a></li>
                        <li><a href="#step-2">Phase II<br /><small>Setting Up Parameters</small></a></li>
                        <li><a href="#step-3">Phase III<br /><small>Extract Label</small></a></li>
                        <li><a href="#step-4">Phase IV<br /><small>Word Cloud</small></a></li>
                        <li><a href="#step-5">Phase V<br /><small>LDA Visualization</small></a></li>
                    </ul>
                    <div class="pt-3">
                        <div id="step-1" class="ml-5">
                            
                            <div class="row">
                           	  <div class="col-lg-4">
									<div class="card-x mb-5 text-center">
                                      <div class="question-check">
                                            <div class="round-x">
                                                <input type="radio" name="data_category" id="upload_processed_data"
                                                       class="process-input" value="upload_processed_data"/>
                                            </div>
                                        </div>
                                        <div class="card-body-x">
                                            <h2 class="card-title-x">
                                                <i class="fa fa-upload"></i> Upload File<br /></h2>
                                            <div class="upload_processed_data_file_name"></div>
                                            <input type="file" name="upload_processed_data_file" accept="text/plain"
                                                   style="visibility: hidden; position: absolute; top: 0;">
                                        </div>
                                    </div>
								 
								  <div class="checkbox" align="left">
										<label>
											<input type="checkbox" name="remove_symbols" value="1" class="process-input">
												Remove Symbols
										</label>
									</div>
									<div class="checkbox" align="left">
										<label>
											<input type="checkbox" name="remove_numbers" value="1" class="process-input">
												Remove Numbers
										</label>
									</div>
									<div class="checkbox" align="left">
										<label>
											<input type="checkbox" name="remove_duplicates" value="1" class="process-input">
												Remove Duplicates
										</label>
									</div>	
								  	
								  	<br />
								  	<h4>Manage Stop Words</h4>
								   	
                                    <div class="d-table">
                                        <div class="d-table-row">
                                            <div class="d-table-cell">
												
                                                <div class="pt-3">
													<textarea class="form-control process-input" name="stop_words"
															  placeholder="Enter additional stop words here, separated by comma."
															  style="max-width: 100%; max-height: 450px;"></textarea>
													<input type="file" accept=".txt" name="stop_words_file" style="visibility: hidden;">
												</div>
                                            </div>
                                            <div class="d-table-cell">
												<div class="d-table-cell">
													<table width="110">
													  <tbody>
														<tr>
														  <td style="text-align: left"  height="50">&nbsp;&nbsp;&nbsp;<button class="btn btn-primary btn-flat sw-add">Add</button>
															  
															</td>  
														</tr>
														  <tr>
														  <td style="text-align: left" ><button class="btn btn-primary btn-flat sw-upload mr-3 ml-3">Upload</button></td>
														</tr>
													  </tbody>
													</table>
												</div>
                                            </div>
                                            <div class="d-table-cell">
                                                <table width="150">
													  <tbody>
														<tr>
														  <td style="text-align: left" >&nbsp;&nbsp;<button class="btn btn-primary btn-flat"
                                                        data-toggle="modal" data-target="#defaultStopWords">Default List</button>
															  
															</td>  
														</tr>
														  <tr>
														  <td style="text-align: left" height="50">&nbsp;&nbsp;<button class="btn btn-primary btn-flat sw-create-new">Refresh</button></td>
														</tr>
													  </tbody>
													</table>
                                            </div>
                                        </div>
                                        <div class="d-table-row" style="position: relative;">
											
                                            <div class="d-table-cell text-right font-weight-bold pb-3 pt-0">
                                                
                                            </div>
                                            <div class="d-table-cell text-center sw-upload-name" style="position: relative;">
                                                
												<div class="sw-upload-name-container">Stop Words Uploaded
                                                </div>
                                            </div>
											
                                        </div>
										<div class="sw-add-container sw-added-words">
												<div class="sw-added-words-label">
													Stop Words <i class="fa fa-caret-up"></i>
												</div>
												<div class="sw-words"></div>
											</div>
										<div class="d-table-row">
										
                                        </div>
										
                                    </div>
                                   
                                    
								  	
								</div>
                           	  <div class="col-lg-6">
								
								<br /> 
								
								<div class="form-group">
                                        <div class="enumerations">
                                            <table>
                                                <thead>
                                                <tr>
                                                    <th>Uploaded Data</th>
                                                    <th>Pre-processed Data</th>
                                                    <th colspan="4">
                                                        Pre-Processing/Cleaning
                                                    </th>
                                                    <th>
                                                        Processed/Cleaned Data
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td>&nbsp;Symbols&nbsp;</td>
                                                    <td>&nbsp;Numbers&nbsp;</td>
                                                    <td>&nbsp;Duplicates&nbsp;</td>
                                                    <td>&nbsp;Stopwords&nbsp;</td>
                                                    <td></td>
                                                </tr>
												<tr>
                                                  <td>Sample<br>Compliance<br>
                                                    Report.docx</td>
                                                    <td>2,833</td>
                                                    <td>&nbsp;621&nbsp;</td>
                                                    <td>&nbsp;176&nbsp;</td>
                                                    <td>&nbsp;0&nbsp;</td>
                                                    <td>&nbsp;1,316&nbsp;</td>
                                                    <td>720</td>
                                                </tr>
												<tr>
                                                    <td>Total</td>
                                                    <td>2,833</td>
                                                    <td>&nbsp;621&nbsp;</td>
                                                    <td>&nbsp;176&nbsp;</td>
                                                    <td>&nbsp;0&nbsp;</td>
                                                    <td>&nbsp;1,316&nbsp;</td>
                                                    <td>720</td>
                                                </tr>
												
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>	
							  	<div class="d-table">
                                        <div class="d-table-row">
                                            <div class="d-table-cell">
								  
												<div class="card-x show-enumerations card-disabled">
													<div class="card-body-x pb-3 pt-3">
														<h3 class="card-title-x"><i class="fa fa-list"></i> Show Enumerations</h3>
													</div>
												</div>
											</div>
											<br /> &nbsp;
                                    		<div class="d-table-cell">
												<div class="card-x download-cleaned-data card-disabled">
													<div class="card-body-x pb-3 pt-3">
														<h3 class="card-title-x"><i class="fa fa-download"></i> Download Data</h3>
													</div>
												</div>
											</div>
										</div>
								  </div>
                                    
								</div>
								
								<div class="col-lg-4">
								
								</div>
                            </div>
                          
                            
                        </div>
                        <div id="step-2" class="ml-5">
                            <div class="col-lg-12">
                                <h3>Topic Modeling Parameters</h3>
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label>Number of Topics</label>
                                        <input type="number" class="form-control process-input" name="number_topics" value="">
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label>Number of Iterations</label>
                                        <input type="number" class="form-control process-input" name="number_iterations" value="">
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label>Number of Words</label>
                                        <input type="number" class="form-control process-input" name="number_words" value="">
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label>Optimization Interval</label>
                                        <input type="number" class="form-control process-input" name="optimization_interval" value="">
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label>Model Name</label>
                                        <input type="text" class="form-control process-input" name="model_name" value="">
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <h3>Labeling Settings</h3>
                                <div class="card-header pt-5" style="padding-top: 0 !important;">
                                    <h4 style="vertical-align: top;">Label Topics</h4>
                                    <span class="toggleWrapper">
                                        <input type="checkbox" name="label-topic"
                                               class="mobileToggle" id="label-topic">
                                        <label for="label-topic"></label>
                                    </span>
                                </div>
                                <div class="d-table">
                                    <div class="d-table-row">
                                        <div class="d-table-cell">
                                            <button class="btn btn-primary btn-flat view-label-list">
                                                Label List
                                            </button>
                                        </div>
                                        <div class="d-table-cell">
                                            <button class="btn btn-primary btn-flat mr-3 ml-3 add-new-label"
                                                    data-toggle="modal" data-target="#labelAddActionModal">
                                                Add Hitwords
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="step-3" class="ml-5">
                            <div class="thematic-analysis-table"></div>
                        </div>
                        <div id="step-4" class="word-cloud">
                        </div>
                        <div id="step-5" class="pt-3">
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            <div class="col-lg-12 text-center pt-5 lda-frames">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="defaultStopWords" tabindex="-1" role="dialog" aria-labelledby="defaultStopWords" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header mb-3">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4>Default stop words</h4>
                </div>
                <div class="modal-body">
                    <div class="sw-added-words">
                        <div class="sw-added-words-label">
                            <h3>Stopwords</h3><i class="fa fa-caret-up"></i>
                        </div>
                        <div class="sw-words"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="labelList" tabindex="-1" role="dialog" aria-labelledby="labelList" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header mb-3">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4>Label List</h4>
                </div>
                <div class="modal-body" style="max-height: 700px; overflow: auto;">
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="labelUpdateActionModal" tabindex="-1" role="dialog" aria-labelledby="labelUpdateActionModal" aria-hidden="true">
        <div class="modal-dialog modal-md" style="width: 45%;">
            <div class="modal-content">
                <div class="modal-header mb-3">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4>Update Label</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label for="name">Label Name</label>
                                <input type="text" name="update_label_name" class="form-control update_label_name">
                                <input type="hidden" class="update_label_id">
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label for="message">Hitwords</label>
                                <textarea class="form-control update_hitwords" name="update_hitwords" required></textarea>
                            </div>
                        </div>






                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger btn-flat" data-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary btn-flat submit-update-label">Update Label</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="labelAddActionModal" tabindex="-1" role="dialog" aria-labelledby="labelAddActionModal" aria-hidden="true">
        <div class="modal-dialog modal-md" style="width: 45%;">
            <div class="modal-content">
                <div class="modal-header mb-3">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4>Add Hitwords</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label for="name">SDG Label</label>
                                <select class="form-control" name="sdg" id="sdg" required>
                                    <option value="">Select SDG</option>
                                    <option value="No Poverty">No Poverty</option>
                                    <option value="Zero Hunger">Zero Hunger</option>
                                    <option value="Good Health and Well-Being">Good Health and Well-Being</option>
                                    <option value="Quality Education">Quality Education</option>
                                    <option value="Gender Equality">Gender Equality</option>
                                    <option value="Clean Water and Sanitation">Clean Water and Sanitation</option>
                                    <option value="Affordable and Clean Energy">Affordable and Clean Energy</option>
                                    <option value="Decent Work and Economic Growth">Decent Work and Economic Growth</option>
                                    <option value="Industry Innovation and Infrastructure">Industry Innovation and Infrastructure</option>
                                    <option value="Reduced Inequalities">Reduced Inequalities</option>
                                    <option value="Sustainable Cities and Communities">Sustainable Cities and Communities</option>
                                    <option value="Responsible Consumption and Production">Responsible Consumption and Production</option>
                                    <option value="Climate Action">Climate Action</option>
                                    <option value="Life Below Water">Life Below Water</option>
                                    <option value="Life on Land">Life on Land</option>
                                    <option value="Peace, Justice and Strong Institutions">Peace, Justice and Strong Institutions</option>
                                    <option value="Partnerships for the Goals">Partnerships for the Goals</option>
                                </select>
                            </div>
                        </div>






                        <div class="col-lg-12">
                            <div class="form-group">
                                <label for="message">Hitwords</label>
                                <textarea placeholder="Comma-delimited hitwords" class="form-control add_hitwords" name="add_hitwords" required></textarea>
                            </div>
                        </div>






                        <div class="col-lg-12">
                            <div class="form-group">
                                <label for="message">CHED</label>
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" name="system_integration" value="System Integration" class="system_integration process-input">
                                        System Integration
                                    </label>
                                </div>
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" name="application_development" value="Application Development" class="application_development process-input">
                                        Application Development
                                    </label>
                                </div>
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" name="software_engineering" value="Software Engineering" class="software_engineering process-input">
                                        Software Engineering
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger btn-flat" data-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary btn-flat submit-add-label">Add Hitwords</button>
                </div>
            </div>
        </div>
    </div>
            </div>
        </div>
    </div>
    <script src="assets/js/lib/jquery.min.js"></script>
    <script src="//cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.6.1/js/dataTables.buttons.min.js"></script>
    <script>let base_url =  "http://aca.techfinitrix.com";</script>
    <script src="http://aca.techfinitrix.com/js/main.js"></script>
    <script>
        let api_url = app.getConfig('url');
        let root_url = app.getConfig('root');
        app.setToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hY2EtYXBpLnRlY2hmaW5pdHJpeC5jb21cL2FwaVwvdjFcL2xvZ2luIiwiaWF0IjoxNjQ5NTk3MTE3LCJleHAiOjE2ODExMzMxMTcsIm5iZiI6MTY0OTU5NzExNywianRpIjoiSVJ3ckNWM0hVZHBCZmxlUCIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.49Zb_xo4-FJEex4FhNtVirNaCcNDHrn7ZMkYjOr5xfU", "feCV0DBYYQKv4xWLAmLnwVwBYG5CZkL8");
    </script>
    <script src="js/main.js"></script>
    <!-- /# content wrap -->
    <!-- jquery vendor -->
    <script src="assets/js/lib/jquery.nanoscroller.min.js"></script>
    <!-- nano scroller -->
    <script src="assets/js/lib/sidebar.js"></script>
    <!-- sidebar -->
    <script src="assets/js/lib/bootstrap.min.js"></script>
    <!-- bootstrap -->
    <script src="assets/js/lib/mmc-common.js"></script>
    <script src="assets/js/scripts.js"></script>
    <script src="assets/js/lib/sweetalert/sweetalert.min.js"></script>
    <script>
        function burgerMenu(x) {
            x.classList.toggle("change");
        }
    </script>
        <script src="js/jquery.smartWizard.js"></script>
    <script src="js/Chart.min.js"></script>
    <script src="js/ChartJSPlug.js"></script>
    <script src="js/jqcloud-1.0.4.min.js"></script>
    <script>
        let processed = false;
        let cleaned = false;
        let processed_ids = [];
        let current_stop_words = [];
    </script>
    <script src="js/admin/process/stopWords.js"></script>
    <script src="js/admin/process/process.js"></script>
</body>
</html>

