/*jQuery(function($) {
    $('body').append('<div id="box"></div><div id="screen"></div>');
    $(window).resize(function(){
        $('#box').css("display") == 'block'?showStatus(null):"";
    });
    showStatus("Intializing the page. Please wait.");
    
    vil_id = $("#id_village").val()
    if(vil_id>0) {
    
    //Case when village is already entered on page load
        is_edit = true;
        //Hiding ID and Lookup icon in PersonMeetingAttendance Section
        $('div.inline-group div.tabular table input.vForeignKeyRawIdAdminField').hide();
        $('div.inline-group div.tabular table a.related-lookup').hide();
        
        //Storing the already selected animator & Person Groups
        var anim_selected = $("#id_animator").val();
        var pg_selected = $("#id_farmer_groups_targeted").val() || [];
                
        $.ajax({ type: "GET", 
                dataType: 'json',
                url: "/feeds/person_pract/", 
                data:{vil_id:vil_id,mode:2},
                success: function(obj) {        
                    //storing practice_list         
                    template = (template).replace(/--prac_list--/g, obj.prac_list);
                    _prac_list = obj.prac_list;
                    
                    //updating farmer group list and Animator_list
                    update_farmer_groups(eval('('+obj.pg+')'));
                    update_animators(eval('('+obj.anim+')'));
                    
                    //Restoring the already selected animator and Person Group  
                    $("#id_animator").val(anim_selected);
                    $("#id_farmer_groups_targeted").val(pg_selected);           
                        
                                    
                    //For "Add new Row" template, replacing ther person list of block of the village
                    _new_template = (template).replace(/--per_list--/g, obj.per_list);          
                    initialize_add_screening();
                    
                    hideStatus();
                }
        });
    }
    else {
        //Case when village was not present on load
        is_edit = false;
        $.ajax({ type: "GET", 
                dataType: 'json',
                url: "/feeds/person_pract/", 
                data:{mode:0},
                success: function(obj) {
                template = (template).replace(/--prac_list--/g, obj.prac_list);
                _prac_list = obj.prac_list;             
                }
        });
        //Disabling 'Person Group' & 'Animator Widgets' & showing msg 'Select village to enable' besides
        $("#id_farmer_groups_targeted,#id_animator").attr('disabled', 'disabled');
        $(".form-row.farmer_groups_targeted div, .form-row.animator div").append('<text class="error_msg" style="font-size:20px;float:center; margin-left:50px;margin-top:70px;">Select Village to Enable</text>');
        hideStatus();
    }

    
});*/



//Function called when village is selected
function filter()
{
    alert("wssup india")
    /*if($("#id_village").val()>0){
        showStatus("Loading Person Groups & Animators.");
        $.ajax({ type: "GET", 
                dataType: 'json',
                url: "/feeds/person_pract/", 
                data:{vil_id:$("#id_village").val(),mode:1},
                success: function(obj) {
                    update_farmer_groups(eval('('+obj.pg+')'));
                    update_animators(eval('('+obj.anim+')'));
                    
                    //Clearing Person_meeting_attendance section
                    clear_table($('div.inline-group div.tabular table'));
                    
                    //For "Add new Row" template, replacing ther person list of block of the village
                    _new_template = (template).replace(/--per_list--/g, obj.per_list);
                    if(!is_edit){
                        $("#id_farmer_groups_targeted,#id_animator").removeAttr("disabled");
                        $(".error_msg").remove();
                        initialize_add_screening();
                        
                    }
                    hideStatus();
                }
        });
    }*/   
}

//Function to Update Farmer Group in Widget
function update_farmer_groups(j){
    var options = '<option value="">---------- </option>';
    for (var i = 0; i < j.length; i++) 
        options += '<option value="' + parseInt(j[i].pk) + '">' + j[i].fields['group_name'] + '</option>';
    $("#id_farmer_groups_targeted").html(options);
    
}

//Function to update animators in Widget
function update_animators(j){
    var options = '<option value="">---------- </option>';
    for (var i = 0; i < j.length; i++) 
        options += '<option value="' + parseInt(j[i].pk) + '">' + j[i].fields['name'] + '</option>';
    $("#id_animator").html(options);
    
}

//Function called on Person Selection
function filter_person() {  
    
    showStatus("Loading persons..");
    //Get the Value of 'Initial-forms' and Person Group selected.
    grps = $('#id_farmer_groups_targeted').val();
    init_form = table.parent().parent('div.tabular').find("input[id$='INITIAL_FORMS']").val();
    
    $.ajax({ type: "GET", 
            dataType: 'json',
            url: "/feeds/persons/", 
            data:{groups:grps, init:init_form,mode:0},
            success: function(obj){
                        if(obj.html=='Error') {
                            alert('Sorry, some error Occured. Please notify Systems Team.');
                            return;
                        }
                        
                        //Case when No Person is present in the person groups.
                        if(obj.tot_val == init_form) {
                            alert("Selected Group has no Person registered.");
                            clear_table(table);
                            table.parent().parent('div.tabular').find("input[id$='TOTAL_FORMS']").val(obj.tot_val);
                            return;
                        }
                        
                        //Create & append the list of persons 
                        new_html = (obj.html).replace(/--prac_list--/g, _prac_list);
                        table = $('div.inline-group div.tabular').find('table');                        
                        clear_table(table);
                        table.append(new_html);         
                        //Set Total forms
                        table.parent().parent('div.tabular').find("input[id$='TOTAL_FORMS']").val(obj.tot_val);
                        hideStatus();
                     }
             
         });
}